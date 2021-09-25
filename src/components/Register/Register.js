import React from 'react'
import Access from '../Access/Access';

const Register = React.memo(({ handleRegistrationSubmit }) => {

    const greeting = 'Добро пожаловать!'
    const button = 'Зарегистрироваться'
    const isRegistrated = 'Уже зарегистрированы?'
    const link = 'Войти'

    return (
        <Access
            nextHandleSubmit={handleRegistrationSubmit}
            greeting={greeting}
            button={button}
            isRegistrated={isRegistrated}
            link={link}
        />
    );
});

export default Register;