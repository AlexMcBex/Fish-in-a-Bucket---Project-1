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
let gameOn = false
// canvas
const game = document.getElementById("river")
// score
let scoreFish = 0
const topRight = document.getElementById("top-right")
const score = document.getElementById("score")
score.innerHTML = scoreFish
// lost fish
let missedFish = 0
const lostFish = document.getElementById("lost-score")
lostFish.innerHTML = `${missedFish} /50`




const ctx = game.getContext("2d")

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.width = 600
// game.height = 800

class Fish {
    constructor(height, width, x, y, color, safe, points,) {
        this.height = height
        this.width = width
        this.x = x
        this.y = y
        this.color = color
        this.safe = safe
        this.points = points
        this.isVisible = true
        this.speed = 15
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.fishMovement = function () {
            this.y += this.speed
            if (this.y >= game.height) {
                this.y = game.height + 1
                this.isVisible = false
                // this.fishMovement()
            }
            if (!this.isVisible){
                this.y = -90
                this.x = (Math.floor(Math.random() * (game.width-goodFish.width)))
                this.isVisible = true
            }
        }
    }
}

// const player = new Bucket(265, 800, 70, 90, 'brown')
//bucket
const player = {
    x : 265,
    y : 810,
    width : 70,
    height : 90,
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
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
//         ctx.drawBucket = () =>{
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.moveTo(70, 0);
// ctx.lineTo(70, 5);
// ctx.lineTo(60, 60);
// ctx.lineTo(10, 60);
// ctx.lineTo(0, 5);
// ctx.fill();
    }
}

// const randomSpawn = () =>{
//     return (Math.floor(Math.random() * (game.width-this.width)))
// }
// //needs to be in a function that creates consts
// const newFish = () => {

// }
const goodFish = new Fish(50, 20, 300, -60, "yellow", true, 5,)
const bombFish = new Fish(45, 45, 200, -60, "black", false, 0)
// console.log(goodFish.y)

const detectCatch = (thing) => {
    if (
        player.x + 2 < thing.x + thing.width
        && player.x + player.width - 2 > thing.x
        && (player.y === thing.y + thing.height
        || player.y +5 === thing.y + thing.height)
        ) {
            if (thing.safe){
            console.log('got a fish!')
            scoreFish += thing.points
            thing.isVisible = false
        }else{
            thing.isVisible = false
            console.log("BOOM")
        }
        } 
    }
// if you don't catch the fish it goes miss
const missFish = (e) =>{
    if (e.y + e.height >= game.height 
        && e.isVisible) {
        e.isVisible = false
        missedFish += e.points
        if(e.safe)
        console.log(`you missed ${missedFish} pounds of good Fish!`)
    } else if (!e.isVisible){
        e.y = -90
        e.x = (Math.floor(Math.random() * (game.width-goodFish.width)))
        e.isVisible = true
    }
}

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
if (gameOn){
goodFish.render()
goodFish.fishMovement()
detectCatch(goodFish)
missFish(goodFish)
bombFish.render()
bombFish.fishMovement()
detectCatch(bombFish)
missFish(bombFish)
player.render()
player.movePlayer()
score.innerHTML = scoreFish
lostFish.innerHTML = `${missedFish} /100`}
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




// if (gameOn) {
// document.addEventListener('keydown', (event) => {
//     if (event.isComposing || event.key === 49) {
//       return;
//     }
// }
// )
const gameSwitch = () =>{
    gameOn = !gameOn
    if (gameOn){
        console.log(`The game is ON`)
    }else {
        console.log(`The game is OFF`)
    }
}
document.addEventListener("keydown", (event )=> {
    if (event.isComposing || event.key === "space") {
      return;
    }
    if(event.key === " "){
        gameSwitch()
    // console.log(event.key)
    }
})
    
    

// const gamePlay = () =>{
document.addEventListener('DOMContentLoaded', function () {
        gameInterval
    })
// }

    
// }
// if (!gameOn){
// stopGameLoop()
// topRight.style.backgroundColor = "white"
// score.innerHTML = "Click Here to \nStart"
// // topRight.addEventListener('click', gamePlay)
// }


// gamePlay()