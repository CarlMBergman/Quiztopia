
function geoLocation(setLat: (lat: number) => void, setLng: (lat: number) => void) {
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) =>{
          const coords: GeolocationCoordinates = position.coords;
          setLat(coords.latitude)
          setLng(coords.longitude)
        
      }, error => {
        console.log('vi blev nekade', error);
      })
    }
}

export default geoLocation