import React from "react";
import buttonClose from '../images/close-icon.svg';
import buttonSuccess from '../images/success-btn.svg'
import buttonFail from '../images/fail-btn.svg'

function InfoTooltip({messageTooltip, isOpen, onClose}) {
    return(
        <section className='tooltip'>
            <div className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
                <div className="popup__container">
                    <button type="button" className="popup__close">
                        <img src={buttonClose} alt="Закрыть окно" className="popup__close-icon" />
                    </button>

                    <div className="popup__img-success">
                        {<img alt={messageTooltip.success? 'Успех' : 'Попробуйте еще раз'} src={messageTooltip.success? buttonSuccess : buttonFail} />}
                        <p className="popup__text-success">{messageTooltip.text}</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default InfoTooltip;