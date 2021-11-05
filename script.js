const DEFAULT_GRID_SIZE = 16;
const WHITE = "#FFFFFF";

const grid = document.querySelector(".grid-container");
const gridSizeText = document.querySelector("#grid-size");
const adjustColor = document.querySelector("#adjust-color");
const eraseButton = document.querySelector("#erase-btn");
const rainbowButton = document.querySelector("#rainbow-btn");
const fillButton = document.querySelector("#fill-btn");

let currentColorType = "default";

function createGrid(sideLength) {
    grid.style.gridTemplateColumns = `repeat(${sideLength}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${sideLength}, 1fr)`;
    let totalSquares = sideLength * sideLength;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.addEventListener("mousedown", colorClick);
        square.addEventListener("mouseenter", colorHover);
        grid.appendChild(square);
    }
}

function colorClick(e) {
    if (currentColorType === "rainbow") {
        e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
    else if (currentColorType === "erase") {
        e.target.style.backgroundColor = WHITE;
    }
    else {
        currentColor = adjustColor.value;
        e.target.style.backgroundColor = currentColor;
    }
}

function colorHover(e) {
    if (e.buttons === 1 || e.buttons === 2) {
        if (currentColorType === "rainbow") {
            e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        else if (currentColorType === "erase") {
            e.target.style.backgroundColor = WHITE;
        }
        else {
            currentColor = adjustColor.value;
            e.target.style.backgroundColor = currentColor;
        }
    }
}

function setColor(colorType) {
    if (currentColorType === colorType) { // case where we just deactivate button
        currentColorType = "default";
        eraseButton.classList.remove("btn-active");
        rainbowButton.classList.remove("btn-active");
        return;
    }
    if (currentColorType === "erase") {
        eraseButton.classList.remove("btn-active");
    }
    else if (currentColorType === "rainbow") {
        rainbowButton.classList.remove("btn-active");
    }
    if (colorType === "erase") {
        eraseButton.classList.add("btn-active");
        currentColorType = colorType;
    }
    else if (colorType === "rainbow") {
        rainbowButton.classList.add("btn-active");
        currentColorType = colorType;
    }
    else { // this is the case where colorType is an actual color
        currentColorType = "default";
    }
}

function clearGrid() {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = WHITE;
    }
    if (currentColorType === "erase") {
        eraseButton.classList.remove("btn-active");
    }
    else if (currentColorType === "rainbow") {
        rainbowButton.classList.remove("btn-active");
    }
    currentColorType = "default";
}

function updateGridSizeValue(value) {
    gridSizeText.textContent = `Grid Size: ${value} x ${value}`
}

function deleteGrid() {
    grid.innerHTML = "";
}

function changeGridSize(value) {
    updateGridSizeValue(value);
    clearGrid();
    deleteGrid();
    createGrid(value);
}

function fillGrid() {
    const squares = document.querySelectorAll(".square");
    if (currentColorType === "erase") {
        eraseButton.classList.remove("btn-active");
    }
    if (currentColorType === "rainbow") {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);;
        }
        return;
    }
    else {
        currentColor = adjustColor.value;
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = currentColor;
        }
        currentColorType = "default";
    }
}

window.onload = () => {
    createGrid(DEFAULT_GRID_SIZE)
}
