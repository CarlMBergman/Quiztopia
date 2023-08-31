import './CreateQuiz.scss'
import{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import Mapbox from '../../components/mapbox/Mapbox';
import geoLocation from '../../functions/geoLocation';

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
        <main>
            <h2>{ locationData.quizId }</h2>
            {lat && lng && <Mapbox lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng } quizName={ locationData.quizId }/>}
        </main>
    )
} 

export default CreateQuiz