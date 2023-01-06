//////REQUIREMENTS///////
//game should start when we click on new game
    //in the moment we click on the button newgame the initial menu should disappear and the game should start
        //before the game starts maybe we can show instructions closeable with the press of A or D key or an arrow key and the game starts then
//a square on the lower part of the screen representing the bucket
    // the shape of it could be a trapex, only the upper side should have collision
        // it requires a shape, movement, and only the x coordinates to be changed
//other squares fall from the upper part of the screen to the lower, they are the fishes
    //for the mvp we can have only one type of fish and bomb. maybe we can use a class for easily add more types
        // maybe triangles could be good since they require only the lower side to have collision
            //the fish have to spawn from over the top of the screen
//we need to catch the fish
    //when the lower side of the fish collides with the central upper part of the bucket the fish disappears and score is added
// when the score increases the speed of the fish increase too
    // set an if statement, if the score is more than increase speed multiplier
        // speed = pixel covered every 60 ms * speed multiplier
//game over occours if the buckets misses too many fishes (20?)
    // if the lower part of the fish collides with the lower part of the screen increase lose score
        // if lose score reaches 20 activate gameover()
            //check gameover() every 60 ms
                // fish despawn over the lower part of the screen  so they're out of sight
// or if we catch a bombfish (black squares)
    // make fish class objects as black squares
        // if a collision is detected gameover is activated
// once the game ends we have a display of the score and a new game button
    // an alert should suffice but a popup would be better
////////////////

//////HTML Elements ///////
//game start
let endGame = false
let gameOn = false
// canvas
const game = document.getElementById("river")
const container = document.getElementById("container")
// score
let scoreFish = 0
const topRight = document.getElementById("top-right")
const score = document.getElementById("score")
// score.innerHTML = scoreFish
//scoreBoard
const scoreBoardContainer = document.getElementById("scoreBoardContainer")
const scoreBoard = document.getElementById("scoreBoard")
// lost fish
let missedFish = 0
const lostFish = document.getElementById("lost-score")
// lostFish.innerHTML = `${missedFish} /50`

const ctx = game.getContext("2d")
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.width = 600
// game.height = 800

class Fish {
    constructor(height, width, x,  speed, safe, points, imgsrc,) {
        this.height = height
        this.width = width
        this.x = x
        this.y = -90
        this.speed = speed
        this.safe = safe
        this.points = points
        this.isVisible = true
        this.imgsrc = imgsrc
        this.render = function () {
              
        const fishImg = new Image
        fishImg.src = this.imgsrc
        ctx.drawImage(fishImg, this.x, this.y)
            // ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.fishMovement = function () {
            this.y += this.speed
            if (this.y >= game.height) {
                this.y = game.height + 1
                this.isVisible = false
                // this.fishMovement()
            }
        }
    }
}


//bucket
const player = {
    x : 250,
    y : 810,
    width : 100,
    height : 120,
    color : "brown",
    alive : true,
    speed : 15,
    direction :{
        left: false,
        right: false
    },
    setDirection : function (key) {
        // console.log('this is the key in setDirection', key)
        if (key.toLowerCase() == 'a') { this.direction.left = true }
        if (key.toLowerCase() == 'd') { this.direction.right = true }
    },
    unsetDirection: function (key) {
        // console.log('this is the key in unsetDirection', key)
        if (key.toLowerCase() == 'a') { this.direction.left = false }
        if (key.toLowerCase() == 'd') { this.direction.right = false }
    },
    movePlayer: function () {
        if (this.direction.left) {
            this.x -= this.speed
            if (this.x <= 0) {
                this.x = 0
            }
        }
        if (this.direction.right) {
            this.x += this.speed
            if (this.x + this.width >= game.width) {
                this.x = game.width - this.width
            }
        }
    },
    
    render: function () {
        
        const playerimg = new Image
        playerimg.src = "../img/pixelbucket.png"
        ctx.drawImage(playerimg, this.x, this.y)

        // ctx.fillStyle = this.color
        // ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
const goodFish = new Fish(90, 40, 290, 15, true, 5, "../img/pixelgoodfishvert.png")
// let spawnGoodFish = (fish) => {
//     return fish.x + 100
// }
const goodFish2 = new Fish(90, 40, 390, 15, true, 5, "../img/pixelgoodfishvert.png")
goodFish2.y -= 300
// const goodFish3 = new Fish(90, 40, 290, "yellow", true, 5, "../img/pixelgoodfishvert.png")
const bombFish = new Fish(60, 60, 200,  15, false, 0, "../img/pixelbombfish.png")


//fish array
const fishes = [goodFish, goodFish2, bombFish]


//function to switch game ON/OFF
const gameSwitch = () =>{
    gameOn = !gameOn
    if (gameOn){
        console.log(`The game is ON`)
    scoreBoardContainer.style.display = "none"
    console.log(scoreBoardContainer.style.display)
    }else {
        console.log(`The game is OFF`)
        scoreBoardContainer.style.display = "inline-block"
        scoreBoard.innerHTML = `PAUSED GAME<br><img src="../img/pixelgoodfishhorizontal.png"> = Good Fish, catch them to gain points <br> <img src="../img/pixelbombfish.png"> = Bad Fish, if you catch it the game is over! <hr>Click SPACE to Resume`

    }
}

//game (re)start
const gameStart = () =>{
    endGame = false
    scoreFish = 0
    missedFish = 0
    goodFish.y = -90
    goodFish2.y = -390
    bombFish.y = -90
    player.x = 265
    gameOn = true
    scoreBoardContainer.style.display = "none"
    
    for(let i = 0; i < fishes.length; i++){
        fishes[i].speed = 15
        player.speed = 15
    // console.log("game restart")
}
}

//gameOver
const gameOver = (e) =>{
    gameOn = false
    endGame = true
    scoreBoardContainer.style.display = "inline-block"
    if (e === "bomb" && scoreFish > 0){
        console.log("BOOM") 
        scoreBoard.innerHTML = `You caught ${scoreFish} lbs of Fish <br><img src="../img/pixelgoodfishhorizontal.png"><br>but you also caught a Bomb fish and your bucket exploded to pieces! <br> <img src="../img/pixelbombfish.png"> <hr> Click SPACE to start a New Game`

     } else if (e==="bomb" && scoreFish === 0){
            console.log("BOOM") 
            scoreBoard.innerHTML = `You literally caught only a Bomb fish... after I told you not to! well... now your bucket exploded to pieces and you're still hungry.<br> <img src="../img/pixelbombfish.png"> <hr> Click SPACE to start a New Game`
        }else if (e === "miss" && scoreFish > 0){
        console.log("missed too many fish")
        scoreBoard.innerHTML = `You caught ${scoreFish} lbs of Fish <br><img src="../img/pixelgoodfishhorizontal.png"><br>but you also missed ${missedFish} lbs of good fish, what a waste! <hr> Click SPACE to start a New Game`
     } else if (e === "miss" && scoreFish === 0){
        scoreBoard.innerHTML = `I'm sorry lad, I think you misunderstood what is happening here.. You missed ${missedFish} lbs of good fish, you're supposed to catch it! Try again!<br><img src="../img/pixelgoodfishhorizontal.png"><hr> Click SPACE to start a New Game`
     }
}

// speed incrementer
const speedUp = (fish) => {
    for(let i = 0; i < fishes.length; i++){
        fishes[i].speed = fishes[i].speed * 1.01
        player.speed *= 1.007
        // console.log(`speedUp: ${fish}'s speed is now: ${fish.speed}`)
        // console.log(fishes[i])
    }
    }

//a fish gets caught
const detectCatch = (fish) => {
    if (
        player.x + fish.width * 0.2 < fish.x + fish.width
        && player.x + player.width - fish.width * 0.2 > fish.x
        && player.y <= fish.y + fish.height + fish.speed
        && player.y + player.height * 0.5 > fish.y + fish.height
        // && player.y < fish.y + fish.height
        // && player.y + player.height > fish.y

        // && (player.y === fish.y + fish.height
        // || player.y +5 === fish.y + fish.height)
        )
         {
            if (fish.safe){
            console.log('got a fish!')
            scoreFish += fish.points
            fish.isVisible = false
            speedUp(fish)
            let catchSound = new Audio("../audio/catch.wav")
            catchSound.play()
        }else{
            // fish.isVisible = false
            // console.log("BOOM")
            let boomSound = new Audio("../audio/explosion.wav")
            boomSound.play()
            gameOver("bomb")
        }
        } 
    }
// if you don't catch the fish it goes miss
const missFish = (e) =>{
    if (e.y + e.speed   > game.height 
        && e.isVisible
        ) {
        e.isVisible = false
        missedFish += e.points
        if(missedFish >= 50){
            gameOver("miss")
        }
        if(e.safe){
        console.log(`you missed ${missedFish} pounds of good Fish!`)
        let missSound = new Audio("../audio/miss.wav")
        missSound.play()}
    } else if (!e.isVisible){
        e.y = -90
        e.x = (Math.floor(Math.random() * (game.width-e.width)))
        e.isVisible = true
    }
}

const fishSpawn = (fish) =>{
    fish.render()
    fish.fishMovement()
    detectCatch(fish)
    missFish(fish)
}

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
if (gameOn){
    fishSpawn(goodFish)
    fishSpawn(bombFish)
    fishSpawn(goodFish2)
player.render()
player.movePlayer()
score.innerHTML =   `Caught lbs <br>of Fish <br> ${scoreFish}`
lostFish.innerHTML = `Missed lbs<br>of Fish<br>${missedFish} /50`
}
}

//Events for key pressing and releasing
document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
document.addEventListener('keyup', (e) => {
    if(['a', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

const gameInterval = setInterval(gameLoop, 60)
const stopGameLoop = () => { clearInterval(gameInterval) }
// if(!gameOn){
    // const clearInterval = () =>{
    //     setTimeout(ctx.clearRect(0, 0, game.width, game.height), 250)
    // }
    // const pauseInterval = setInterval(() =>{
        // clearInterval()
        // stopGameLoop()
        // goodFish.render()
        // bombFish.render()
        // player.render()
    // }, 1000)
// } 


//when you click on SPACE key
document.addEventListener("keydown", (event )=> {
    if (event.isComposing || event.key === "space") {
      return;
    }
    if(event.key === " "
    && endGame === false){
        gameSwitch()
    // console.log(event.key)
    }else if(event.key === " "
    && endGame === true){
        gameStart()
    }
})

      
    
document.addEventListener('DOMContentLoaded', function () {
        gameInterval
    })

    