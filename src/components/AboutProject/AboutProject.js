import { memo } from 'react'
import './AboutProject.css'

const AboutProject = memo(() => {
  return (
    <section className='project' id='about-project'>
      <h2 className='project__title'>About project</h2>

      <ul className='project__about-list'>
        <li className='project__about-list-item'>
          <h3 className='project__about-list-title'>
            This project included 5 stages
          </h3>
          <p className='project__about-list-text'>
            Drawing up a plan, working on the backend, layout, adding functionality and final improvements.
          </p>
        </li>
        <li className='project__about-list-item'>
          <h3 className='project__about-list-title'>
            It took 5 weeks to complete the project
          </h3>
          <p className='project__about-list-text'>
            Each stage had soft and hard deadlines that had to be met in order to successfully defend.
          </p>
        </li>
      </ul>

      <ul className='project__terms-list'>
        <li className='project__terms-list-item'>
          <div className='project__terms-list-term project__terms-list-term_color'>1 week</div>
          <p className='project__terms-list-description'>Back-end</p>
        </li>
        <li className='project__terms-list-item'>
          <div className='project__terms-list-term'>4 weeks</div>
          <p className='project__terms-list-description'>Front-end</p>
        </li>
      </ul>
    </section>
  )
})

export default AboutProject
