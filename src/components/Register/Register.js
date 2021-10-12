import React from 'react'
import Access from '../Access/Access'
import { config } from '../../utils/conf'

const Register = React.memo(({ handleRegistrationSubmit, messageErr }) => {

    return (
        <Access
            nextHandleSubmit={handleRegistrationSubmit}
            greeting={config.register.greeting}
            button={config.register.button}
            isRegistrated={config.register.isRegistrated}
            link={config.register.link}
            messageErr={messageErr}
        />
    )
})

export default Register