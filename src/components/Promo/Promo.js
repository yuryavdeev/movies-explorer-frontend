import { memo } from 'react'
import './Promo.css'
import { config } from '../../utils/conf'

const Promo = memo(() => {
  return (
    <section className='promo'>
      <h1 className='promo__titile'>{config.mainTitle}</h1>
    </section>
  )
})

export default Promo
