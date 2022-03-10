/**
 * 1. Draw 기능
 * 2. 색 선택
 * 3. 브러쉬 크기 지정
 * 4. fill 기능
 * 5. clear 기능
 * 6.
 */

/* variables  */
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const draw = document.getElementById("jsDraw");

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

function startDrawing() {
  drawing = true;
}

function stopDrawing() {
  drawing = false;
}

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

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
}

/* Draw */
// if (draw) {
//   draw.addEventListener("click", handleDrawing);
// }
