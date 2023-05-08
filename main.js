let canvas = document.getElementById("bouncingBalls");
// ctx is a context that we will draw in it (ball or square)
// getContext is a method we write the dimention on it
let ctx = canvas.getContext("2d");
// get the width and the height of the canvas
// using double assign
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// create class ball
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    // draw is a method that we use to draw circle
    draw() {
        // beginPath method we use to start draw any shape
        ctx.beginPath();

        //  ctx.fillStyle method we use to set color of circle
        ctx.fillStyle = this.color;

        // ctx.arc is a method that we use to draw circle
        // ctx.arc method takes 5 arguments
        //  ( x , y , radius || size , start angle , end angle  )
        //  ( x , y , radius || size , start angle  , 2 * Math.PI )
        ctx.arc(this.x, this.y, this.size, 0, 360);

        // ctx.fill method finish to draw
        ctx.fill();
    }

    //   move is a method to move ball
    move() {
        // reverse directio in four directions borders
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }
        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }
        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }
        // to move ball
        this.x += this.velX;
        this.y += this.velY;
    }
    col() {
        for (let i = 0; i < balls.length; i++) {
            // the ball is not the same ball
            if (!(this === balls[i])) {
                let dx = this.x - balls[i].x;
                let dy = this.y - balls[i].y;
                // المسافه بين نقطتين
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + balls[i].size) {
                    balls[i].color = this.color = `rgb(${random(0, 255)},${random(
            0,
            255
          )},${random(0, 255)})`;
                }
            }
        }
    }
}

// create a random function
function random(min, max) {
    // Math.random() => get a random function between 0, 1
    // * max - min => to get a number > 1
    // + 1  because floor  || ceil => we delete +1
    // +min to get number between two numbers  Ex: 20 , 10
    num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}
let balls = [];

// set numbers of balls

while (balls.length < 25) {
    // set size of ball
    let size = random(10, 25);
    // create random ball
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-4, 4),
        random(-4, 4),
        `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
        size
    );
    balls.push(ball);
}
// function displayBalls to draw each ball and make it move
function displayBalls() {
    // to remove the line of ball
    ctx.fillStyle = `rgba(0,0,0,.25)`;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
        balls[i].col();
    }
    // to recursuer this function more one time
    requestAnimationFrame(displayBalls);
}
displayBalls();