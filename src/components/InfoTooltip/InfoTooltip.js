import Popup from '../Popup/Popup'
import './InfoTooltip.css'

function InfoTooltip({ closePopup, icon, notification }) {
  return (
    <Popup
      closePopup={closePopup}
      Content={
        <div className='info-tooltip__container'>
          <img className='info-tooltip__image' src={icon} alt={notification} />
          <p className='info-tooltip__notification'>{notification}</p>
        </div>
      }
      buttonClose={true}
    />
  )
}

export default InfoTooltip
