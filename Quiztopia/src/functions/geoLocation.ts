

function geoLocation(setLat: any, setLng: any) {
    if('geolocation' in navigator){
        navigator.geolocation.watchPosition((position: GeolocationPosition) =>{
          const coords: GeolocationCoordinates = position.coords;
          setLat(coords.latitude)
          setLng(coords.longitude)
        
      }, error => {
        console.log('vi blev nekade', error);
      })
    }
}

export default geoLocation