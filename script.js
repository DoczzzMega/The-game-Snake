"use strict";
// this function is strict...
let musicEnd = new Audio('fly_project.mp3');


musicEnd.addEventListener("canplaythrough", () => {
  
  const container = document.createElement("div");
document.body.prepend(container);
container.classList.add("container");

const field = document.createElement("div");
container.prepend(field);
field.classList.add("field");


for (let i = 1; i < 101; i++) {
  const exele = document.createElement("div");
  field.append(exele);
  exele.classList.add("exele");
  //exele.innerHTML += `${i}`;
}

const exeleArr = document.querySelectorAll(".exele");
let x = 1,
  y = 10;

exeleArr.forEach(function (item, index) {
  if (x > 10) {
    x = 1;
    y--;
  }
  item.setAttribute("posX", x);
  item.setAttribute("posY", y);
  x++;
});


//---------------------Create snake
function generateSnake() {     // генерирование случайной позиции для головы снейка 
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

const coordinates = generateSnake(); // стартовые координаты головы снейка в виде [x,y]
//console.log(coordinates);

let snakeBody = [document.querySelector(`[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`), // snakeBody внутри лежат дивы змейки сначала голова а дальше тело
  document.querySelector(`[posX = "${coordinates[0] - 1}"][posY = "${coordinates[1]}"]`),
  document.querySelector(`[posX = "${coordinates[0] - 2}"][posY = "${coordinates[1]}"]`),];



snakeBody.forEach(function (item) { // отрисовка изначальной змейки
  item.classList.add("bodySnake");
});
snakeBody[0].classList.add("headSnake");
//----------------------/Create snake

let speed = 310;
let interval = setInterval(move, speed);
let count = 0;

//---------------Create mouse
let mouse;

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }
  let coordinatesMouse = generateMouse(); //стартовые координаты мыши в виде [x,y]
  mouse = document.querySelector(`[posX = "${coordinatesMouse[0]}"][posY = "${coordinatesMouse[1]}"]`); // получание дива мыши с рандомными координатами.
  

  while (mouse.classList.contains("bodySnake")) {
    let coordinatesMouse = generateMouse();
    mouse = document.querySelector(`[posX = "${coordinatesMouse[0]}"][posY = "${coordinatesMouse[1]}"]`); // получание дива мыши с рандомными координатами.
  }
  mouse.classList.add("mouse"); // отрисовка мыши

  //----Change snake speed
    if (speed > 200) {
      speed -= 10;
      clearInterval(interval);
      interval = setInterval(move, speed);
    } else if (speed > 150) {
      speed -= 5;
      clearInterval(interval);
      interval = setInterval(move, speed);
    }
     //----Change snake speed
}
//----------------/Create mouse


//------------Function move
function move() {
  let snakeCoordinates = [
    Number(snakeBody[0].getAttribute("posX")),
    Number(snakeBody[0].getAttribute("posY")),
  ];
  //console.log(`snakeCoordinates: ${snakeCoordinates}`);
  snakeBody[0].classList.remove("headSnake");
  snakeBody[snakeBody.length - 1].classList.remove("bodySnake");
  snakeBody.pop();
  

  //------Control
  if (direction == 'right') {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0] + 1}"][posY = "${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${1}"][posY = "${snakeCoordinates[1]}"]`));
    }
  }

  if (direction == 'left') {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0] - 1}"][posY = "${snakeCoordinates[1]}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${10}"][posY = "${snakeCoordinates[1]}"]`));
    }
  }

  if (direction == 'up') {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${snakeCoordinates[1] + 1}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${1}"]`));
    }
  }

  if (direction == 'down') {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${snakeCoordinates[1] - 1}"]`));
    } else {
      snakeBody.unshift(document.querySelector(`[posX = "${snakeCoordinates[0]}"][posY = "${10}"]`));
    }
  }
//-------/Control

//-------Snake eats mouse
if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
  
  mouse.classList.remove('mouse');

  let a = Number(snakeBody[snakeBody.length - 1].getAttribute('posX'));
  let b = Number(snakeBody[snakeBody.length - 1].getAttribute('posY'));
  snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
  
  createMouse();
  
  score++;
  input.value = `Ваши очки: ${score}`;
  let soundEat = new Audio('ukus.mp3');
  soundEat.play();
}
//--------/snake eats mouse

//-------End game
 if (snakeBody[0].classList.contains('bodySnake')) {
   setTimeout(() => {
    alert(`Game over   Ваши очки: ${score}\n\nTry agayn :)`);
    window.location.reload();
   }, 1100);
   clearInterval(interval);
   snakeBody[0].style.backgroundColor ='rgb(71, 71, 71)';
   //let musicEnd = new Audio('fly_project.mp3');
   musicEnd.play();
 }
 //-------/end game

 snakeBody[0].classList.add("headSnake");
 snakeBody.forEach((item) => {
   item.classList.add('bodySnake');
 });

 //snakeBody[0].classList.add("bodySnake");
 //console.log(snakeBody);
 steps = true;
}
//------------/Function move


let direction = "right";
let steps = false;


let input = document.createElement('input');
document.body.append(input);
input.style.cssText = `
margin: 40px auto 0px;
font-size: 30px;
display: block;
border-radius: 5%;
box-shadow: 2px 5px 20px gray;
`;
let score = 0;
input.value = `Ваши очки: ${score}`;

window.addEventListener("keydown", function (event) {  // смена направления движения змейки
  if (steps == true) {
    if (event.code == "ArrowLeft" && direction != "right") {
      direction = "left";
      steps = false;
    } else if (event.code == "ArrowRight" && direction != "left") {
      direction = "right";
      steps = false;
    } else if (event.code == "ArrowUp" && direction != "down") {
      direction = "up";
      steps = false;
    } else if (event.code == "ArrowDown" && direction != "up") {
      direction = "down";
      steps = false;
    }
  }
});


createMouse();

});



