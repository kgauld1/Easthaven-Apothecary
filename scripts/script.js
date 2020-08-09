let backgroundImg, startButton, font, sc;

function preload(){
  font = loadFont("arcade.ttf");
  backgroundImg = loadImage("images/wood.png");
  sc = loadImage("images/intro.gif");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('position', 'absolute');
  canvas.style('z-index', 3);
  textFont(font);

  sc.resize(width,0);
  if(sc.height > height) sc.resize(0,height);
  let bg = createImg("images/intro.gif");
  bg.style('position', 'absolute');
  bg.style('width', sc.width + 'px');
  bg.style('height', sc.height + 'px');
  bg.position((width-sc.width)/2, (height-sc.height)/2);
  bg.style('z-index', 2);
  
  textAlign(CENTER);
  stroke(0);
  colorMode(HSB,360,100,100)
  fill(50,100,100);
  textSize(width/12);
  text("easthaven  apothecary", width/2, height/4-width/20);
  textSize(width/24);
  text("click  anywhere  to  start", width/2, height/4);
}

function mouseClicked(){
  window.open("/introduction.html", "_self");
}