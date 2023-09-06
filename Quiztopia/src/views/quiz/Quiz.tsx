import MapboxQuiz from '../../components/mapboxQuiz/MapboxQuiz';
import geoLocation from '../../functions/geoLocation';
import { useState } from 'react'
import './Quiz.scss'
import { useLocation } from 'react-router'
import stars from '../../assets/stars.svg'
import { Quiz } from '../../interfaces';
import LogOut from '../../components/logOut/LogOut';
import GoBack from '../../components/goBack/GoBack';



function Quiz() {
    const location = useLocation()
    const quiz: Quiz = location.state
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    geoLocation(setLat, setLng)
    
    
    return (
        <>
        <GoBack/>
        <LogOut/>
        <main>
            <header className='header'>
                <img src={stars} alt="" className='header__img'/>
                <h2 className='header__name'>{ quiz.quizId }</h2>
                <img src={stars} alt="" className='header__img'/>
            </header>
            {lat && lng && <MapboxQuiz quiz={ quiz } lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng }/>}
        </main>
        </>
    )
}

export default Quiz