/* Initialization */

const BLACK_MODE = "black";
const RAINBOW_MODE = "rainbow";
const DARKEN_MODE = "darken";

let container = document.querySelector(".container");
let currentMode = BLACK_MODE;
const INITIAL_SIZE = 16;


for(let i = 0; i < INITIAL_SIZE * INITIAL_SIZE; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("drawing-div");
    container.appendChild(newDiv)
}

setUpListeners(BLACK_MODE);

const modeBlack = document.querySelector(".mode-black");
const modeRainbow = document.querySelector(".mode-rainbow")
const modeDarken = document.querySelector(".mode-darken");
const resetButton = document.querySelector(".reset");
const sizeSlider = document.querySelector(".size-slider");

modeBlack.addEventListener("click",() => setUpListeners(BLACK_MODE));
modeRainbow.addEventListener("click",() => setUpListeners(RAINBOW_MODE));
modeDarken.addEventListener("click",() => setUpListeners(DARKEN_MODE));
resetButton.addEventListener("click", () => resetBoard());
sizeSlider.addEventListener("change", updateSize);

/* Callback function for the range slider to adjust the size of the board
*/
function updateSize(e) {
    let slider = e.currentTarget;
    resizeBoard(+slider.value);
}

/* Replaces all the divs in the container with a set of new divs, the number of which is decided by the
argument sideLength */
function resizeBoard(sizeLength) {
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${sizeLength},1fr)`;
    for(let i = 0; i < sizeLength * sizeLength; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("drawing-div");
        container.appendChild(newDiv);
    }
    setUpListeners(currentMode);

}


/* Sets up the divs in the container such that they are filled with the right color when the user hovers upon them.
This function takes one argument -- mode -- which determines which color the divs are filled with when the user hovers
upon them
*/
function setUpListeners(mode) {
    let newContainer = container.cloneNode(true);
    container.parentNode.replaceChild(newContainer, container);
    container = newContainer;
    let drawingDivs = document.querySelectorAll(".container div");
    let callBack;
    switch(mode) {
        case BLACK_MODE:
            callBack = drawBlack;
            currentMode = BLACK_MODE;
            break;
        case RAINBOW_MODE:
            callBack = drawRainbow;
            currentMode = RAINBOW_MODE;
            break;
        case DARKEN_MODE:
            callBack = drawDarken;
            currentMode = DARKEN_MODE;
            break;
        default:
            console.log("Error in choosing fill mode");
    }
    drawingDivs.forEach((div) => {
        div.addEventListener("mouseover",callBack);
    })
}

/* A callback function designed for the divs in the container that will color in the div black.
*/
function drawBlack(e) {
    let currentDiv = e.currentTarget;
    currentDiv.setAttribute("data-fill", "black");
    currentDiv.style.backgroundColor = "black";
  
} 

/* A callback function designed for the divs in the container that will color in the div a randomly generated color.
*/
function drawRainbow(e) {
    let currentDiv = e.currentTarget;
    currentDiv.setAttribute("data-fill", "rainbow");
    let rgbRed = Math.floor(256 * Math.random());
    let rgbGreen = Math.floor(256 * Math.random());
    let rgbBlue = Math.floor(256 * Math.random());
    currentDiv.style.backgroundColor = `rgb(${rgbRed},${rgbGreen},${rgbBlue})`;
}   

/* A callback function designed for the divs in the container that will progressively color a div blacker each time the function
is called.
*/
function drawDarken(e) {
    let currentDiv = e.currentTarget;
    const DARKEN_INCREMENT = 256 / 10;
    if(currentDiv.getAttribute("data-fill") !== "gray") {   
        currentDiv.setAttribute("data-fill", "gray");     
        currentDiv.style.backgroundColor = `rgb(${255 - DARKEN_INCREMENT},${255-DARKEN_INCREMENT},${255-DARKEN_INCREMENT})`; 
    } else {
        let currentColor = window.getComputedStyle(currentDiv).backgroundColor;
        if (currentColor === "rgb(0, 0, 0)") return;
        let RGBValues = currentColor.slice(4,currentColor.length-1).replace(" ","").split(",");
        let newRed = RGBValues[0] - DARKEN_INCREMENT;
        let newBlue = RGBValues[1] - DARKEN_INCREMENT;
        let newGreen = RGBValues[2] - DARKEN_INCREMENT;
        currentDiv.style.backgroundColor = `rgb(${newRed},${newBlue},${newGreen})`;
    } 
    
}   


/* Resets the colors of the divs in the container 
*/
function resetBoard() {
    let divs = document.querySelectorAll(".container div");
    divs.forEach((div) => {
        div.style.backgroundColor = "rgb(255,255,255)";
        div.removeAttribute("data-fill");
    });

}

