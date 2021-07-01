var balloon;
var database, balloonposition;

function preload(){
  database = firebase.database();
backgroundImg = loadImage("cityImage.png");
hotairballoon = loadAnimation("hotairballoon2.png", "hotairballoon3.png")
balloonImg1 = loadImage("hotairballoon2.png");
balloonImg2 = loadImage("hotairballoon3.png");
balloonImg3 = loadImage("hotairballoon3.png");
var ballposition = database.ref("Balloon/Position");
ballposition.on("value", readPosition, showError);
}

function setup() {
  createCanvas(1000,641);
  balloon = createSprite(400, 300, 50, 50);
  balloon.addAnimation("hotairballoon", balloonImg2);   
  balloon.scale = 0.7;
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the 4 arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0);
  balloon.addAnimation("hotairballoon", balloonImg3);
  balloon.velocityX=-2;
  }

  else if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    balloon.addAnimation("hotairballoon", balloonImg3);  
    balloon.velocityX=2;                                                            
  }

  else if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    balloon.addAnimation("hotairballoon", balloonImg2); 
    balloon.velocityY=-2;                                                       
  }

  else if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    balloon.addAnimation("hotairballoon", balloonImg2);     
    balloon.velocityY=2;                                                          
  }
  else  {balloon.addAnimation("flying",hotairballoon);}


  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('Balloon/Position').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
})
}

function showError(){
  console.log("error");
}