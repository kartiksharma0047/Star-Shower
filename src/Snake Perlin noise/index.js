// Perlin noise function :- It is just a funtion which returns a value 0 to 1 i a specific sequence (It is too complex and use in snake randomness)
//In this code i installed perlin noise function library from :- https://www.npmjs.com/package/@chriscourses/perlin-noise

//Imports
import './index.css'
import { noise } from '@chriscourses/perlin-noise'


document.querySelector("#app").innerHTML="<canvas> </canvas>"
document.title="Snake perlin noise";
let canvas=document.querySelector("canvas");
let c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let time=0;   // Use in perlin function

// const mouse={
//     x:undefined,
//     y:undefined
// }
// let colors = ["#00bdff","#4d39ce","#088eff"];

// window.addEventListener("mousemove", function (event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

function randomIntFromRange(min, max) {  // Get random values -> int values
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloatFromRange(min, max) {   // Get random values -> float values
    return Math.random() * (max - min) + min;
}

// window.addEventListener("resize", function () {  //Resize canvas
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// });

// function randomColor(colors) {   //Get random color
//     return colors[Math.floor(Math.random() * colors.length)];
// }


function Circle(offset){
    let obj={};

    obj.x=-30;
    obj.y=-30;
    obj.radius=randomIntFromRange(10,20);
    obj.offset=offset
    obj.colorR=randomIntFromRange(0,255);
    obj.colorG=randomIntFromRange(0,255);
    obj.colorB=randomIntFromRange(0,255);
    obj.draw=()=>{
        c.beginPath();
        c.fillStyle=`rgb(${obj.colorR},${obj.colorG},${obj.colorB})`;
        c.arc(obj.x,obj.y,obj.radius,0,Math.PI*2,false);
        c.fill();
        c.strokeStyle="white"
        c.stroke();
        c.closePath();
    }
    obj.update=()=>{
        obj.draw();
    }


    return obj;
}
const circle=[];
for(let i=0;i<50;i++){
    circle.push(Circle(i*0.02))
}
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle="rgba(0,0,0,0.09)"
    c.fillRect(0,0,canvas.width,canvas.height);
    circle.forEach((circles)=>{
        circles.draw()
        circles.x=noise(time+circles.offset+50)*canvas.width;
        circles.y=noise(time+circles.offset)*canvas.height;
    })
    time+=0.004;
}
animate()