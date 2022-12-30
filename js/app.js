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
