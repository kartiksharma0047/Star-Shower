import './index.css'

document.title = "Star Shower";
document.querySelector("#app").innerHTML = "<canvas> <canvas>";

let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let stars = [];
let miniStars = [];
let backgroundStars = [];
let ticker=0;
let spawnRate=75;
let groundHeight=80;
const backgroundStarColors = ['#ffffff', '#ccccff','#b3b3b3'];
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')

addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Ball(x,y,radius) {
    let obj = {};

    obj.x = x;
    obj.y = y;
    obj.color = "#e3eaef";
    obj.Velocity = {
        x: randomIntFromRange(-4,4),
        y: 1
    };
    obj.radius = radius;
    obj.gravity = 1;
    obj.gravityLoss = 0.8;

    obj.draw = () => {
        c.save();
        c.beginPath();
        c.fillStyle = obj.color
        c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2, false)
        c.shadowColor="#e3eaef";
        c.shadowBlur=20;
        c.fill();
        c.closePath();
        c.restore();
    }
    obj.update = () => {
        obj.draw();
        if (obj.y + obj.radius+groundHeight > canvas.height - obj.Velocity.y) {
            obj.Velocity.y = -obj.Velocity.y * obj.gravityLoss;
            obj.shatter();
        } else {
            obj.Velocity.y += obj.gravity
        }
        obj.y += obj.Velocity.y;
        obj.x+=obj.Velocity.x
        if(obj.x+obj.radius+obj.Velocity.x>canvas.width || obj.x-obj.radius<=0){
            obj.Velocity.x-=obj.Velocity.x;
            obj.shatter();
        }
    }
    obj.shatter = () => {
        obj.radius -= 8;
        for (let i = 0; i < 8; i++) {
            miniStars.push(miniBall(obj.x, obj.y, randomIntFromRange(1,3)));
        }
    }

    return obj;
}

function miniBall(x, y, radius) {
    let obj = {};

    obj.x = x;
    obj.y = y;
    obj.radius = radius;
    obj.opacity = 1;
    obj.Velocity = {
        x: randomIntFromRange(-5, 5),
        y: randomIntFromRange(-35, 35)
    }
    obj.gravity = 1;
    obj.gravityLoss = 0.6;
    obj.TimeToLive = 200    //100 frames life for ministar

    obj.draw = () => {
        c.save();
        c.beginPath();
        c.fillStyle = `rgba(227,234,239,${obj.opacity})`;
        c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2, false)
        c.shadowColor="#e3eaef";
        c.shadowBlur=20;
        c.fill();
        c.closePath();
        c.restore();
    }
    obj.update = () => {
        obj.draw();
        if (obj.y + obj.radius+groundHeight > canvas.height - obj.Velocity.y) {
            obj.Velocity.y = -obj.Velocity.y * obj.gravityLoss;
        } else {
            obj.Velocity.y += obj.gravity
        }
        obj.y += obj.Velocity.y;
        obj.x += obj.Velocity.x;
        obj.TimeToLive -= 1
        obj.opacity -= 1 / obj.TimeToLive;
    }

    return obj;
}

function CreateMountainRange(mountainAmount, height, color) {
    for (let i = 0; i < mountainAmount; i++) {
        const mountainWidth = canvas.width / mountainAmount;
        const MountainSteepness = 325;    // We can change it accordingly
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + MountainSteepness, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - MountainSteepness, canvas.height)
        c.fillStyle = color
        c.fill();
    }

}

function Stars(x, y, radius, colors) {
    let obj = {};
    obj.x=x;
    obj.y=y;
    obj.radius=radius;
    obj.color = colors[Math.floor(Math.random() * colors.length)];
    obj.draw = () => {
        c.beginPath();
        c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2, false);
        c.fill();
        c.fillStyle = obj.color;
        c.closePath();
    }
    
    return obj;
}
for (let j = 0; j < 250; j++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = randomIntFromRange(1, 5);
    backgroundStars.push(Stars(x, y, radius, backgroundStarColors));
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, innerWidth, innerHeight)
    
    backgroundStars.forEach((backgroundStar) => {
        backgroundStar.draw();
    })

    CreateMountainRange(1, canvas.height - 50, '#384551');
    CreateMountainRange(2, canvas.height - 250, '#2b3843');
    CreateMountainRange(3, canvas.height - 450, '#26333e');
    c.fillStyle="#182028";
    c.fillRect(0,canvas.height-groundHeight,canvas.width,groundHeight)

    stars.forEach((star, index) => {
        star.update();
        if (star.radius <= 0) {
            stars.splice(index, 1);
        }
    })
    miniStars.forEach((miniStar, index) => {
        miniStar.update();
        if (miniStar.TimeToLive == 0) {
            miniStars.splice(index, 1);
        }
    })
    ticker++;
    if(ticker%spawnRate==0){
        const radius=randomIntFromRange(10,24);
        const x=randomIntFromRange(0+radius,canvas.width-radius);
        const y=randomIntFromRange(-10,-30);
        stars.push(Ball(x,y,radius));
        spawnRate=randomIntFromRange(75,200)
    }
}
animate();