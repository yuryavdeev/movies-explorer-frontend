import React from 'react'
import Access from '../Access/Access'
import { config } from '../../utils/conf'

const Login = React.memo(({ handleLoginSubmit, messageErr }) => {

    return (
        <Access
            nextHandleSubmit={handleLoginSubmit}
            greeting={config.login.greeting}
            button={config.login.button}
            isRegistrated={config.login.isRegistrated}
            link={config.login.link}
            messageErr={messageErr}
        />
    )
})

export default Login