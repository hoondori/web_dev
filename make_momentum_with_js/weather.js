const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = '3065cb3783446298fa18946cbf2f2388';

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json) {
        //console.log(json);  
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const coordsObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    };
    saveCoords(coordsObj)
    getWeather(coordsObj.latitude, coordsObj.longitude)
}

function handleGeoError() {
    console.log("Can't access geo location");
}
function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, 
        handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords == null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

loadCoords();