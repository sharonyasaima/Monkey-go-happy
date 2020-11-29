var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  ground=createSprite(10,270,600,10);
  ground.shapeColour=color(120,50,8);
  monkey=createSprite(50,240,10,10);
 monkey.addAnimation ("monkey",monkey_running);
  monkey.scale=0.1;
  
  obstacleGroup=new Group();
  FoodGroup=new Group();
  
}


function draw() {
background('lightgreen');
  
  if(gameState==PLAY){
  
  ground.velocityX=-9;
  ground.x=ground.width/2;
  
  if(keyDown("space")&&monkey.y>=169) {
        monkey.velocityY = -12;
       
    }
   
    //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;                         monkey.collide(ground);
  
  
  
  score=score+Math.round(getFrameRate()/60);
  
  createObject();
  createFood();
    
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
      gameState=END;
      
      
    }
  
  }
  if(gameState==END){
    
    ground.velocityX=0;
    text("Game Over",250,150)
    text("Press on the monkey to restart",200,180);
    monkey.y=240;
    
    
    if(mousePressedOver(monkey)){
      
      reset();
    }
    
    
    
    
  }
  
  drawSprites();
  textSize(15);
  fill("black");
text("Survival time:"+score,400,30);
  
}

  function createObject() {
  // spawn the clouds
 if (frameCount % 160 === 0) {
     obstacle = createSprite(600,120,40,10);
   obstacle.y =250;
     obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(6+score/200);
    
     //assign lifetime to the obstacle
       obstacle.lifetime = 200;
   
  
    //add each obstacle to the group
  obstacleGroup.add(obstacle);
   
 }
  }
   
   
   function createFood() {
  // spawn the clouds
 if (frameCount % 100 === 0) {
     banana = createSprite(600,120,40,10);
   banana.y =Math.round(random(110,180));
     banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5+score/120);
    
     //assign lifetime to the obstacle
       banana.lifetime = 120;
   
  
    //add each obstacle to the group
  FoodGroup.add(banana);
  
 }
  
}

function reset(){
  
  gameState=PLAY;
  
  score=0;
  
}




