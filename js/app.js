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
// canvas
const game = document.getElementById("river")
// score
const score = document.getElementById("score")
// lost fish
const lostFish = document.getElementById("lost-score")

const ctx = game.getContext("2d")

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
// game.width = 800


// const player = new Bucket(265, 800, 70, 90, 'brown')
//bucket
const player = {
    x : 265,
    y : 800,
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
        console.log('this is the key in setDirection', key)
        if (key.toLowerCase() == 'a') { this.direction.left = true }
        if (key.toLowerCase() == 'd') { this.direction.right = true }
    },
    unsetDirection: function (key) {
        console.log('this is the key in unsetDirection', key)
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
    





const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    player.movePlayer()
    // movement.textContent = `${player.x}, ${player.y}`
}



// keydown will set a player's direction
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

document.addEventListener('DOMContentLoaded', function () {
    gameInterval
})