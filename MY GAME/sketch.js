var sand,sandbg;
var cowboy, cowboyimg
var zombie, zombieimg
var bullet,bulletimg
var zombieGroup,bulletGroup;
var wall;





function preload(){
    sand = loadImage("IMAGES/SAND.jpg")
    cowboyimg = loadImage("IMAGES/COWBOY.png")
    zombieimg = loadAnimation("IMAGES/zombies1.png","IMAGES/zombies2.png","IMAGES/zombies3.png","IMAGES/zombies4.png","IMAGES/zombies5.png","IMAGES/zombies6.png")
bulletimg = loadImage("IMAGES/BULLET.png")
}

function setup() {
  createCanvas(1000,1000);

  sandbg = createSprite(200,200,5000,1000);
  sandbg.addImage(sand);
  sandbg.scale = 3;

  cowboy = createSprite(100,500,100,100);
  cowboy.addImage(cowboyimg);
  cowboy.scale = 0.3

  zombieGroup = createGroup()
  bulletGroup = createGroup()
  

score = 0;

wall = createSprite(200,365,100,1500);
wall.scale=0.5;
  

  
}

function draw() {
  
  background(255);

  

  if(keyDown(UP_ARROW)){
    cowboy.y = cowboy.y -10;
  }

  if(keyDown(DOWN_ARROW)){
    cowboy.y = cowboy.y +10;
  }

  if(keyDown(RIGHT_ARROW)){
    spawnBullet();
  }

  if(bulletGroup.isTouching(zombieGroup)){
 zombieDestroy();
 bulletGroup.destroyEach();
 score = score+1
  }

  spawnZombie();
  
  drawSprites();
  fill("red");
  text("Score: "+ score, 850,50);

}

function spawnZombie(){
  if(frameCount % 80 === 0){
  zombie = createSprite(1000,500,20,20);
  zombie.y = Math.round(random(100,600));
  zombie.addAnimation("zombies",zombieimg);
  zombie.velocityX = -6;
  zombie.scale = 0.9;
  zombieGroup.add(zombie)
  }
 
}

function spawnBullet(){
  bullet = createSprite(0,0,0,0);
  bullet.addImage(bulletimg);
  bullet.y = cowboy.y;
  bullet.x = cowboy.x;
  bullet.velocityX = 10;
  bullet.scale = 0.09;
  bulletGroup.add(bullet);
  
}
function zombieDestroy(){
  bulletGroup.overlap(zombieGroup, function(collector, collected) {
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });

}

function bulletDestroy(){
  zombieGroup.overlap(bulletGroup, function(collector, collected) {
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });

}

