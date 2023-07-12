import './ErrorPopup.css'

function ErrorPopup ({popupError, setIsPopupErrorOpen, isPopupErrorOpen}) {

    function closePopup(evt) {
        evt.preventDefault();
        setIsPopupErrorOpen(false)
    }

    return (
        <div className={`popup ${isPopupErrorOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__body">
                    <h2 className="popup__title">{popupError}</h2>
                    <button type="submit" className="popup__button" onClick={closePopup}>ОК</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPopup;