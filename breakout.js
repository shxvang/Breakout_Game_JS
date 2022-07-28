var cvs = document.getElementById('canva');
var ctx = cvs.getContext('2d');
cvs.style.border = "1px solid black";

let leftArrow = false;
let rightArrow = false;

const paddleImg = new Image();
paddleImg.src = "paddle.png";
paddleImg.setAttribute("id","paddleImage");

const ballImg = new Image();
ballImg.src = "ball.png";

const brickImg = new Image();
brickImg.src = "brickP1.png";

let LIFE = 3;
const PADDLE_WIDTH = 300;
const PADDLE_HEIGHT = 70;
const PADDLE_MARGIN_BOTTOM = 30;
const BALL_WIDTH = 30;
const BALL_HEIGHT = 30;
let SCORE = 0;
const SCORE_UNIT = 10;

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
    dx: 3*(Math.floor(Math.random() * 2)),
    dy: -3,
    speed: 5
};

let brick = {
    row: 5,
    column: 13,
    width: 70,
    height: 35,
    offSetLeft: 2,
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
        console.log("Left Push")
        leftArrow = true;
    }
    else if(event.key == "ArrowRight"){
        console.log("Right Push")

        rightArrow = true;
    }
});
document.addEventListener("keyup",function(event){
    if(event.key == "ArrowLeft"){
        console.log("Left Up")

        leftArrow = false;
    }
    else if(event.key == "ArrowRight"){
        console.log("Right Up")
        rightArrow = false;
    }
});

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width <= cvs.width){
        console.log("Right Handle")
        paddle.x += paddle.dx;
    }
    else if(leftArrow && paddle.x >= 0){
        console.log("Right Hqandle")
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
    if(ball.x + BALL_WIDTH > cvs.width || ball.x <= 0){
        ball.dx = -ball.dx;
        console.log("in case1---");
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
    ball.dx = 3*(Math.floor(Math.random() * 2)),
    ball.dy = -3;
    paddle.x = cvs.width / 2 - PADDLE_WIDTH / 2;
    paddle.y = cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM;
}

function ballPaddleColision(){
    if(ball.x >= paddle.x && ball.x + BALL_WIDTH <= paddle.x + PADDLE_WIDTH && ball.y > paddle.y && ball.y + BALL_HEIGHT <= paddle.y + paddle.height){
               
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
                status: true
            };
        }
    }
    console.log("in create---");
}


createBrick();
function drawBricks(i){
    // createBrick();
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
           let b = bricks[r][c];
           if(b.status){   
               ctx.drawImage(brickImg[i],b.x,b.y,brick.width,brick.height);
            }
        }
    }
}

function brickBallCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
           let b = bricks[r][c];
           if(b.status){   
                // if(ball.x + BALL_WIDTH >= b.x && ball.x - BALL_WIDTH <= b.x + brick.width && (ball.y <= b.y || (ball.y - b.y <= brick.height && ball.y - b.y >= 0))){
                //     b.status = false;
                //     let collidePoint = (ball.x + BALL_WIDTH/2) - (b.x + brick.width/2); 
                //     collidePoint /= brick.width/2;
                //     let angle = collidePoint * Math.PI/3;
                //     ball.dx = ball.speed * Math.sin(angle);
                //     if(ball.y <= b.y){        
                //         ball.dy = ball.speed * Math.cos(angle);
                //     }  
                //     if(ball.y - b.y <= BALL_WIDTH){
                //         ball.dy = - ball.speed * Math.cos(angle);
                //     }
                // }
                if(ball.x + BALL_WIDTH >= b.x && ball.x - BALL_WIDTH <= b.x + brick.width && ((ball.y <= b.y && b.y - ball.y <= BALL_HEIGHT) || (ball.y >= b.y  && ball.y - b.y <= brick.height))){
                    ball.dy = - ball.dy;
                    b.status = false;
                    SCORE += SCORE_UNIT;
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
