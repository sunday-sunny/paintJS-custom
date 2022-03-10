/* variables  */
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const draw = document.getElementById("jsDraw");

// Color
const colors = document.getElementsByClassName("jsColor");
const selectColor = document.getElementById("jsSelectColor");
const randomColor = document.getElementById("jsRandom");
const userColor = document.getElementById("jsUserColor");

// Mode
const brushRange = document.getElementById("jsBrush");
const fill = document.getElementById("jsFill");

/* const variables */
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

/* canvas size */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* canvas initial */
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
ctx.lineJoin = "round";

/* mode condition */
let drawing = false;
let randoming = false;
let filling = false;

/* Start drawing */
function startDrawing() {
  drawing = true;

  if (randoming) {
    // const color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    //   Math.random() * 255
    // )},${Math.floor(Math.random() * 255)})`;
    const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    selectColor.style.backgroundColor = color;
  }
}

/* Stop drawing */
function stopDrawing() {
  drawing = false;
}

/* Drawing */
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!drawing) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

/* Click Palette color */
function handleColorClick(event) {
  randoming = false;
  const color = event.target.style.backgroundColor;

  // Change color
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  selectColor.style.backgroundColor = color;
}

/* Click Random color */
function handleRandomColor() {
  randoming = true;
}

/* Click User pick color */
function handleUserColor(event) {
  randoming = false;
  const color = event.target.value;

  // Change color
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  selectColor.style.backgroundColor = color;
}

/* Change Brush Range */
function handleBrushRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

/* Mode Draw */
function handleDrawClick() {
  drawing = true;
  filling = false;
}

/* Mode Fill */
function handleFillClick() {
  drawing = false;
  filling = true;
}

function handleFilling() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

/* Canvas Event */
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  canvas.addEventListener("click", handleFilling);
}

/* Palette color */
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

/* Random color */
if (randomColor) {
  randomColor.addEventListener("click", handleRandomColor);
}

/* User pick color */
if (userColor) {
  userColor.addEventListener("change", handleUserColor);
}

/* Change Brush Range */
if (brushRange) {
  brushRange.addEventListener("input", handleBrushRange);
}

/* Mode Draw */
if (draw) {
  draw.addEventListener("click", handleDrawClick);
}

/* Mode Fill */
if (fill) {
  fill.addEventListener("click", handleFillClick);
}
