import './LoginComp.scss'
import login from '../../api/login'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginComp() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string | null>()
    const [password, setPassword] = useState<string | null>()
    const [errorMsg, setErrorMsg] = useState<string | null>()

    async function handleLogin() {
        if (!username || !password) {
            setErrorMsg('Please enter username and password!')
        } else {
            const loginData = await login(username, password)
            console.log(loginData);
            navigate('/choosequiz', { state: true })
        }
        
    }

    function handlePlayAsGuest() {
        navigate('/choosequiz', { state: false })
    }
 
    return (
        <article className='login-comp'>
                <input type="text" placeholder='Username' className='login-comp__input' name='username' onChange={ e => setUsername(e.target.value) }/>
                <input type="text" placeholder='Password' className='login-comp__input' name='password' onChange={ e => setPassword(e.target.value)} />
                <p>{ errorMsg }</p>
                <button className='login-comp__button' onClick={ handleLogin }>Login</button>
                <button className='login-comp__button' onClick={ handlePlayAsGuest }>Play as a guest</button>
        </article>
    )
}

export default LoginComp