const c = document.getElementById("canvas1");
const ctx = c.getContext("2d");
const width = ctx.canvas.width = 500;
const height = ctx.canvas.height = 500;
var secondsPassed;
var oldTimeStamp

var lines = [];
var pLines = [];

function toRadians(angle) {
  return (angle) * (Math.PI / 180);
}

function draw() {
  ctx.clearRect(0,0, width, height);
  for (let i=0; i<pLines.length; i++){
    ctx.beginPath();
    ctx.moveTo(pLines[i].x1 + 250, pLines[i].y1 + 250);
    ctx.lineTo(pLines[i].x2 + 250, pLines[i].y2 + 250);
    ctx.stroke();
  }
}

function line(X1, Y1, Z1, X2, Y2, Z2){
  let line = {
    "x1": X1,
    "y1": Y1,
    "z1": Z1,

    "x2": X2,
    "y2": Y2,
    "z2": Z2
  }
  lines.push(line); 
}

function project(){
  let focalLength = 200;

  for (let i=0; i<lines.length; i++){
  let x = lines[i].x1 * (focalLength / lines[i].z1);
  let y = lines[i].y1 * (focalLength / lines[i].z1);

  let xx = lines[i].x2 * (focalLength / lines[i].z2);
  let yy = lines[i].y2 * (focalLength / lines[i].z2);
  let pLine = {
      "x1": x,
      "y1": y,
     
      "x2": xx,
      "y2": yy
    }
    pLines.push(pLine);
  }
}

function translate(X, Y, Z){
  for (let i=0; i<lines.length; i++){
    lines[i].x1 += X;
    lines[i].y1 += Y;
    lines[i].z1 += Z;
    lines[i].x2 += X;
    lines[i].y2 += Y;
    lines[i].z2 += Z;
  }
}

function yRotate(angle){
  for (let i=0; i<lines.length; i++){
    let z = ((lines[i].z1 * Math.cos(angle))-(lines[i].x1 * Math.sin(angle)));
    let x = ((lines[i].z1 * Math.sin(angle))+(lines[i].x1 * Math.cos(angle)));

    let zz = ((lines[i].z2 * Math.cos(angle))-(lines[i].x2 * Math.sin(angle)));
    let xx = ((lines[i].z2 * Math.sin(angle))+(lines[i].x2 * Math.cos(angle)));

    lines[i].x1 = x;
    lines[i].z1 = z;
    lines[i].x2 = xx;
    lines[i].z2 = zz;
  }
}

function xRotate(angle){
  for (let i=0; i<lines.length; i++){
    let y = ((lines[i].y1 * Math.cos(angle))-(lines[i].z1 * Math.sin(angle)));
    let z = ((lines[i].y1 * Math.sin(angle))+(lines[i].z1 * Math.cos(angle)));

    let yy = ((lines[i].y2 * Math.cos(angle))-(lines[i].z2 * Math.sin(angle)));
    let zz = ((lines[i].y2 * Math.sin(angle))+(lines[i].z2 * Math.cos(angle)));

    lines[i].y1 = y;
    lines[i].z1 = z;
    lines[i].y2 = yy;
    lines[i].z2 = zz;
  }
}

function init(){
  line(-50,-50,-50,-50,-50,50);
  line(-50,50,-50,-50,50,50);
  line(50,50,-50,50,50,50);
  line(50,-50,-50,50,-50,50);

  line(-50,-50,50,-50,50,50);
  line(-50,50,50,50,50,50);
  line(50,50,50,50,-50,50);
  line(50,-50,50,-50,-50,50);

  line(-50,-50,-50,-50,50,-50);
  line(-50,50,-50,50,50,-50);
  line(50,50,-50,50,-50,-50);
  line(50,-50,-50,-50,-50,-50);
}

function text() {
  document.getElementById("amount").innerHTML = ("lines: " + lines.length);
}

function loop(timeStamp){

  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  secondsPassed = Math.min(secondsPassed, 0.1);
  oldTimeStamp = timeStamp;
  yRotate(toRadians(1));
  xRotate(toRadians(.5));
  translate(0,0,200);
  pLines.length = 0;
  project();
  draw();
  translate(0,0,-200);
  text();
  window.requestAnimationFrame(loop);
}

init();
//yRotate(toRadians(30));
//translate(0,0,300);
requestAnimationFrame(loop);
