import * as dat from 'dat.gui';
import "./index.css";

// HTML element Added here
document.querySelector("#app").innerHTML = "<canvas> </canvas>";
document.title="Waves"

// Initialize canvas
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize GUI
const gui = new dat.GUI();
const wave = {
    y: canvas.height / 2,
    wavelength: 0.01,
    amplitude: 100,
    frequency:0.01
}
const StrokeColor={
    red:72,
    green:113,
    blue:247,
    transparency:1
}
const FillColor={
    red:31,
    green:31,
    blue:31,
    transparency:0.017
}

const FillFolder=gui.addFolder('FillColor')
const StrokeFolder=gui.addFolder('StrokeColor')
const waveFolder=gui.addFolder('wave')


// Add controls to GUI
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'wavelength', -0.01, 0.01)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
// waveFolder.open();   // Wave Folder open 1st at reload

StrokeFolder.add(StrokeColor,'red',0,255);
StrokeFolder.add(StrokeColor,'green',0,255);
StrokeFolder.add(StrokeColor,'blue',0,255);
StrokeFolder.add(StrokeColor,'transparency',0,1);

FillFolder.add(FillColor,'red',0,255);
FillFolder.add(FillColor,'green',0,255);
FillFolder.add(FillColor,'blue',0,255);
FillFolder.add(FillColor,'transparency',0,1);



let increment=wave.frequency
function animate() {
    requestAnimationFrame(animate);
    // Draw wave    
    c.beginPath();
    c.fillStyle=`rgba(${FillColor.red}, ${FillColor.green}, ${FillColor.blue},${FillColor.transparency})`;
    c.fillRect(0,0,canvas.width,canvas.height);
    c.moveTo(0, canvas.height / 2);
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo(i, wave.y + Math.sin(i * wave.wavelength+increment) * wave.amplitude*Math.sin(increment))
    }
    c.strokeStyle=`rgba(${StrokeColor.red},${StrokeColor.green},${StrokeColor.blue},${StrokeColor.transparency})`;
    c.stroke();
    c.closePath();
    increment+=wave.frequency;
}
animate();