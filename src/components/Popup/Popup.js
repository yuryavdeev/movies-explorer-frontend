import React from 'react';

import './Popup.css';
import Navigation from '../Navigation/Navigation';


const Popup = (({ navigationPopup, closePopup }) => {

    const handleFieldClick = (evt) => {
        evt.target === evt.currentTarget && closePopup();
    }

    React.useEffect(() => {
        const handleEsc = (evt) => {
            evt.key === 'Escape' && closePopup();
        }
        navigationPopup && document.addEventListener('keyup', handleEsc);
        return () => {
            document.removeEventListener('keyup', handleEsc);
        };
    }, [closePopup, navigationPopup]);

    return (
        <div className='popup' onClick={handleFieldClick}>
            <div className='popup__container'>
                <button className='popup__close' type='button' onClick={closePopup}></button>
                <Navigation />
            </div>
        </div>
    );
});

export default Popup;