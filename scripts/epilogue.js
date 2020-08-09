let story = ["You've defeated the evil dragon. Your destiny has been fulfilled, and you can finally go on to live the peaceful life you've always wanted to live. What will you do? That's all up to you, but you've made a good life here in Easthaven, brewing potions for the locals. Some have even begun to appreciate your work.", "Your story is yours to write. Because of you, Easthaven is safe from the dragon. Thank you for your work. Goodbye!"];
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
  frameRate(20);
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
    gp.text("press any key to cont", gp.width/2+gp.width/30, gp.height*13/16, gp.width/2-gp.width/8, gp.height/8);
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
    window.open("/index.html", "_self");
}