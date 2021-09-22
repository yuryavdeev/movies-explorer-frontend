import React from 'react'
import Access from '../Access/Access';

const Login = React.memo(({ handleLoginSubmit, isSubmitting }) => {

    const greeting = 'Рады видеть!'
    const button = 'Войти'
    const isRegistrated = 'Ещё не зарегистрированы?'
    const link = 'Регистрация'

    return (
        <Access
            handleSubmit={handleLoginSubmit}
            greeting = {greeting}
            button = {button}
            isRegistrated={isRegistrated}            
            link = {link}
        />
    );
});

export default Login;