import buttonClose from '../images/close-icon.svg';

function PopupWithForm(props) {
    return(
        <section className={props.name}>
            <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
                <div className="popup__container">
                    <button type="button" className="popup__close">
                        <img src={buttonClose} alt="Закрыть окно" className="popup__close-icon" />
                    </button>

                    <h2 className="popup__heading">{props.title}</h2>

                    <form name="form" className={`popup__form popup__form_${props.name}`} onSubmit={props.onSubmitForm}>
                        <fieldset className="popup__form-set">
                            {props.children}
                            <button className="popup__save">{props.buttonText}</button>
                        </fieldset>
                    </form>

                </div>
            </div>
        </section>
    );
}

export default PopupWithForm;