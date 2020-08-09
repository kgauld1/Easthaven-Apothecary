let story = ["welcome to your new job at the Easthaven Apothecary! In order to make money, you must brew potions for the customers who come to our shop. To get the most generous tips, you'll want to work both quickly and accurately. We also have a shop, where you can buy battle equipment with your money", "You'll need this equipment for your final battle with the dragon terrorizing our village, so make sure to earn as much money as you can. The village is counting on your victory against the dragon. Good luck!"];
let show = ["", ""];
let book, backgroundImg, font2, over, gp;
function preload(){
  font2 = loadFont('/nothingyoucoulddo.ttf');
  book = loadImage("images/bookcropped.png");
  backgroundImg = loadImage("images/wood.png");
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  //imageMode(CENTER);
  over =false;
  book.resize(0,3*height/4);
  gp = createGraphics(book.width, book.height);
  noStroke();
  gp.textFont(font2);
  gp.textSize(gp.height/25);
}
function draw(){
  frameRate(40);
  background(backgroundImg);
  gp.image(book,-15,0);
  if(story[0] != "" || story[1] != ""){
    if(story[0] != ""){
      show[0] += story[0].substring(0,1);
      story[0] = story[0].substring(1);
    }else{
      show[1] += story[1].substring(0,1);
      story[1] = story[1].substring(1);
    }
    gp.push(); gp.textSize(gp.height/23); gp.fill('red');
    gp.text("press any key to skip", gp.width/2+gp.width/30, gp.height*13/16, gp.width/2-gp.width/8, gp.height/8);
    gp.pop();
  }else{
    gp.push(); gp.textSize(gp.height/23); gp.fill('red');
    gp.text("press any key to start", gp.width/2+gp.width/30, gp.height*13/16, gp.width/2-gp.width/8, gp.height/8);
    gp.pop();
    over = true;
  }
  gp.text(show[0], gp.width*11/120, gp.height/8, gp.width/2-gp.width/8, gp.height*3/4);
  gp.text(show[1], gp.width/2+gp.width/30, gp.height/8, gp.width/2-gp.width/8, gp.height*3/4-gp.height/8);
  push();imageMode(CENTER);
  image(gp,width/2,height/2,gp.width,gp.height);
  pop();
}

function keyPressed(){
  if(!over){
    show[0] += story[0];
    show[1] += story[1];
    story = ["",""];
    over = true;
  }else
    window.open("/levelSelect.html", "_self");
}