//creates global variables for star, fairy and background images
var starImg, fairyImg, bgImg;
//creates global variables for fairy and fairyVoice
var fairy , fairyVoice;
//creates global variables for star and starBody
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//loads the image to the star sprite
	starImg = loadImage("images/star.png");
	//loads animation and sound to the fairy sprite
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");
	//loads image to the background
	bgImg = loadImage("images/starNight.png");
}

function setup() 
{
	//creates the canvas
	createCanvas(800, 750);

	fairyVoice.play();

    //creates the fairy sprite
	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying", fairyImg);  
	fairy.scale = 0.25;

    //creates the star sprite
	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution : 0.5, isStatic : true});
	World.add(world, starBody);
	
	Engine.run(engine);
}

function draw() 
{
    //cleans the background                                       
    background(bgImg);

    Engine.update(engine);

	ellipse(RADIUS);
	fill("yellow");
    ellipse(starBody.position.x, starBody.position.y, 5);

    star.x = starBody.position.x;
	star.y = starBody.position.y;

	console.log(fairy.x);

    if(fairy.x > 500)
	{
		star.velocityY = 2;
		Matter.Body.setStatic(starBody, {isStatic : false});
	}

    if(star.y === 480)
	{
		star.velocityY = 0;
		Matter.Body.setStatic(starBody, {isStatic : true});
	}

    //draws sprite on the screen
    drawSprites();
}

function keyPressed() 
{
	if(keyCode === RIGHT_ARROW)
	{
		fairy.x = fairy.x + 20;
	}
	if(keyCode === LEFT_ARROW)
	{
		fairy.x = fairy.x - 20;
	}
}
