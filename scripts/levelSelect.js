let backgroundImg;
let startButton, font, levelInfo, dragon;

function preload(){
  font = loadFont("arcade.ttf");
  backgroundImg = loadImage("images/wood.png");
  dragon = loadImage("images/dragon.png");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  dragon.resize(0,height/5);
  if(dragon.width > width/3) dragon.resize(width/3, 0);
  levelInfo = JSON.parse(localStorage.getItem('completed'));
  textFont(font);
  background(backgroundImg);
  colorMode(HSB,360,100,100);
  rectMode(CENTER);
  textAlign(CENTER);
  fill(50,100,100);
  textSize(min(height/4, width/10));
  text("LEVEL SELECT", width/2, height*3/16);
  for(var i = 1; i < 3; i++){
    for(var k = 0; k < 5; k++){
      let cL = i*5+k-4;
      if(cL == 1 || levelInfo[cL-1])
        fill(30);
      else fill(20);
      stroke(0);strokeWeight(4);
      rect(k*width/5 + width/10, i*height/4+height/12, width/6, height/5, 20);
      fill(50,100,100);textSize(height/8);
      text(i*5+k-4, k*width/5 + width/10, i*height/4+height/12);
    }
  }
  fill(30); stroke(0); strokeWeight(4);
  rect(width*3/4, height*3/4+height/12, width/3, height/5, 20);
  fill(50,100,100); textSize(width/10);
  text("SHOP",width*3/4, height*3/4 + height*3/24);

  fill(levelInfo[10] ? 30 : 20);
  rect(width/4, height*3/4+height/12, width/3, height/5, 20);
  push();
  imageMode(CENTER);
  image(dragon, width/4, height*3/4+height/12);
  pop();
}

function mouseClicked(){
  for(var i = 1; i < 3; i++){
    for(var k = 0; k < 5; k++){
      if(collideRectCircle(k*width/5 + width/10 -width/12, i*height/4+height/12-height/10, width/6, height/5, mouseX, mouseY, 1)){
        let cL = i*5+k-4;
        if(cL == 1 || levelInfo[cL-1]){
          localStorage.setItem("currentLevel", cL);
          window.open("/customerPage.html", "_self");
        }
      }
    }
  }
  if(collideRectCircle(width*3/4-width/6, height*3/4+height/12-height/10, width/3, height/5, mouseX, mouseY, 1)){
    window.open("/shop.html", "_self");
  }
  if(levelInfo[10] && collideRectCircle(width/4-width/6, height*3/4+height/12-height/10, width/3, height/5, mouseX, mouseY, 1)){
    window.open("/battle.html", "_self");
  }

}