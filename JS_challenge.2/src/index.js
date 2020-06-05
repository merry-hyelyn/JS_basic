// <⚠️ DONT DELETE THIS ⚠️>
import "./style.css"
// <⚠️ /DONT DELETE THIS ⚠️>

const title = document.querySelector("h2")
title.style.color = "red"

function handleResize() {
    const w = window.innerWidth
    console.log(w)
    if (w <= 300) {
        window.style.color = "#9b59b6"
    } else if (w <= 600) {
        window.style.color = "#3498db"
    } else {
        window.style.color = "#1abc9c"
    }
}

window.addEventListener("resize", handleResize)
