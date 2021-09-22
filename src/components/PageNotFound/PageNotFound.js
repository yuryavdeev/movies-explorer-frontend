import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = React.memo(() => {
    const history = useHistory();

    return (
        <div className='not-found__container'>
            <h3 className='not-found__404'>404</h3>
            <p className='not-found__message'>Страница не найдена</p>
            <Link className='not-found__return' to='' onClick={history.goBack}>Назад</Link>
        </div>
    )
});

export default PageNotFound;