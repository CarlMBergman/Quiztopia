import './CreateQuiz.scss'
import{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import Mapbox from '../../components/mapbox/Mapbox';
import geoLocation from '../../functions/geoLocation';
import stars from '../../assets/stars.svg'

interface locationData {
    success: boolean;
    quizId: string;
}

function CreateQuiz() {
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    const location = useLocation()
    const locationData: locationData = location.state
    geoLocation(setLat, setLng)
    
    
   
    return (
        <main className='create-quiz'>
            <header className='header'>
                <img src={stars} alt="" className='header__img'/>
                <h2 className='header__name'>{ locationData.quizId }</h2>
                <img src={stars} alt="" className='header__img'/>
            </header>
            
            {lat && lng && <Mapbox lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng } quizName={ locationData.quizId }/>}
        </main>
    )
} 

export default CreateQuiz