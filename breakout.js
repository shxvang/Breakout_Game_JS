const userInput = document.querySelector(".userInput")
const mainDiv = document.querySelector(".mainDiv")
const loading = document.querySelector("#loading")
loading.remove()
const canvaDiv = document.querySelector("#wrapper")
canvaDiv.remove()
const body = document.querySelector("body")
const ballStartingScreen = document.querySelector(".first")
const shadowStartingScreen = document.querySelector(".shadowBall")
const enterText = document.querySelector("#enter")
const wrapperLoadingScreen = document.querySelector(".wrapperScreen")
const classicModeBtn = document.getElementById("classic")
const neonModeBtn = document.getElementById("neon")
const retroModeBtn = document.getElementById("retro")
const playerNameInput = document.getElementById("playerName")

neonModeBtn.addEventListener("click", neonBtnPressed)
classicModeBtn.addEventListener("click", classicBtnPressed)
retroModeBtn.addEventListener("click", retroBtnPressed)
body.addEventListener("keypress", handleStart, { once: true })

playerNameInput.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        let randomMode = Math.floor(Math.random() * (2 - 0 + 1) + 0)
        if(randomMode==1){
            classicBtnPressed();
        }else if(randomMode==2){
            neonBtnPressed();
        }else{
            retroBtnPressed();
        }
    }
})
let SCORE = 0;
let playerName = "";
let LIFE = 5;

function handleStart(e) {
    if (e.key == "Enter") {
        enterText.style.setProperty("opacity", "0")
        enterText.addEventListener("transitionend", () => {
            shadowStartingScreen.style.setProperty("opacity", "0")
            shadowStartingScreen.remove();

            const propObj = {
                "background": "linear-gradient(336deg, #c4ddbd, #9d3939)",
                "background-size": "400%",
                "width": "80vmin",
                "height": "50vmin",
                "border-radius": "1.5vmin",
                "-webkit-animation": "gradient 14s ease infinite",
                "-moz-animation": "gradient 14s ease infinite",
                "animation": "gradient 14s ease infinite"
            }
            setStyles(propObj, ballStartingScreen)

            wrapperLoadingScreen.style.setProperty("box-shadow", "none")
            wrapperLoadingScreen.style.setProperty("border", "none")
            ballStartingScreen.addEventListener("transitionend", () => {
                ballStartingScreen.append(userInput)
            }, { once: true })
            userInput.style.setProperty("opacity", "1")
            userInput.style.setProperty("display", "block")


        })
    }
}
function setStyles(propObj, elem) {
    for (const key in propObj) {
        elem.style.setProperty(key, propObj[key])
    }
}
function removeForm(modeObj) {
    const cssObj = {
        "width": "100vw",
        "height": "100vh",
        "opacity": "0"
    }
    setStyles(cssObj, ballStartingScreen)
    ballStartingScreen.addEventListener("transitionend", () => {
        ballStartingScreen.remove();
        wrapperLoadingScreen.remove();
        const loadingScreen = modeObj.loadingSCR;
        const propObj = modeObj.propObj;
        setStyles(propObj, mainDiv)
        if (modeObj.loader) { mainDiv.append(loading) }

        // loading.style.setProperty("display","flex")
    },
        {
            once: true
        }
    )
    const wait4Load = setTimeout(loaded, 2650)
    function loaded() {
        // console.log("in loaded")

        if (modeObj.loader) {
            loading.style.setProperty("opacity", "0")
            loading.addEventListener("transitionend", () => {
                loading.remove();

            })
        }
        else if(modeObj.isRetro){
            const tempPropObj = {
                "margin-top": "90vmin",
                "transform": "scale(9)"


            }
            setStyles(tempPropObj, mainDiv)
        }

        playerName = playerNameInput.value;
        let scoreBoardDiv = document.createElement("div");
        scoreBoardDiv.id = "scoreBoard"
        scoreBoardDiv.style.width = "90vmin"
        displayScore(scoreBoardDiv);
        // scoreBoardDiv.innerText =`${playerName}'s score is ${currentScore}`;
        canvaDiv.append(scoreBoardDiv)
        body.append(canvaDiv)
        // mainDiv.style.setProperty("opacity", "0")
        modeObj.transitionOut(mainDiv)
        game(modeObj);
        clearTimeout(wait4Load)
    }

}
function neonBtnPressed() {
    const neonMode = {
        isNeon: true,
        loader: false,
        brickColor1: "rgba(255, 0, 153,1)",
        brickColor2: "rgba(255, 0,153, 0.6)",
        brickColor3: "rgba(255, 0, 153, 0.4)",
        propObj: {
            "background-image": `url("neonLoading.gif")`,
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center"
        },
        ballSrc: "neonBall.png",
        paddleSrc: "neonPaddle.png",
        transitionOut: function (mainDiv) {
            mainDiv.style.setProperty("opacity", "0")
            mainDiv.addEventListener("transitionend",
                () => {
                    mainDiv.remove()
                },
                {
                    once: true
                })
        }
    }
    removeForm(neonMode)

}
function classicBtnPressed() {
    const classicMode = {
        loader: true,
        brickColor1: "rgba(255, 99, 71, 0.8)",
        brickColor2: "rgba(255, 99, 71, 0.6)",
        brickColor3: "rgba(255, 99, 71, 0.4)",
        propObj: {
            "background": "linear-gradient(336deg, #c4ddbd, #9d3939)",
            "background-size": "400%",
            "-webkit-animation": "gradient 14s ease infinite",
            "-moz-animation": "gradient 14s ease infinite",
            "animation": "gradient 14s ease infinite",

        },
        ballSrc: "ball.png",
        paddleSrc: "paddle.png",
        transitionOut: function (mainDiv) {
            mainDiv.style.setProperty("opacity", "0")
            mainDiv.addEventListener("transitionend",
                () => {
                    mainDiv.remove()
                },
                {
                    once: true
                })
        }
    }

    removeForm(classicMode)
}
function retroBtnPressed() {
    const retroMode = {
        loader: false,
        brickColor1: "rgba(0,0,0,1)",
        brickColor2: "rgba(0,0,0,0.7)",
        brickColor3: "rgba(0,0,0,0.2)",
        paddleSrc: "retroPaddle.png",
        ballSrc: "retroBall.png",
        isRetro: true,
        propObj: {
            "background-image": `url("./retroLoading.gif")`,
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center",
            // "transition"  : "750ms ease-in-out"
        },
        transitionOut: function (mainDiv) {
            mainDiv.addEventListener("transitionend", () => {
                // mainDiv.remove()
                const temppObj = {
                    "background": "#7DA980",
                    "transition": "1ms ease-in-out"
                }
                setStyles(temppObj, mainDiv)
                mainDiv.addEventListener("transitionend", () => {
                    mainDiv.style.setProperty("opacity", "0")
                    mainDiv.addEventListener("transitionend",
                        () => {
                            mainDiv.remove()
                        },
                        {
                            once: true
                        })
                },
                    {
                        once: true
                    })
            },
                {
                    once: true
                })
        }
    }
    removeForm(retroMode)
}
const playerScore = document.createElement("div")
const playerLife = document.createElement("div")
function displayScore(scoreDiv = document.getElementById("scoreBoard")) {
    if (!playerName) {

        playerName = "Anonymous"
    }
    playerScore.innerText = `${playerName}'s score is ${SCORE}`
    playerLife.innerText = `Life : ${LIFE}`;
    scoreDiv.append(playerScore)
    scoreDiv.append(playerLife)
}
function game(modeObj) {
    var cvs = document.getElementById('canva');
    if (modeObj.isRetro) {
        cvs.style.backgroundColor = "#7DA980";
        body.style.fontFamily = "'Press Start 2P', cursive        ";
    }
    if (modeObj.isNeon) {
        body.classList.add("neonText");
        // body.style.fontFamily = "'Press Start 2P', cursive        ";
    }
    var ctx = cvs.getContext('2d');
    cvs.style.border = "1px solid black";
    ctx.font = "30px Arial";
    // document.getElementById("life").innerHTML = "LIFE : 5";
    // console.log(cvs.height)
    let leftArrow = false;
    let rightArrow = false;

    const paddleImg = new Image();
    paddleImg.src = modeObj.paddleSrc;
    paddleImg.setAttribute("id", "paddleImage");

    const ballImg = new Image();
    ballImg.src = modeObj.ballSrc;

    // const brickImg = new Image();
    const brickSource = [modeObj.brickColor1, modeObj.brickColor2, modeObj.brickColor3];

    // const brickSource = ["brickP1.png","brickP2.png","brickP3.png"];

    const PADDLE_WIDTH = 250;
    const PADDLE_HEIGHT = 50;
    const PADDLE_MARGIN_BOTTOM = 30;
    const BALL_WIDTH = 30;
    const BALL_HEIGHT = 30;
    const SCORE_UNIT = 5;

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
        //   console.log("audio---",item);
    }

    let paddle = {
        x: cvs.width / 2 - PADDLE_WIDTH / 2,
        y: cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dx: 30
    };

    let ball = {
        x: cvs.width / 2 - BALL_WIDTH / 2,
        y: paddle.y - BALL_HEIGHT / 4,
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

    function drawPaddle(isFirst = true) {
        if (!isFirst) {
            ctx.clearRect(0, 0, cvs.width, cvs.height);

        }
        // console.log("bal drawn")
        // ctx.shadowBlur = 0;
        // ctx.shadowColor = "black";
        ctx.drawImage(paddleImg, paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
        // ctx.drawImage(brickImg, 50, 50, 30, 30);
        // ctx.drawImage(ballImg, ball.x, ball.y, BALL_WIDTH, BALL_HEIGHT);

    }
    // drawPaddle();
    document.addEventListener("keydown", function (event) {
        if (event.key == "ArrowLeft") {
            // console.log("Left Push")
            leftArrow = true;
        }
        else if (event.key == "ArrowRight") {
            // console.log("Right Push")

            rightArrow = true;
        }
    });
    document.addEventListener("keyup", function (event) {
        if (event.key == "ArrowLeft") {
            // console.log("Left Up")

            leftArrow = false;
        }
        else if (event.key == "ArrowRight") {
            // console.log("Right Up")
            rightArrow = false;
        }
    });

    function movePaddle() {
        if (rightArrow && paddle.x + paddle.width <= cvs.width) {
            // console.log("Right Handle")
            paddle.x += paddle.dx;
        }
        else if (leftArrow && paddle.x >= 0) {
            // console.log("Right Hqandle")
            paddle.x -= paddle.dx;
        }
        // document.addEventListener('mousemove',function(e){
        //         var paddleX = e.clientX;
        //         paddle.x = paddleX + 'px';
        //     });
    }

    function drawBall() {
        // ctx.shadowBlur = 0;
        // ctx.shadowColor = "black";
        ctx.drawImage(ballImg, ball.x, ball.y, BALL_WIDTH, BALL_HEIGHT);
    }

    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;
        // console.log("in move----");
    }

    function ballWallCollision() {
        if (ball.x + BALL_WIDTH >= cvs.width || ball.x <= 0) {
            ball.dx = -ball.dx;
            // console.log("in case1---");
        }
        if (ball.y <= 0) {
            ball.dy = -ball.dy;
        }
        if (ball.y + BALL_HEIGHT > cvs.height) {
            LIFE--;
            displayScore();
            // let lifeDiv = document.getElementById("life")
            // lifeDiv.innerHTML = `LIFE : ${LIFE}`;
            resetBallAndPaddle();
        }
    }

    function resetBallAndPaddle() {
        ball.x = cvs.width / 2 - BALL_WIDTH / 2;
        ball.y = paddle.y - BALL_HEIGHT / 4;
        ball.dx = 3 * (Math.floor(Math.random() * 3)) + 1,
            // 3*(Math.floor(Math.random() * 2)),
            ball.dy = -3;
        paddle.x = cvs.width / 2 - PADDLE_WIDTH / 2;
        paddle.y = cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM;
    }

    function ballPaddleColision() {
        if (ball.x >= paddle.x && ball.x + BALL_WIDTH <= paddle.x + PADDLE_WIDTH && ball.y > paddle.y && ball.y + BALL_HEIGHT <= paddle.y + paddle.height) {
            gameAudio(audio_paddle);
            let collidePoint = (ball.x + BALL_WIDTH / 2) - (paddle.x + PADDLE_WIDTH / 2);
            collidePoint /= PADDLE_WIDTH / 2;
            let angle = collidePoint * Math.PI / 3;
            ball.dx = ball.speed * Math.sin(angle);
            ball.dy = -ball.speed * Math.cos(angle);
        }
    }

    let bricks = [];
    function createBrick() {
        for (let r = 0; r < brick.row; r++) {
            bricks[r] = [];
            for (let c = 0; c < brick.column; c++) {
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


    function drawBricks() {
        // createBrick();mo
        for (let r = 0; r < brick.row; r++) {
            for (let c = 0; c < brick.column; c++) {
                let b = bricks[r][c];
                // brickImg.src = brickSource[b["hitCount"]] >= 2 ? brickSource[2] : brickSource[b["hitCount"]] ;
                let color = brickSource[b["hitCount"]] >= 2 ? brickSource[2] : brickSource[b["hitCount"]];
                if (modeObj.isNeon) {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = color;
                }
                if (b.status) {
                    // ctx.drawImage(brickImg,b.x,b.y,brick.width,brick.height);

                    ctx.fillStyle = `${color}`;
                    ctx.fillRect(b.x, b.y, brick.width, brick.height);

                }
            }
        }
    }

    function brickBallCollision() {
        for (let r = 0; r < brick.row; r++) {
            for (let c = 0; c < brick.column; c++) {
                let b = bricks[r][c];
                if (b.status) {
                    if (ball.x + BALL_WIDTH > b.x && ball.x < b.x + brick.width && ball.y + BALL_HEIGHT > b.y && ball.y < b.y + brick.height) {
                        gameAudio(audio_brick);
                        if (b["hitCount"] <= 1) {
                            b["hitCount"] += 1;
                            // console.log("hit count---",b["hitCount"])
                            // console.log("-------",brickSource[b["hitCount"]]);
                            // brickImg.src = brickSource[b["hitCount"]];
                            // ctx.drawImage(brickImg,b.x,b.y,brick.width,brick.height);
                            ctx.fillStyle = `${brickSource[b["hitCount"]]}`;
                            ctx.fillRect(b.x, b.y, brick.width, brick.height);
                            ball.dy = -ball.dy;
                            SCORE += SCORE_UNIT;
                            displayScore();
                        }
                        else {
                            b.status = false;
                        }
                    }
                }
            }
        }
    }

    let count = 0
    function draw() {
        // console.log("in draw")
        drawPaddle(count > 0 ? false : true);
        count++;
        drawBall();
        drawBricks();
    }

    function update() {
        movePaddle();
        moveBall();
        ballWallCollision();
        ballPaddleColision();
        brickBallCollision();
    }

    function loop() {
        if (LIFE) {
            draw();
            // console.log("in loof func")
            update();

            requestAnimationFrame(loop);
        }
        else {
            document.getElementById("wrapper").innerHTML = `SCORE : ${SCORE}`;
            // console.log("Final score---", SCORE);
        }
    }
    loop();
}
