import './MapboxQuiz.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN_KEY as string
import { PropsForMapboxQuiz } from '../../interfaces';




function MapboxQuiz(props: PropsForMapboxQuiz) {
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
      
        markerRef.current = new mapboxgl.Marker({color: '#7657cc'}).setLngLat([lng, lat]).addTo(map);

        props.quiz.questions.map((question) => {
            const lat = +question.location.latitude
            const lng = +question.location.longitude
            
            questionRef.current = new mapboxgl.Marker({color: '#cc8257'}).setLngLat([lng, lat]).setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
                
                `
                <div className='scene'>
                    <div className='card'>
                        <div className='card__face card__question'>
                            <h3>${question.question}<h3>
                        </div>
                        <div className='card__face card__anwser'>
                            <p>${question.answer}<p/>
                        </div>
                    </div>
                </div>
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