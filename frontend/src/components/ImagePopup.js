import buttonClose from '../images/close-icon.svg';

function ImagePopup(props) {
    return(
        <section className="image-full">
            <div className={`popup popup_image-full ${props.card? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
                <figure className="popup__image-container">
                    <button type="button" className="popup__close popup__close_image-full">
                        <img src={buttonClose} alt="Закрыть окно" className="popup__close-icon" />
                    </button>

                    <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
                    <figcaption className="popup__figcaption">{props.card?.name}</figcaption>
                </figure>

            </div>
        </section>
    );
}

export default ImagePopup;