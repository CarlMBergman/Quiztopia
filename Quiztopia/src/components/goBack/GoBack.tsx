import './GoBack.scss'
import arrow from '../../assets/purplearrow.svg'
import { useNavigate } from 'react-router'

function GoBack() {
    const navigate = useNavigate()

    function handleGoBack() {
        navigate(-1)
    }

    return (
        <img src={ arrow } alt="go back" className='go-back' onClick={ handleGoBack }/>
    )
}

export default GoBack
