
//GAMEINDEX/GAMESCRIPT: Potion brewing!

//variables - can we pls organize these
//image variables
let gameBackground, book, potionsBg, potionScreen, textbox, potion_shown, fairy, healing, lunar;

//button variables
let b1, brew, clear, bookPage;

//design variables
let font, brewing, potion_dict, potion_names, vial_colors;

//potion variables
let ppos, psize, yCount, lCount, dCount, aCount, brewing_count, p1, p2, p3, p4, v_w, v_h, vial_array;

let textboxShow, startTime, levelInfo;

function preload(){
  font = loadFont("arcade.ttf");
  potionScreen = loadImage("images/potionscreen.png")
  serveScreen = loadImage("images/serveScreen.png")
  textbox = loadImage("images/textbox_noarrow.png")
  p1 = loadImage("images/potion1.png");
  p2 = loadImage("images/potion2.png");
  p3 = loadImage("images/potion3.png");
  p4 = loadImage("images/potion4.png");
  potion_shown = loadImage("images/empty_bottle.png")
  fairy = loadImage("images/fairy.png");
  lunar = loadImage("images/")

}

function setup(){
  textFont(font);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);

  potionScreen.resize(width, height);
  serveScreen.resize(width, height);
  textbox.resize(30/85*width, 1/5*height);
  potion_shown.resize(15/85*width, 26/50*height);

  textboxShow = createGraphics(textbox.width, textbox.height);
  p1.resize(4/85*width, 5/50*height);
  p2.resize(4/85*width, 5/50*height);
  p3.resize(4/85*width, 5/50*height);
  p4.resize(4/85*width, 5/50*height);

  brewing = true;
  brewing_count = [0,0,0,0];
  v_w = 1/85*width;
  v_h = 3/50*height;

  gameBackground = potionScreen;

  ppos = [{'x': 60/85*width, 'y': 1/5*height},
          {'x': 74/85*width, 'y': 1/5*height},
          {'x': 60/85*width, 'y': 3/5*height},
          {'x': 74/85*width, 'y': 3/5*height}]
  psize = {'x': 9/85*width,'y': 1/5*height};

  potion_dict = {0: [0,1,2,2], 1:[3,1,2,0], 2:[1,2,3,3]} //index of potion maps to 
  
  //recipe
  potion_names = ["Fairy Tonic", "Healing Potion", "Lunar Phoenix"]

  vial_colors = ["#00C853","#5E35B1","#C51162","#0D47A1"]
  vial_array = [];
  levelInfo = JSON.parse(localStorage.getItem('levels'))[localStorage.getItem('currentLevel')];
  bookPage = 0;
}

function draw(){
  background(gameBackground);
  showText();

}



function showText(){
  textSize(36);
  fill(0);

  order = localStorage.getItem("customerOrder")

  fill(150);
  //image(textbox, 15/85*width, 38/50*height)
  textboxShow.image(textbox,0,0);
  textboxShow.textFont(font);
  fill(0);
  textboxShow.textSize(textboxShow.height/5);
  textboxShow.textAlign(CENTER);
  //order = 0;
  if (order == undefined || isNaN(order)){
    textboxShow.text("No current orders", textboxShow.width/8, textboxShow.height/3, textboxShow.width*3/4, textboxShow.height*5/8);
  } else{
    textboxShow.textSize(textboxShow.height/6.5)
    textboxShow.text("The customer ordered "+ potion_names[order]+ "!", textboxShow.width/8, textboxShow.height/3, textboxShow.width*3/4, textboxShow.height*5/8);
  }
  image(textboxShow,15/85*width, 38/50*height, textboxShow.width, textboxShow.height);

  textAlign(CENTER);
  if(brewing){
    textSize(min(width/40, height/35));
    //rect(61/85*width,height/10-height/50,width*10/85,height/25);
    textSize(width/50);
    text("CLEAR BREW", 11.55/15*width, height*1.1/10)
    textSize(min(width/40, height/32));
    text("REVIEW", 78.5/85*width, 5.5/50*height);
    text("yggdrasil", ppos[0].x+psize.x/2, ppos[0].y-10);
    text("liliac", ppos[1].x+psize.x/2, ppos[1].y-10);
    text("dragonfruit", ppos[2].x+psize.x/2, ppos[2].y-10);
    text("aquamarine", ppos[3].x+psize.x/2, ppos[3].y-10);
    for(var i = 0; i<vial_array.length; i++){
      vial_array[i].show();
    }
  } else{
    text("BREW AGAIN", 65.5/85*width, 5.5/50*height);
    text("SERVE", 78.5/85*width, 5.5/50*height);
    if(isNaN(order)){
      text("Go get an order first!", 72.5/85*width, 44/50*height);
      image(potion_shown, 64.5/85*width, 1/5*height);
    } else{
      text("Here is your finished " + potion_names[order], 72.5/85*width, 44/50*height);
    }
  }
  fill(0);
  textSize(3/50*height);
  text(potion_names[bookPage], 12/85*width,10/50*height,14/85*width,height/3);
  image(p1, 36/85*width, 7/50*height);
  text("x"+potion_dict[bookPage][0], 42/85*width, 10/50*height);
  image(p2, 36/85*width, 13/50*height);
  text("x"+potion_dict[bookPage][1], 42/85*width, 16/50*height);
  image(p3, 36/85*width, 19/50*height);
  text("x"+potion_dict[bookPage][2], 42/85*width, 22/50*height);
  image(p4, 36/85*width, 25/50*height);
  text("x"+potion_dict[bookPage][3], 42/85*width, 28/50*height);
}

function mousePressed(){
  for(var i = 0; i < ppos.length; i++){
    if(collide(ppos[i].x,ppos[i].y,psize.x,psize.y)){
      if(brewing_count[i]<3){
        console.log("button " + (i+1));
        var x_vial = ppos[i].x + 4*brewing_count[i]/85*width;
        var y_vial = ppos[i].y + psize.y + 2/50*height;
        vial_array.push(new Vials(x_vial, y_vial, vial_colors[i]))
        brewing_count[i] += 1;
      }
    }
  }
  if(collide(60/85*width,3/50*height,11/85*width,4/50*height)){
    clearBrew();
  }
  else if(collide(9/85*width, 3/50*height, 20/85*width, 3/5*height)){
    if(bookPage > 0){
      bookPage -= 1;
    }
  }
  else if(collide(30/85*width, 3/50*height, 20/85*width, 3/5*height)){
    if(bookPage < potion_names.length-1){
      bookPage += 1;
    }
  }
  else if(mouseX>73/85*width && mouseY>3/50*height && mouseX<84/85*width && mouseY<7/50*height){
    if(brewing){
      goBrew();
    } else{
      //var order = parseInt(localStorage.getItem("customerOrder"))
      var order = 1;
      console.log(order);
      console.log(potion_dict[order])
      var recipe = potion_dict[order]
      var summ = 0;
      for(var i=0; i<recipe.length; i++){
        summ += abs(recipe[i]-brewing_count[i]) //score is just the sum of differences between each ingredient
      }
      localStorage.setItem("score", summ);
      window.open("/customerPage.html", "_self");
    }
  }
}
function collide(a,b,c,d){
  return collideRectCircle(a,b,c,d,mouseX,mouseY,1);
}

function goBrew(){
  brewing = false;
  gameBackground = serveScreen;
}

function clearBrew(){
  brewing = true;
  gameBackground = potionScreen;
  brewing_count = [0,0,0,0];
  vial_array = [];
  //clear whatever indication of brewing there is
}

class Vials{
  constructor(xval, yval, c){
    this.x = xval;
    this.y = yval;
    this.color = c;
    console.log(c);
  }
  show(){
    noStroke();
    var c = color(this.color);
    fill(c);
    rect(this.x, this.y, v_w, v_h);
  }
}