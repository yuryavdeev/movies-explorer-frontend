import React from 'react'

import './Popup.css'

const Popup = (({ closePopup, Content, buttonClose, viewportWidth }) => {

    const handleFieldClick = (evt) => {
        evt.target === evt.currentTarget && closePopup()
    }

    React.useEffect(() => {
        const handleEsc = (evt) => {
            evt.key === 'Escape' && closePopup()
        }

        viewportWidth && closePopup()

        document.addEventListener('keyup', handleEsc)

        return () => {
            document.removeEventListener('keyup', handleEsc)
        }

    }, [closePopup, viewportWidth])


    return (
        <div className='popup' onClick={handleFieldClick}>
                {
                    buttonClose &&
                    <button className='popup__close' type='button' onClick={closePopup}></button>
                }
                {Content}
        </div>
    )
})

export default Popup