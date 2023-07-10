import './ErrorPopup.css'

function PopupWithForm({popupError, setPopupError}) {

    function closePopup(evt) {
        evt.preventDefault();
        setPopupError("")
    }
    
    return (
        <div className={`popup ${popupError ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__body">
                    <h2 className="popup__title">{popupError}</h2>
                    <button type="submit" className="popup__button" onClick={closePopup}>ОК</button>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm;