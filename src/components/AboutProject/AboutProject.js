import React from 'react';
import './AboutProject.css';

const AboutProject = React.memo(() => {
    return (

        <section className='project' id='about-project'>

            <h2 className='project__title'>О проекте</h2>

            <ul className='project__about-list'>
                <li className='project__about-list-item'>
                    <h3 className='project__about-list-title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='project__about-list-text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </li>
                <li className='project__about-list-item'>
                    <h3 className='project__about-list-title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='project__about-list-text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>

            <ul className='project__terms-list'>
                <li className='project__terms-list-item'>
                    <div className='project__terms-list-term project__terms-list-term_color'>1 неделя</div>
                    <p className='project__terms-list-description'>Back-end</p>
                </li>
                <li className='project__terms-list-item'>
                    <div className='project__terms-list-term'>4 недели</div>
                    <p className='project__terms-list-description'>Front-end</p>
                </li>
            </ul>

        </section>
    )
});

export default AboutProject;