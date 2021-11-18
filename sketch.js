//declare constants from matter.js
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//declare variables
var engine, world;
var canvas;
var palyer, playerBase;
var computer, computerBase;

//declare an array for playerArrows 
var playerArrows = [];
//declare an array for computerArrows
var computerArrows = [];
//declare an array for arrows 
var arrow;

//function to preload the images, gifs, animations, etc.
function preload(){
//load the image for background
backgroundImg = loadImage("assets/background.gif")
}

//function to setup the game
function setup() {
//create canvas of required size
canvas = createCanvas(windowWidth - 10, windowHeight - 10);

//create the engine
engine = Engine.create();
//update the engine with respect to world
world = engine.world;

//create the playerBase
playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
//create the player
player = new Player(285, playerBase.body.position.y - 153, 50, 180);
//create the playerArcher
playerArcher = new PlayerArcher(340, playerBase.body.position.y - 180, 120, 120);
//create the computerBase
computerBase = new ComputerBase(width - 300, random(450, height - 300), 180, 150);
//create the computer
computer = new Computer(width - 280, computerBase.body.position.y - 153, 50, 180);
//create the computerArcher
computerArcher = new ComputerArcher(width - 340, computerBase.body.position.y - 180, 120, 120);
//function to manage computer Arrows
handleComputerArcher(); 
}

//function to draw the objects
function draw() {
//set a suitable color of the background
background(backgroundImg);

//update the engine
Engine.update(engine);

//set the required color of the text
fill("#FFFF");
//set the allignment of the text
textAlign("center");
//set he size of the text
textSize(40);
//write te exact text along with its size
text("EPIC ARCHERY", width / 2, 100);

//display the playerBase
playerBase.display();
//display the player
player.display();
  
//display the computerBase
computerBase.display();
//display the computer
computer.display();
  
//display the playerArcher
playerArcher.display();
//display the computerArcher
computerArcher.display()

//loop to display playerArrow(s)
for (var i = 0; i < playerArrows.length; i++) {
//use the showArrow function
showArrows(i, playerArrows);
}

//loop to display computerArrow(s)
for (var i = 0; i < computerArrows.length; i++) {
//use the showArrow function
showArrows(i, computerArrows);
}


//Call functions to detect collision for player and computer

}

//function to create the arrows
function keyPressed() {
//condition to create the arrows
if(keyCode === 32){
// create an arrow object and add into an array ; set its angle same as angle of playerArcher
var posX = playerArcher.body.position.x;
var posY = playerArcher.body.position.y;
var angle = playerArcher.body.angle+PI/2;

var arrow = new PlayerArrow(posX, posY, 100, 10);

arrow.trajectory = [];
Matter.Body.setAngle(arrow.body, angle);
playerArrows.push(arrow);
}
}

//function to release the arrows
function keyReleased () {
//condition to release the arrows
if(keyCode === 32){
//call shoot function for each arrow in an array playerArrows
if (playerArrows.length) {
//declare an angle and set its value
var angle = playerArcher.body.angle+PI/2;
//use the array to shoot the playerArrows
playerArrows[playerArrows.length - 1].shoot(angle);
}
}
}

//function to display arrow and trajectory
function showArrows(index, arrows) {
//display all the objects stored in the index value of the array
arrows[index].display();
}

//function to handle computer archer
function handleComputerArcher() {
  if (!computerArcher.collapse && !playerArcher.collapse) {
    setTimeout(() => {
      var pos = computerArcher.body.position;
      var angle = computerArcher.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.1;
      } else {
        angleValue = -0.1;
      }
      angle += angleValue;

      var arrow = new ComputerArrow(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerArcher.body, angle);
      Matter.Body.setAngle(computerArcher.body, angle);

      computerArrows.push(arrow);
      setTimeout(() => {
        computerArrows[computerArrows.length - 1].shoot(angle);
      }, 100);

      handleComputerArcher();
    }, 2000);
  }
}

function handlePlayerArrowCollision() {
for (var i = 0; i < playerArrows.length; i++){
var baseCollision = Matter.SAT.collides(playerArrows[i].body, computerBase.body);
var archerCollision = Matter.SAT.collides(playerArrows[i].body, computerArcher.body);
var computerCollision = Matter.SAT.collides(playerArrows[i].body, computer.body);
if (baseCollision.collided || archerCollision.collided || computerCollision.collided){
console.log("Player Arrow Is Collided");
}
}
}

function handleComputerArrowCollision() {
for (var i = 0; i < computerArrows.length; i++){
var playerBaseCollision = Matter.SAT.collides(computerArrows[i].body, playerBase.body);
var playerArcherCollision = Matter.SAT.collides(computerArrows[i].body, playerArcher.body);
var playerCollision = Matter.SAT.collides(computerArrows[i].body, player.body);
if (playerBaseCollision.collided || playerArcherCollision.collided || playerCollision.collided){
console.log("Computer Arrow Is Collided");
}
}
}
