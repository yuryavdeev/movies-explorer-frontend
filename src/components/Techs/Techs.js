import './Techs.css'

const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <div className='techs__wrap'>
        <h2 className='techs__title'>Technologies</h2>
        <h3 className='techs__subtitle'>7 technologies</h3>
        <p className='techs__text'>
          On the web development course, we mastered the technologies that we used in the graduation project.
        </p>
        < div className='techs__container'>
          <div className='techs__tech-icon'>HTML</div>
          <div className='techs__tech-icon'>CSS</div>
          <div className='techs__tech-icon'>JS</div>
          <div className='techs__tech-icon'>React</div>
          <div className='techs__tech-icon'>Git</div>
          <div className='techs__tech-icon'>Express.js</div>
          <div className='techs__tech-icon'>mongoDB</div>
        </div>
      </div>

    </section>
  )
}

export default Techs
