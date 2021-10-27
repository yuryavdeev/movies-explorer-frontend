import React from 'react'
import './AboutMe.css'
import GridArea from '../GridArea/GridArea'


const AboutMe = React.memo(() => {


    return (
        <section className='about-me' id='about-me'>
            <h2 className='about-me__title'>Обо мне</h2>
            <GridArea />         
        </section >
    )
})

export default AboutMe