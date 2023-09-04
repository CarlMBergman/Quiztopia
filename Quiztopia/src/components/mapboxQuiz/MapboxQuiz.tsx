import './MapboxQuiz.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG1iZXJnbWFuIiwiYSI6ImNsbHVyaDk2NDFoZ3YzcHB2aXd3dHFuZXkifQ.5wSZ2eJMGbIPBK1aNHFkQA'

interface Props {
    quiz: Quiz;
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
}

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


function MapboxQuiz(props: Props) {
    const lat = props.lat
    const lng = props.lng
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapGl | null>(null);
    const [zoom, setZoom] = useState<number>(13);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const questionRef = useRef<mapboxgl.Marker | null>(null)

    useEffect(() => {

        if (mapRef.current || !mapContainer.current) return; 

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
          });

          const map: MapGl = mapRef.current

        if (markerRef.current) {
            markerRef.current.remove();
          }
      
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

        props.quiz.questions.map((question) => {
            const lat = +question.location.latitude
            const lng = +question.location.longitude
            
            questionRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                
                `
                <h3>${question.question}<h3>
                <p>${question.answer}<p/>
                `
                )).addTo(map);
        })


        map.on('move', () => {
            interface Position {
                lng: number,
                lat: number
              }
                const position: Position = map.getCenter();
                props.setLat(Number(position.lat.toFixed(4)));
                props.setLng(Number(position.lng.toFixed(4)));
                setZoom(map.getZoom());
        });
    }, [lat, lng, zoom, props.setLat, props.setLng, setZoom])
    

    return (
        <div>
            {lat && lng && <div ref={mapContainer} className="map-container" /> }
        </div>
    )
}

export default MapboxQuiz