import './MapboxQuiz.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG1iZXJnbWFuIiwiYSI6ImNsbHVyaDk2NDFoZ3YzcHB2aXd3dHFuZXkifQ.5wSZ2eJMGbIPBK1aNHFkQA'
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