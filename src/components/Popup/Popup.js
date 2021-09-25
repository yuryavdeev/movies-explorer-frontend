import React from 'react';

import './Popup.css';

const Popup = (({ popupIsOpen, closePopup, Content, buttonClose }) => {

    const handleFieldClick = (evt) => {
        evt.target === evt.currentTarget && closePopup();
    }

    React.useEffect(() => {
        const handleEsc = (evt) => {
            evt.key === 'Escape' && closePopup();
        }
        popupIsOpen && document.addEventListener('keyup', handleEsc);
        return () => {
            document.removeEventListener('keyup', handleEsc);
        };
    }, [closePopup, popupIsOpen]);


    return (
        <div className='popup' onClick={handleFieldClick}>
                {
                    buttonClose &&
                    <button className='popup__close' type='button' onClick={closePopup}></button>
                }
                {Content}
        </div>
    );
});

export default Popup;