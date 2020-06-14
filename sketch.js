var man,man_img,man_right,man_left;
var bg;
var ground,ground2,ground3,ground4,invisibleGround,invisibleGround2;
var germ,germ2,germ3,germ4,germs_img,germlast;
var bullet,pills;
var door,door_img;
var leftedge,rightedge,bottomedge,topedge;
var timer = 0;
var gameState = "PLAY";
var game = "ON";
var death = 0;

function preload()
{
  bg = loadImage("sprites/bg.jpg");
  bg2 = loadImage("sprites/bg2.jpg");
  man_img = loadImage("sprites/front1.png");
  man_left = loadImage("sprites/left1.png");
  man_right = loadImage("sprites/right1.png");
  germs_img = loadImage("sprites/viruses.png");
  door_img = loadImage("sprites/door.png");
  masks = loadImage("sprites/masks.png");
  stayathome = loadImage("sprites/stay at home.png");
  leftinf = loadImage("sprites/leftinf.png");
  rightinf = loadImage("sprites/rightinf.png");
  gameOver = loadImage("sprites/gameover.gif");
  last_virus = loadImage("sprites/lastvirus.png");
  win = loadImage("sprites/win.png");
  ground_img = loadImage("sprites/ground.gif");
}



function setup() 
{
  createCanvas(windowWidth,windowHeight);
  man = createSprite(50,645, 50, 50);
  man.addAnimation("right",man_right);
  man.addAnimation("left",man_left);  
  man.addAnimation("leftinfected",leftinf);
  man.addAnimation("rightinfected",rightinf);
  man.scale = 0.3;
  man.setCollider("circle",20,20);

  germ = createSprite(1200,645,30,30);
  germ.addImage("germ",germs_img);
  germ.scale = 0.25;
  germ.velocityX = -9;

  germ2 = createSprite(-100,445,30,30);
  germ2.addImage("germ",germs_img);
  germ2.scale = 0.25;
  germ2.velocityX = 10;

  germ3 = createSprite(1200,245,30,30);
  germ3.addImage("germ",germs_img);
  germ3.scale = 0.25;
  germ3.velocityX = -10; 
  

  ground = createSprite(600,699,1200,5);
  ground.shapeColor = '#ff0000';
  ground2 = createSprite(400,500,1000,5);
  ground2.shapeColor = '#ff0000';
  ground3 = createSprite(750,300,1150,5);
  ground3.shapeColor = '#ff0000';
  ground4 = createSprite(400,100,1100,5);
  ground4.shapeColor = '#ff0000';

  topedge = createSprite(600,0,1200,2);
  bottomedge = createSprite(600,700,1200,2);
  leftedge = createSprite(0,350,2,1000);
  rightedge = createSprite(1200,350,2,1000);

  invisibleGround = createSprite(370,480,900,5)
  invisibleGround.visible = false;
  invisibleGround2 = createSprite(750,280,900,5);
  invisibleGround2.visible = false;

  door = createSprite(50,50,10,10);
  door.addAnimation("door",door_img);
  door.scale = 0.5;

  germlast = createSprite(600, 200,100,100);
  germlast.rotationSpeed = 7;
  germlast.addAnimation("lastone",last_virus);
  germlast.scale = 0.35;
  germlast.visible = false;

  germlast2 = createSprite(600, 200,100,100);
  germlast2.rotationSpeed = 7;
  germlast2.addAnimation("lastone",last_virus);
  germlast2.scale = 0.35;
  germlast2.visible = false;

  germlast3 = createSprite(600, 200,100,100);
  germlast3.rotationSpeed = 7;
  germlast3.addAnimation("lastone",last_virus);
  germlast3.scale = 0.35;
  germlast3.visible = false;

  man2 = createSprite(100,630,50,50);
  man2.addImage("front",man_img);
  man2.scale = 0.30;
  man2.visible = false;
}





function draw() 
{
  if(game === "ON")
  {
  background(bg);
  image(masks,200,150,400,150);
  image(stayathome,600,400,450,150);
  textSize(20);
  fill("white");
  text("If you touch a germ, you will be infected and it will be harder to move!!",350,650);
  text("If you touch a germ thrice, you will die!!",400,350);
  text("Beware! You might also feel the pull of germs sometimes!!",400,150);
  
  man.collide(ground);
  man.collide(ground2);
  man.collide(ground3);
  man.collide(ground4); 
  man.collide(topedge);
  man.collide(bottomedge);
  man.collide(leftedge);
  man.collide(rightedge);
  germ2.collide(invisibleGround);
  germ3.collide(invisibleGround2);
  germ3.collide(ground2);


  man2.collide(rightedge);
  man2.collide(leftedge);
  
  if(gameState === "PLAY")
  {

  if(keyDown("RIGHT_ARROW"))
  {
   man.changeAnimation("right",man_right);
   man.x += 15;          
  }
  if(keyDown("LEFT_ARROW"))
  {
    man.changeAnimation("left",man_left);
    man.x -= 15;
  }
  if(keyDown("UP_ARROW"))
  {        
    man.velocityY = -10;
  }
  }


  man.velocityY = man.velocityY + 0.8;
  germ2.velocityY = germ2.velocityY + 0.8;
  germ3.velocityY = germ3.velocityY + 0.8;
   

  if(man.collide(germ))
  {
    germ.x = 1600;
    germ.velocityX = -10;
    man.velocityX = 0;
    gameState = "INFECTED";
    death++;
  }
  if(man.collide(germ2))
  {
    germ2.x = -300;
    germ2.y = 445;
    germ2.velocityX = 10;
    man.velocityX = 0;
    death++;
    gameState = "INFECTED";
  }
  if(man.collide(germ3))
  {
    germ3.x = 1500;
    germ3.y = 245;
    germ3.velocityX = -10;
    man.velocityX = 0;
    death++;
    gameState = "INFECTED";
  }
  if(germ.x < 0)
  { 
    germ.x = 1200;
    germ.velocityX = -10;
  }
  if(germ2.y > 700)
  {
    germ2.x = 0;
    germ2.y = 445;
  }
  if(germ3.y > 400)
  {
    germ3.x = 1200;
    germ3.y = 245;
  }
  if(death === 3)
  {
    game = "OFF";
  }

if(gameState === "INFECTED")
{
  
  if(keyDown("RIGHT_ARROW"))
  {
   man.changeAnimation("rightinfected",rightinf);
   man.x += 10;          
  }
  if(keyDown("LEFT_ARROW"))
  {
    man.changeAnimation("leftinfected",leftinf);
    man.x -= 10;
  }
  if(keyDown("UP_ARROW"))
  {        
    man.velocityY -= 10;
  }
 }

  if(man.x <= 50 && man.y <= 100)
  {
    gameState = "NEXT_LEVEL";
  }
  
  
  if(gameState === "NEXT_LEVEL")
  { 
    reset(); 
    fill("white");
    textSize(40);
    text("DODGE ALL THE GERMS!!",400,350);
    man2.setCollider("rectangle",0,0,200,250);
    man2.visible = true;
    germlast.visible = true;
    germlast.velocityY = 18;
    if(germlast.y > 750)
    {
      germlast.y = 0;
      var rand = random(400,600);
      germlast.x = rand;
      timer++;
    }
    if(germlast2.y > 750)
    {
      germlast2.y = 0;
      var rand2 = random(10,300);
      germlast2.x = rand2;
    }
    if(germlast3.y > 750)
    {
      germlast3.y = 0;
      var rand3 = random(700,1100);
      germlast3.x = rand3;
    }
    if(keyDown("RIGHT_ARROW"))
    {
      man2.x += 15;          
    }
    if(keyDown("LEFT_ARROW"))
    {
      man2.x -= 15;
    }
    if(man2.collide(germlast))
    {
      game = "OFF";
    }
    if(man2.collide(germlast2))
    {
      game = "OFF";
    }
    if(man2.collide(germlast3))
    {
      game = "OFF";
    }
    if(timer === 20)
    {
      germlast.velocityY = 0;
      man2.velocityX = 0;
      germlast2.velocityY = 0;
      germlast3.velocityY = 0;
      germlast3.visible = false;
      germlast2.visible = false;
      germlast.visible = false;
      man2.visible = false;
      image(win,0,0,1200,1000);
    }
    if(timer === 5||timer === 6||timer === 7||timer === 8||timer === 9)
    {
      germlast.velocityY = 21;
      germlast2.visible = true;
      germlast2.velocityY = 18;
    }
    if(timer === 10||timer === 11|| timer === 12||timer === 13||timer === 14)
    {
      germlast.velocityY = 24;
      germlast2.velocityY = 21;
      germlast3.visible = true;
      germlast3.velocityY = 18;
    }
    if(timer === 15||timer === 16|| timer === 17|| timer === 18|| timer === 19)
    {
      germlast.velocityY = 27;
      germlast2.velocityY = 24;
      germlast3.velocityY = 21;
    }
  }
  drawSprites();
}
if(game === "OFF")
{
  image(gameOver,0,0,1200,1200);
}
}
function reset()
{
  background(bg2);
  ground2.destroy();
  ground3.destroy();
  ground4.destroy();
  germ.destroy();
  germ2.destroy();
  germ3.destroy();
  man.destroy();
  door.destroy();  
}