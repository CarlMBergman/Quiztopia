import './RegisterComp.scss'
import '../loginComp/LoginComp.scss'

import register from '../../api/register'
import login from '../../api/login'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupData, loginData } from '../../interfaces'



function RegisterComp() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [secondPassword, setSecondPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string | null>()
    const navigate = useNavigate();

    

    async function handleRegister() {
        if (password === secondPassword) {
            try {
                const signupData: signupData = await register(username, password)
                console.log(signupData);
                
                if (!signupData.success) {
                    setErrorMsg(signupData.message)

                } else if (signupData.success) {
                    const loginData: loginData = await login(username, password)
                    console.log(loginData);
                    
                    if (loginData.success) {
                        if (!loginData.token) return
                        navigate('/choosequiz')
                    }
                    else {
                        setErrorMsg('Something went wrong')
                    }
                }
                setErrorMsg(null)
            } catch (error) {
                setErrorMsg('something went wrong')
            }
        } else {
            setErrorMsg('Password does not match!')
        }
    }

    return (
        <article className='login-comp'>
            <input type="text" placeholder='Username' className='login-comp__input' name='username' onChange={ e => setUsername(e.target.value) }/>
            <input type="text" placeholder='Password'className='login-comp__input' name='password' onChange={ e => setPassword(e.target.value) }/>
            <input type="text" placeholder='Type password again'className='login-comp__input'name='secondpassword' onChange={ e => setSecondPassword(e.target.value) }/>
            {errorMsg ? <p>{errorMsg}</p> : null}
            <button className='login-comp__button' onClick={ handleRegister }>Register</button>
        </article>
    )
}

export default RegisterComp