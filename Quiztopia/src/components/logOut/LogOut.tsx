import './LogOut.scss'
import { useNavigate } from 'react-router'
import logout from '../../assets/purplelogout.svg'

function LogOut() {
    const navigate = useNavigate()

    function handleLogOut() {
        navigate('/')
    }

    return (
        <img src={ logout } alt="log out" className='log-out' onClick={ handleLogOut }/>
    )
}

export default LogOut