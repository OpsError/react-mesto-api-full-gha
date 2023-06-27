import buttonDelete from '../images/trash-icon.svg';
import buttonLike from '../images/like.svg';
import buttonLikeActive from '../images/like-active.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card (props) {
    const currentUser = React.useContext(CurrentUserContext);
    // проверка на собственность карточки
    const isOwn = props.card.owner === currentUser._id;
    // стоит ли лайк?
    const isLiked = props.card.likes ? props.card.likes.some(i => i === currentUser._id) : false;
    
    const cardLikeButtonClassName = (
        `element__like-icon ${isLiked && 'element__like-icon_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteCard() {
        props.onCardDelete(props.card);
    }

    return(
        <article className="element">
    
            <div className="element__avatar">
                <img className="element__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
                     <button className="element__trash">
                     {isOwn ? <img src={buttonDelete} alt="Удалить фотографию" className="element__trash-icon" onClick={handleDeleteCard} /> : <></>}
                    </button>
            </div>
                    
            <div className="element__card">
                <h2 className="element__description">{props.card.name}</h2>
                <div className="element__container">
                    <button type="button" className="element__like">
                        <img src={isLiked ? buttonLikeActive : buttonLike} alt="Поставить лайк" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    </button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
                    
        </article>
    );
}

export default Card;