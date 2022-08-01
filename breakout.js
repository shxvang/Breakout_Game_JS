var cvs = document.getElementById('canva');
var ctx = cvs.getContext('2d');
cvs.style.border = "1px solid black";
ctx.font = "30px Arial";
console.log(cvs.height)
let leftArrow = false;
let rightArrow = false;

const paddleImg = new Image();
paddleImg.src = "paddle.png";
paddleImg.setAttribute("id","paddleImage");

const ballImg = new Image();
ballImg.src = "ball.png";

// const brickImg = new Image();
const brickSource = ["rgba(255, 99, 71, 0.8)","rgba(255, 99, 71, 0.6)","rgba(255, 99, 71, 0.4)"];

// const brickSource = ["brickP1.png","brickP2.png","brickP3.png"];

let LIFE = 3;
const PADDLE_WIDTH = 250;
const PADDLE_HEIGHT = 50;
const PADDLE_MARGIN_BOTTOM = 30;
const BALL_WIDTH = 30;
const BALL_HEIGHT = 30;
let SCORE = 0;
const SCORE_UNIT = 10;

var audio_brick = new Audio('brick_hit.mp3');
var audio_paddle = new Audio('paddle_hit.mp3');

// function gameAudio(audio){
//     audio.currentTime = 0;
//     audio.play();
//     setTimeout(() => { audio.pause(); }, 10); 
// }

function gameAudio(item) {
    var thePromise = item.play();

    // if (thePromise !== undefined) {

    //     thePromise.then(function(_) {
    //         setTimeout(() => { item.pause(); }, 10);
    //         item.currentTime = 0;
    //     });
    // }

    thePromise.then(_ => {
        setTimeout(() => { item.pause(); }, 10);
        item.currentTime = 0;
        // Autoplay started!
      }).catch(error => {
        item.currentTime = 0;
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
}

let paddle={
    x: cvs.width / 2 - PADDLE_WIDTH / 2,
    y: cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 30
};

let ball={
    x: cvs.width/2 - BALL_WIDTH/2,
    y: paddle.y - BALL_HEIGHT/4 ,
    dx: Math.floor(Math.random() * 4),
    dy: -3,
    speed: 7
};

let brick = {
    row: 5,
    column: 11,
    width: 70,
    height: 35,
    offSetLeft: 20,
    marginLeft: 70,
    offSetTop: 10,
    marginTop: 30,
};

function drawPaddle(isFirst = true){
    if(!isFirst){
        ctx.clearRect(0, 0, cvs.width, cvs.height);

    }
        // console.log("bal drawn")
        ctx.drawImage(paddleImg,paddle.x,paddle.y,PADDLE_WIDTH,PADDLE_HEIGHT);
        // ctx.drawImage(brickImg, 50, 50, 30, 30);
        // ctx.drawImage(ballImg, ball.x, ball.y, BALL_WIDTH, BALL_HEIGHT);
    
}
// drawPaddle();
document.addEventListener("keydown",function(event){
    if(event.key == "ArrowLeft"){
        // console.log("Left Push")
        leftArrow = true;
    }
    else if(event.key == "ArrowRight"){
        // console.log("Right Push")

        rightArrow = true;
    }
});
document.addEventListener("keyup",function(event){
    if(event.key == "ArrowLeft"){
        // console.log("Left Up")

        leftArrow = false;
    }
    else if(event.key == "ArrowRight"){
        // console.log("Right Up")
        rightArrow = false;
    }
});

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width <= cvs.width){
        // console.log("Right Handle")
        paddle.x += paddle.dx;
    }
    else if(leftArrow && paddle.x >= 0){
        // console.log("Right Hqandle")
        paddle.x -= paddle.dx;
    }
    // document.addEventListener('mousemove',function(e){
        //     var paddleX = e.clientX;
        //     paddle.x = paddleX + 'px';
        // });
}

function drawBall(){
    ctx.drawImage(ballImg, ball.x, ball.y, BALL_WIDTH, BALL_HEIGHT);
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
    // console.log("in move----");
}
    
function ballWallCollision(){
    if(ball.x + BALL_WIDTH >= cvs.width || ball.x <= 0){
        ball.dx = -ball.dx;
        // console.log("in case1---");
    }
    if(ball.y <= 0){
        ball.dy = -ball.dy;
    }
    if(ball.y + BALL_HEIGHT > cvs.height){
        LIFE--;
        resetBallAndPaddle();
    }
}

function resetBallAndPaddle(){
    ball.x = cvs.width/2 - BALL_WIDTH/2;
    ball.y = paddle.y - BALL_HEIGHT/4;
    ball.dx = 3*(Math.floor(Math.random() * 3)) + 1,
    // 3*(Math.floor(Math.random() * 2)),
    ball.dy = -3;
    paddle.x = cvs.width / 2 - PADDLE_WIDTH / 2;
    paddle.y = cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM;
}

function ballPaddleColision(){
    if(ball.x >= paddle.x && ball.x + BALL_WIDTH <= paddle.x + PADDLE_WIDTH && ball.y > paddle.y && ball.y + BALL_HEIGHT <= paddle.y + paddle.height){
        // gameAudio(audio_paddle);     
        let collidePoint = (ball.x + BALL_WIDTH/2) - (paddle.x + PADDLE_WIDTH/2); 
        collidePoint /= PADDLE_WIDTH/2;
        let angle = collidePoint * Math.PI/3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}

let bricks = [];
function createBrick(){
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft + brick.marginLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true,
                "hitCount": 0
            };
        }
    }
    // console.log("in create---");
}


createBrick();


function drawBricks(){
    // createBrick();
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // brickImg.src = brickSource[b["hitCount"]] >= 2 ? brickSource[2] : brickSource[b["hitCount"]] ;
            let color = brickSource[b["hitCount"]] >= 2 ? brickSource[2] : brickSource[b["hitCount"]];
            if(b.status){   
                // ctx.drawImage(brickImg,b.x,b.y,brick.width,brick.height);
                
                ctx.fillStyle = `${color}`;
                ctx.fillRect(b.x,b.y,brick.width,brick.height);

            }
        }
    }
}
function brickBallCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
           let b = bricks[r][c];
           if(b.status){   
                if(ball.x + BALL_WIDTH > b.x && ball.x  < b.x + brick.width && ball.y + BALL_HEIGHT > b.y && ball.y  < b.y + brick.height){
                    // gameAudio(audio_brick);
                    if(b["hitCount"] <= 1){
                        b["hitCount"]+=1;
                        // console.log("hit count---",b["hitCount"])
                        // console.log("-------",brickSource[b["hitCount"]]);
                        // brickImg.src = brickSource[b["hitCount"]];
                        // ctx.drawImage(brickImg,b.x,b.y,brick.width,brick.height);
                        ctx.fillStyle = `${brickSource[b["hitCount"]]}`;
                        ctx.fillRect(b.x,b.y,brick.width,brick.height);
                        ball.dy = -ball.dy;
                        SCORE += SCORE_UNIT;
                    }
                    else{

                        b.status = false;
                    }
                }   
           }
        }
    }
}

let count=0
function draw(){
    // console.log("in draw")
    drawPaddle(count>0 ? false : true);
    count++;
    drawBall();
    drawBricks();
}

function update(){
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleColision();
    brickBallCollision();
}

function loop(){
    draw();
    // console.log("in loof func")
    update();

    requestAnimationFrame(loop);
}
loop();
