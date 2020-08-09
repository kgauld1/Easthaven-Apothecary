let backgroundImg;
let startButton, font, levelInfo;

function preload(){
  font = loadFont("arcade.ttf");
  backgroundImg = loadImage("images/wood.png");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  levelInfo = JSON.parse(localStorage.getItem('levels'));
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
      if(cL == 1 || levelInfo[cL-1]['beaten'])
        fill(30);
      else fill(20);
      stroke(0);strokeWeight(4);
      rect(k*width/5 + width/10, i*height/4+height/12, width/6, height/5, 20);
      fill(50,100,100);textSize(height/8);
      text(i*5+k-4, k*width/5 + width/10, i*height/4+height/12);
    }
  }
  fill(30); stroke(0); strokeWeight(4);
  rect(width/2, height*3/4+height/12, width*2/3, height/5, 20);
  fill(50,100,100); textSize(width/10);
  text("SHOP",width/2, height*3/4 + height*3/24);
}

function mouseClicked(){
  for(var i = 1; i < 3; i++){
    for(var k = 0; k < 5; k++){
      if(collideRectCircle(k*width/5 + width/10 -width/12, i*height/4+height/12-height/10, width/6, height/5, mouseX, mouseY, 1)){
        let cL = i*5+k-4;
        if(cL == 1 || levelInfo[cL-1]['beaten']){
          localStorage.setItem("currentLevel", i*5+k-4);
          window.open("/gameIndex.html", "_self");
        }
      }
    }
  }
  if(collideRectCircle(width/4-width/12, height*3/4+height/12-height/10, width*2/3, height/5, mouseX, mouseY, 1)){
    window.open("/shop.html", "_self");
  }

}