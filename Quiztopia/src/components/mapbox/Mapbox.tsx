import './Mapbox.scss'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import AddQuestionComp from '../addQuestionComp/AddQuestionComp';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FybG1iZXJnbWFuIiwiYSI6ImNsbHVyaDk2NDFoZ3YzcHB2aXd3dHFuZXkifQ.5wSZ2eJMGbIPBK1aNHFkQA'

interface Props {
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
    quizName: string;
}
function Mapbox(props: Props) {
    const lat = props.lat
    const lng = props.lng
    const quizName = props.quizName
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapGl | null>(null);
    const [zoom, setZoom] = useState<number>(13);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const [clickLat, setClickLat] = useState<number>(0)
    const [clickLng, setClickLng] = useState<number>(0)
    const questionRef = useRef<mapboxgl.Marker | null>(null)
    const [showQuestion, setShowQuestion] = useState<boolean>(false)

    useEffect(() => {
        
        if (mapRef.current || !mapContainer.current) return; // initialize map only once
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
        
        map.on('click', (e) => {
            setClickLat(e.lngLat.lat)
            setClickLng(e.lngLat.lng)
            setShowQuestion(current => !current)
            questionRef.current = new mapboxgl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
        })
      }, [lat, lng, zoom, props.setLat, props.setLng, setZoom]);


    return (
        <div>
            <div ref={mapContainer} className="map-container" />
            {showQuestion && <AddQuestionComp quizName={ quizName } lat={ clickLat } lng={ clickLng }/>}
        </div>
    )
}

export default Mapbox