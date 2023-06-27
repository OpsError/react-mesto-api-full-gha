import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
        avatarRef.current.value = '';
    }

    return(
        <PopupWithForm name="patch" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmitForm={handleSubmit} buttonText={props.isLoading? 'Сохранение...' : 'Сохранить'}>
                <input type="url" name="link-avatar" id="url-input" required defaultValue="" ref={avatarRef} placeholder="Ссылка на картинку" className="popup__input popup__input_type_url" />
                <span className="url-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;