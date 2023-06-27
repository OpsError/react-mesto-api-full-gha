import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/authApi';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = useState(false);
    const [isDeletePopupOpen, setDeleteOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isloggedIn, setIsLoggedIn] = useState(false);

    const [email, setEmail] = useState('');

    const [isTooltip, setIsTooltip] = useState(false);
    const [messageTooltip, setMessageTooltip] = useState({
        success: false,
        text: ''
    });

    const navigate = useNavigate();

    // регистрация
    function handleSubmitDataRegister({email, password}) {
        authApi.signup({email, password})
        .then((res) => {
            setMessageTooltip({
                success: true,
                text: 'Вы успешно зарегистрировались!'
            });
            handleOpenTooltip();
            navigate('/sign-in', {replace: true});
        })
        .catch((res) => {
            setMessageTooltip({
                success: false,
                text: 'Что-то пошло не так! Попробуйте ещё раз.'
            });
            handleOpenTooltip();
        });
    }

    // авторизация
    function handleSubmitDataLogin({email, password}) {
        authApi.signin({email, password})
        .then((res) => {
            if (res.data) {
                handleLogin();
                setEmail(email);
                localStorage.setItem('token', res.data);
                setIsLoggedIn(true);
                navigate('/', {replace: true});
            }
        })
        .catch((res) => {
            setMessageTooltip({
                success: false,
                text: 'Что-то пошло не так! Попробуйте ещё раз.'
            });
            handleOpenTooltip();
        })
    }

    // проверка токена
    function handleCheckToken() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            authApi.checkToken(jwt)
            .then((res) => {
                if (res) {  
                    setIsLoggedIn(true);
                    setEmail(res.email);
                    navigate('/', {replace: true});
                }
            })
            .catch((res) => {
                setMessageTooltip({
                    success: false,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.'
                });
                handleOpenTooltip();
                navigate('/sign-in', {replace: true});
            });
        }
    }

    useEffect(() => {
        handleCheckToken();
        // eslint-disable-next-line
    }, []);

    function signOut() {
        setEmail('');
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setCurrentUser({});
    }

    // получение карточек и данных пользователя с сервера
    useEffect(() => {
        if (isloggedIn) {
            api.getCard()
            .then((res) => {
                setCards(res.data);
            })
            .catch((res) => {
                console.log(res);
            });

            api.getInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((res) => {
                console.log(res);
            });
        }
    }, [isloggedIn]);

    // поставить/убрать лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((res) => {
            console.log(res);
        });
    }

    // удаление карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards(cards.filter(item => item._id !== card._id));
        })
        .catch((res) => {
            console.log(res);
        });
    }

    // открытие попапов
    function handleEditAvatarClick() {
        setAvatarOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setPlaceOpen(true);
    }

    function handleOpenTooltip() {
        setIsTooltip(true);
    }

    // закрытие попапов
    function closeAllPopups() {
        setAvatarOpen(false);
        setIsEditProfilePopupOpen(false);
        setPlaceOpen(false);
        setDeleteOpen(false);
        setSelectedCard(null);
        setIsTooltip(false);
    }

    function closePopupButton(evt) {
        if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon')) || (evt.key === 'Escape')) {
            closeAllPopups();
        }
    }

    // закрытие попапа на esc
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen]);

    // обновление данных профиля
    function handleUpdateUser(data) {
        setIsLoading(true);
        api.patchInfo(data)
        .then((res) => {
            setCurrentUser(res.data);
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    // обновление аватара
    function handleUpdateAvatar(link) {
        setIsLoading(true);
        api.patchAvatar(link)
        .then((res) => {
            setCurrentUser(res.data);
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    // добавление карточки
    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.postCard(data)
        .then((newCard) => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function handleLogin() {
        setIsLoggedIn(true);
    }

  return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__content">
                <Header email={email} signOut={signOut} />
                <Routes>
                    <Route path='/*' element={<ProtectedRouteElement element={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} loggedIn={isloggedIn} />} />
                    <Route path='/sign-up' element={<Register onSubmit={handleSubmitDataRegister} />} />
                    <Route path='/sign-in' element={<Login onSubmit={handleSubmitDataLogin} />} />
                </Routes>
                <InfoTooltip messageTooltip={messageTooltip} isOpen={isTooltip} onClose={closePopupButton} />
                <Footer />

                {/*Редактировать профиль  */}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closePopupButton} onUpdateUser={handleUpdateUser} isLoading={isLoading} />

                {/* <!-- Новое место --> */}
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopupButton} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

                {/* <!-- попап удаления карточки --> */}
                <PopupWithForm name="delete" title="Вы уверены?" isOpen={isDeletePopupOpen} onClose={closePopupButton} buttonText='Да' />

                {/* <!-- попап обновить аву --> */}
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopupButton} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />

                {/* <!-- картинка на весь экран --> */}
                <ImagePopup card={selectedCard} onClose={closePopupButton} />
            </div>
            
        </CurrentUserContext.Provider>
  );
}

export default App;
