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
const clear = document.getElementById("jsClear");
const save = document.getElementById("jsSave");
const erase = document.getElementById("jsErase");

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
let erasing = false;
draw.classList.add("selected");

/* Start drawing */
function startDrawing() {
  if (!filling) drawing = true;

  if (randoming) {
    // const color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    //   Math.random() * 255
    // )},${Math.floor(Math.random() * 255)})`;
    const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    selectColor.style.backgroundColor = color;
  }

  if (erasing) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
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
  if (erasing) {
    erasing = false;
    handleModeCleaer(draw);
  }

  randoming = false;
  const color = event.target.style.backgroundColor;

  // Change color
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  selectColor.style.backgroundColor = color;
}

/* Click Random color */
function handleRandomColor() {
  if (erasing) {
    erasing = false;
    handleModeCleaer(draw);
  }
  randoming = true;
}

/* Click User pick color */
function handleUserColor(event) {
  randoming = false;
  erasing = false;
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
  handleModeCleaer(draw);
  drawing = true;
  filling = false;
  erasing = false;
}

/* Mode Fill */
function handleFillClick() {
  handleModeCleaer(fill);
  drawing = false;
  filling = true;
  erasing = false;
}

function handleFilling() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

/* Mode Erase */
function handleEraseClick() {
  handleModeCleaer(erase);
  filling = false;
  randoming = false;
  erasing = true;
  selectColor.style.backgroundColor = "white";
}

function handleErasing() {
  if (erasing) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
  }
}

/* Mode Clear */
function handleClearClick() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

/* Mode Save */
function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "yourDrawing";
  link.click();
}

/* Mode Setting */
function handleModeCleaer(mode) {
  mode.classList.add("selected");

  if (mode === draw) {
    fill.classList.remove("selected");
    erase.classList.remove("selected");
  } else if (mode === fill) {
    draw.classList.remove("selected");
    erase.classList.remove("selected");
  } else if (mode === erase) {
    draw.classList.remove("selected");
    fill.classList.remove("selected");
  }
}

/* Canvas Event */
if (canvas) {
  // Draw event
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);

  // Fill event
  canvas.addEventListener("click", handleFilling);

  // Save event
  canvas.addEventListener("contextmenu", handleContextMenu);
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

/* Mode erase */
if (erase) {
  erase.addEventListener("click", handleEraseClick);
}

/* Mode Clear */
if (clear) {
  clear.addEventListener("click", handleClearClick);
}

/* Mode Save */
if (save) {
  save.addEventListener("click", handleSaveClick);
}
