const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("p")

function getTime() {
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const seconds = date.getSeconds()

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`
}
function init() {
    getTime()
    setInterval(getTime, 1000)
}
init()

// setInterval(function, seconds)
// function 호출 시 function() X -> function
// function() -> function 즉시 호출, setInterval보다 먼저 실행

