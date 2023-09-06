import './CreateQuiz.scss'
import{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import Mapbox from '../../components/mapbox/Mapbox';
import geoLocation from '../../functions/geoLocation';
import stars from '../../assets/stars.svg'
import LogOut from '../../components/logOut/LogOut';
import GoBack from '../../components/goBack/GoBack';



function CreateQuiz() {
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    const location = useLocation()
    const locationData: string = location.state
    geoLocation(setLat, setLng)
    
    
   
    return (
        <>
        <GoBack/>
        <LogOut/>
        <main className='create-quiz'>
            <header className='header'>
                <img src={stars} alt="" className='header__img'/>
                <h2 className='header__name'>{ locationData }</h2>
                <img src={stars} alt="" className='header__img'/>
            </header>
            
            {lat && lng && <Mapbox lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng } quizName={ locationData }/>}
        </main>
        </>
    )
} 

export default CreateQuiz