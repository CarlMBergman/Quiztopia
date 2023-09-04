import Mapbox from '../../components/mapbox/Mapbox';
import MapboxQuiz from '../../components/mapboxQuiz/MapboxQuiz';
import geoLocation from '../../functions/geoLocation';
import { useState } from 'react'
import './Quiz.scss'
import { useLocation } from 'react-router'

interface Quiz {
    questions: question[];
    quizId: string;
    userId: string;
    username: string;
}

interface question {
    answer: string;
    question: string;
    location: coords;
}

interface coords {
    latitude: string;
    longitude: string;
}

function Quiz() {
    const location = useLocation()
    const quiz: Quiz = location.state
    const [lng, setLng] = useState<number>();
    const [lat, setLat] = useState<number>();
    geoLocation(setLat, setLng)
    
    
    return (
        <main>
            {lat && lng && <MapboxQuiz quiz={ quiz } lat={ lat } lng={ lng } setLat={ setLat } setLng={ setLng }/>}
        </main>
    )
}

export default Quiz