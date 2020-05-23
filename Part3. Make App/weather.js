const weather = document.querySelector(".js-weather")
const COORDS = "coords"
const API_KEY = "785a2b7e8615b11ddd7a89d3b0d56a1d"

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=imperial`
    )
        .then(function (response) {
            return response.json()
            // then을 이용하여 request한 데이터(fetch api)가 모두 넘어온 후에 함수 실행
        })
        .then(function (json) {
            const temperature = json.main.temp
            const place = json.name
            weather.innerText = `${temperature} @ ${place}`
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const coordsObj = {
        latitude, // latitude = latitude
        longitude, // longitude = longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError() {
    console.log("can't access geo location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
    // getCurrentPorition(위치 가져오기 성공 시 호출할 함수, 에러 시 호출할 함수)
}
// 현재 위치 불러오기
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS)
    // 현재 위치 loaderCoords에 저장

    if (loadedCoords === null) {
        askForCoords()
    } else {
        const parseCoords = JSON.parse(loadedCoords)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init() {
    loadCoords()
}

init()
