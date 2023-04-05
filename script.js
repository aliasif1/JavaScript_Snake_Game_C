//Set the canvas context object
var canvasel = document.getElementById("snake_canvas");
var ctx = canvasel.getContext("2d");

//Set the box value (unit value)
var box = 30;

//Create the snake array
var snake = [];
//Add the initial value
snake[0] = {x:box*5,y:box*5};

//set the directions to right initially 
var d = 'right'

//Add eventhandler
addEventListener('keydown',getDirection)
function getDirection(event){
    if (event.keyCode == 37 && d != 'right'){
        d = 'left'
    }
    else if (event.keyCode == 40 && d != 'down'){
        d = 'up'
    }
    else if (event.keyCode == 39 && d != 'left'){
        d = 'right'
    }
    else if (event.keyCode == 38 && d != 'up'){
        d = 'down'
    }
}



//function to Create food
function getFood(){
    let x_coor = Math.floor(Math.random()*11)*box
    let y_coor = Math.floor(Math.random()*11)*box
    let food_coor = {x:x_coor,y:y_coor}
    return food_coor
}

//function to check for collison
function checkCollision(){
    //Check with snake itself
    if (snake.length > 1){
        let x_coor = snake[0].x
        let y_coor = snake[0].y
        for(let i=1;i<snake.length;i++){
            if (x_coor == snake[i].x && y_coor == snake[i].y){
                return true
            }
        }
    }

    //check with boundaries
    if(snake[0].x > 11*box || snake[0].y > 11*box || snake[0].x < 0 || snake[0].y < 0 ){
        return true
    }

    return false
}

//set initail score 
var score = 0

//Get initial food
var food = getFood()

//Draw the figures on canvas
function Draw(){

    is_collision = checkCollision()
    //console.log(is_collision)
    if(is_collision){
        clearInterval(refresh)
        let msg = 'Game Over. Your score: ' + score 
        window.alert(msg)
        location.reload();
    }

    ctx.clearRect(0, 0, canvasel.width, canvasel.height);
    //console.log('Drawing')
    //console.log(snake)
    //Draw the snake
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i==0)?'black':'gray';
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = 'gray'
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    //Draw the food
    ctx.fillStyle = 'teal';
    ctx.fillRect(food.x,food.y,box,box);
    ctx.strokeStyle = 'gray';
    ctx.strokeRect(food.x,food.y,box,box);



    //Get new coordinates after movement

    //old_coordinates for head
    old_x = snake[0].x
    old_y = snake[0].y

    //set new coordinaes for head
    let new_head

    //get coordinates of new head block
    if (d == 'right'){
        new_head = {x:old_x+box,y:old_y}
    }
    else if (d == 'left'){
        new_head = {x:old_x-box,y:old_y}
    }
    else if (d == 'up'){
        new_head = {x:old_x,y:old_y+box}
    }
    else if (d == 'down'){
        new_head = {x:old_x,y:old_y-box}
    }

    //check if snake eats the food
    if (old_x == food.x && old_y == food.y){
        food = getFood()
        //update score
        score+=1
        document.getElementById("score_val").innerHTML = score
    }
    else{
        //Pop the last element
    snake.pop()
    }

    //Add the head block to the begining of snake array
    snake.unshift(new_head)

}


//Call the draw function after every 1 second

var refresh = setInterval(Draw,200)

