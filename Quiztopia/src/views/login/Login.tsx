import './Login.scss'
import LoginComp from '../../components/loginComp/LoginComp'
import RegisterComp from '../../components/registerComp/RegisterComp'

import { useState } from 'react'

function Login() {
    const [loginRegister, setLoginRegister] = useState<boolean>(true)
    const [swapText, setSwapText] = useState<string>('Not a user? Register here!')

    function handleRegisterLoginSwap() {
        setLoginRegister(current => !current)
        if (swapText === 'Not a user? Register here!') {
            setSwapText('Already have an account? Click here!')
        } else {
            setSwapText('Not a user? Register here!')
        }
    }

    return (
        <main className='login'>
            {loginRegister ? <LoginComp/> : <RegisterComp/>}
            
            <p className='login__switch' onClick={ handleRegisterLoginSwap }>{ swapText }</p>
        </main>
    )
}

export default Login