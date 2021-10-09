var bg, bgImg;
var player, shooterImg, shooter_shooting, shooter_1shooting;
var edges;
var zombieImg, bulletImg, zombieGroup, bulletGroup;
var hp, hp1Img, hp2Img, hp3Img, life = 3;
var score = 0;
var gameState = "play";
var winSound,loseSound,explosionSound

function preload() {

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/pngaaa.com-108539.png");

  hp1Img = loadImage("assets/heart_1.png");
  hp3Img = loadImage("assets/heart_3.png");
  hp2Img = loadImage("assets/heart_2.png");

  shooter_1shooting = loadImage("assets/shooter_1.png");
  bgImg = loadImage("assets/dark-horrorhalloween-gravestone-background_42665-11.jpeg")
 // winSound=loadSound("win.mp3");
  loseSound=loadSound("the-forest-of-good-and-evil-2947.mp3");
  //explosionSound=loadSound("explosion.mp3");
}

function setup() {


  createCanvas(windowWidth, windowHeight);
  zombieGroup = createGroup();
  bulletGroup = createGroup();

  //adding the background image

  //bg.scale = 2




  player = createSprite(displayWidth - 1000, displayHeight - 50, 30, 30);
  player.addImage(shooterImg)
  player.scale = 0.8
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  hp = createSprite(displayWidth - 1150, displayHeight - 700, 30, 30);
  hp.addImage(hp3Img)
  hp.scale = 0.4;



}

function draw() {
  background(bgImg);
  textSize(50)
  fill("white")
  text("Score : " + score, displayWidth / 2 + 160, displayHeight - 700)

  if (gameState === 'play') {
    spawnZombies();

    if (keyDown("UP_ARROW") && player.y > displayHeight - 30) {
      player.velocityY = -12

    }
    player.velocityY = player.velocityY + 0.8;


    if (keyWentDown("space")) {

      player.addImage(shooter_shooting)
      bullets();
      score = score + 1
  
    }

  else if (keyWentUp("space")) {
    player.addImage(shooterImg)

  }
  if (zombieGroup.isTouching(bulletGroup)) {
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();

  }
  if (zombieGroup.isTouching(player)) {
    zombieGroup.destroyEach();
    image()
    life = life - 1;

    }

  if (life === 2) {
    hp.addImage(hp2Img);
  }
  if (life === 1) {
    hp.addImage(hp1Img);

  }
  if (life === 0) {
    //hp.destroy();
    //player.addImage(shooter_1shooting);
    //player.rotation = -90
    gameState="end"

  }
  }
  if (gameState==="end"){
    hp.destroy();
    player.addImage(shooter_1shooting);
    player.rotation = -90
    player.velocityY=0
    player.y=player.y+30
 textSize(100);
 fill("red");
text("YOU LOSE!",displayWidth/2,displayHeight/2);
    loseSound.play();
  }



  edges = createEdgeSprites();
  player.collide(edges[3]);




  drawSprites();

}
function spawnZombies() {
  if (frameCount % 100 == 0) {
    var zombie = createSprite(displayWidth - 20, random(displayHeight / 2 + 50, displayHeight - 30), 10, 60);
    zombie.velocityX = -10;
    zombie.addImage(zombieImg);
    zombie.scale = 0.3;
    zombieGroup.add(zombie);
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 400, 400)

  }
}
function bullets() {
  var bullet = createSprite(player.x + 165, player.y - 80, 50, 10);
  bullet.velocityX = 10;
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}
