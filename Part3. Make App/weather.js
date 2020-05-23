const COORDS = "coords"

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
    if (loadedCoords === null) {
        askForCoords()
    } else {
        // getWeather
    }
}

function init() {
    loadCoords()
}

init()
