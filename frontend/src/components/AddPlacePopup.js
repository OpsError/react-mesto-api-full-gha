import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name, link});
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return(
        <PopupWithForm name="form-add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmitForm={handleSubmit} buttonText={props.isLoading? 'Сохранение...' : 'Создать'}>
            <input type="text" name="name-place" id="title-input" required value={name} onChange={handleChangeName} placeholder="Название" className="popup__input popup__input_type_title" minLength="2" maxLength="30" />
            <span className="title-input-error"></span>
            <input type="url" name="link-place" id="link-input" required value={link} onChange={handleChangeLink} placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" />
            <span className="link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;