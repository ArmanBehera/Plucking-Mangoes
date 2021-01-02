
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var boy, boyImage;
var ground;
var stone;
var tree, treeImage;
var mango1, mango2, mango3, mango4, mango5;
var chain;

function preload(){

	// Loading the image of the boy
	boyImage = loadImage("boy.png");

	// Loading the image of the tree
	treeImage = loadImage("tree.png");
}

function setup(){
	createCanvas(1100, 550);

	engine = Engine.create();
	world = engine.world;

	// Creating the sprite of the boy
	boy = createSprite(200, 440);
	boy.addImage(boyImage);
	boy.scale = 0.1;

	// Creating a new ground using ground class
	ground = new Ground(550, 500, width, 10);

	// Creating a new stone that is attached to the boy
	stone = new Stone(145, 365, 50);

	// Creating a new tree
	tree = createSprite(900, 230);
	tree.addImage(treeImage);
	tree.scale = 0.45; 

	// Creating mangoes that are to be attached to the trees
	mango1 = new Mango(860, 100);
	mango2 = new Mango(800, 160);
	mango3 = new Mango(910, 200);
	mango4 = new Mango(950, 90);
	mango5 = new Mango(1020, 175);

	// Creating the chain that attaches the stone and the hand of the boy
	chain = new Launcher(stone.body, {x : 145, y : 365});

	Engine.run(engine);

}


function draw(){
  	rectMode(CENTER);
  	background("lightblue");

	drawSprites();

	// Displaying the ground
	ground.display();

	// Displaying the tree
	tree.display();

	// Displaying the stone
	stone.display();

	// Displaying the mangoes
	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	mango5.display();

	// Detecting the collisions between the stone and the mangoes
	detectCollision(stone, mango1);
	detectCollision(stone, mango2);
	detectCollision(stone, mango3);
	detectCollision(stone, mango4);
	detectCollision(stone, mango5);
 
}

function mouseDragged(){

	Matter.Body.setPosition(stone.body, {x : mouseX, y : mouseY});
}

function mouseReleased(){

	chain.fly();
}

function keyPressed(){

	if (keyCode === 32){

		Matter.Body.setPosition(stone.body, {x : 145, y : 365});
		chain.attach(stone.body);
	}
}

function detectCollision(stone, mango){

	var posBody1 = stone.body.position;
	var posBody2 = mango.body.position;

	var distance = dist(posBody1.x, posBody1.y, posBody2.x, posBody2.y);

	if (distance <= mango.radius + stone.radius){

		Matter.Body.setStatic(mango.body, false);
	}
}