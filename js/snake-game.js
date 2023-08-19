let blockSize = 20; //size of the game layout
let total_row = 30; //total row number, size of the bg horizontally
let total_col = 30; //total column number, size of the bg vertically
let board; //declared variable for later in the code
let context; //declared variable for later in the code

let snakeX = blockSize * 5; //something about the size of the snake, the block size
let snakeY = blockSize * 5; //something about the size of the snake, the block size

// Set the total number of rows and columns
let speedX = 0; //speed of snake in x coordinate, this has to be zero because the snake will move across the screen by itself
let speedY = 0; //speed of snake in Y coordinate,

let snakeBody = [];

let foodX; //declaring the food in the game and its for the x coordinates
let foodY; //declaring the food in the game and its for the y coordinates

let gameOver = false;

window.onload = function () {  //this is saying that on page load do "this"
    // THIS SECTION OF THE CODE IS FOR WHEN THE PAGE LOADS THE LAYOUT OF THE BOARD IS LOADED, SETTING WIDTH, HEIGHT, SPEED OF SNAKE, AND PLACEMENT OF FOOD WHILE TALKING TO THE HTML THROUGH CANVAS TO DISPLAY ALL PROPERTIES
    board = document.getElementById("board"); // this is jquery calling the id=board in the html
    board.height = total_row * blockSize; // blockSize * the total_row will be defined/stored in the board.height, making it easier down the line to call that again?
    board.width = total_col * blockSize; // same as code above?
    context = board.getContext("2d"); // calling getContext is giving us access to the canvas used to display the game from the html, and that with the board is equal to context

    placeFood(); //food in reference to the snake
    document.addEventListener("keyup", changeDirection); //for movements, event listener is finding the release of the key to execute
    // Set snake speed
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {     //if this is "false" because its declared on top that it is false
        return;
    }

    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {

        // Out of bound condition
        gameOver = true;
        alert("Game Over");
        // alert("try again?");
        // this works with a popup alert but i dont know how to get it to refresh page when its clicked
    }


    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {

            // Snake eats own body
            gameOver = true;
            alert("Game Over");
            // alert("try again?");
            // this works with a popup alert but i dont know how to get it to refresh page when its clicked
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code === "ArrowDown" && speedY !== -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code === "ArrowLeft" && speedX !== 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code === "ArrowRight" && speedX !== -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;

    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

// function gameOverImg(){
//     if(gameOver === true){
//         return
//     }
//
// }



///////////////////////////////////////////////////////////////////////////////////////////////////

//this is for the refresh button

const refreshPage = document.querySelector('.refresh');
refreshPage.addEventListener('click', ()=>{
    window.location.reload();
})

// setTimeout(function() { alert("hi"); }, 1800);
//this is a timer i could potential user for the popup for the game over

//IDEA: what it you make a function to say to adda the cookie pop up after you die ?