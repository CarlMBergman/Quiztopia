import './CreateQuiz.scss'
import{ useState } from 'react'
import { useLocation } from 'react-router-dom'
import Mapbox from '../../components/mapbox/Mapbox';

interface locationData {
    success: boolean;
    quizId: string;
}

function CreateQuiz() {
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    const location = useLocation()
    const locationData: locationData = location.state
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition((position: GeolocationPosition) =>{
          const coords: GeolocationCoordinates = position.coords;
          // setLatitude(coords.latitude)
          // setLongitude(coords.longitude)
          setLng(coords.longitude)
          setLat(coords.latitude)
        
      }, error => {
        console.log('vi blev nekade', error);
      })
    }

    async function handleAddQuestion() {

    }
    return (
        <main>
            <h2>{ locationData.quizId }</h2>
            <input type="text" placeholder='question'/>
            <input type="text" placeholder='anwser'/>
            {lat && lng && <Mapbox lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng }/>}
            <button onClick={ handleAddQuestion }>Add question</button>
        </main>
    )
} 

export default CreateQuiz