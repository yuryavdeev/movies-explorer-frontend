import React from 'react'
import Access from '../Access/Access'

const Login = React.memo(({ handleLoginSubmit, messageErr }) => {

    const greeting = 'Рады видеть!'
    const button = 'Войти'
    const isRegistrated = 'Ещё не зарегистрированы?'
    const link = 'Регистрация'

    return (
        <Access
            nextHandleSubmit={handleLoginSubmit}
            greeting={greeting}
            button={button}
            isRegistrated={isRegistrated}
            link={link}
            messageErr={messageErr}
        />
    )
})

export default Login