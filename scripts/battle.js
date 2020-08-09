let user, dragon, bg, textboxShow, textbox;

let dragImg, userImg
function preload(){
  font = loadFont("arcade.ttf");
  dragImg = loadImage('images/dragon.png');
  userImg = loadImage('images/user.png');
  bg = loadImage("images/battle_background.png");
  textbox = loadImage("images/textbox_noarrow.png")
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);

  textFont(font);

  user = new User();
  dragon = new Dragon();
  let buttons =  [createButton("ATTACK"),
                  createButton("PROTECT"),
                  createButton("ATK  UP"),
                  createButton("DEF  UP")]
  //button for attack

  if(width/3 < height/3) dragImg.resize(width/3, 0);
  else dragImg.resize(0, height/3);

  if(width/3 < height/3) userImg.resize(width/3, 0);
  else userImg.resize(0, height/3);

  for(let b of buttons){
    b.style('font-family', 'arcade');
    b.style('background-color', 'white');
    b.style('width', (width/6) + 'px');
    b.style('height', (width/10) + 'px');
    b.style('font-size', (width/48) + 'px')
  }
  buttons[0].position(width-width/4, height - width/7.5);
  buttons[0].mousePressed(chooseAtk);

  buttons[1].position(width-width/4, height - width/4.5);
  buttons[1].mousePressed(chooseProt);

  buttons[2].position(width-width/4-width/6, height - width/7.5);
  buttons[2].mousePressed(chooseAtkUp);

  buttons[3].position(width-width/4-width/6, height - width/4.5);
  buttons[3].mousePressed(chooseDefUp);

  textbox.resize(30/85*width, 1/5*height);
  textboxShow = createGraphics(textbox.width, textbox.height);
}
function draw(){
  //clear();
  background(bg);
  dragon.show();
  user.show();

  if(dragon.isDead()){
    window.open("/epilogue.html", "_self");
  } else if (user.isDead()){
    window.open("/index.html", "_self");
  }

  image(textboxShow,5/85*width, 3/50*height, textboxShow.width, textboxShow.height);
}
function chooseAtk(){user.attack(3);}
function chooseProt(){user.attack(4);}
function chooseAtkUp(){user.attack(1);}
function chooseDefUp(){user.attack(2);}


class Dragon{
  constructor(){
    this.player = new Player(3, 5);
  }
  attack(){
    var rng = floor(random(10));
    var str = "is attacking";
    if(rng < 6){
      this.player.attack(user.player);
    }else if(rng < 8){
      str = "raised its attack stat";
      this.player.atkUp();
    }else{
      str = "raised its defense stat"
      this.player.defUp();
    }
    textboxShow.image(textbox,0,0);
    textboxShow.textFont(font);
    fill(0);
    textboxShow.textSize(textboxShow.height/5);
    textboxShow.textAlign(CENTER);
    textboxShow.text("The dragon " + str + "!", textboxShow.width/8, textboxShow.height/3, textboxShow.width*3/4, textboxShow.height*5/8);
  }
  getHealth(){
    return this.player.hp;
  }
  isDead(){
    return this.getHealth() <= 0;
  }
  show(){
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    var size = min(width/3, height/3);
    image(dragImg, width*4.5/6, height*1.5/6);
    noStroke();
    fill('red');
    rectMode(CORNER);
    rect(width*4.5/6-size/2, height/2-height/60, size*this.getHealth()/100, height/30);
    rectMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(width*4.5/6, height/2, size, height/30);
    console.log(this.getHealth());
    pop();
  }
}

class User{
  constructor(){
    var atkval = localStorage.getItem("weapon");
    if(atkval == undefined) atkval = 1;
    else atkval = parseInt(atkval);
    var defval = localStorage.getItem("armor");
    if(defval == undefined) defval = 1;
    else defval = parseInt(defval);

    this.player = new Player(atkval, defval)
    console.log(this.player.hp);
    console.log(this.player.atk);
  }
  attack(e){
    if(e == 4 && this.player.usedProtect) return;
    switch(e){
      case 1: this.player.atkUp(); break;
      case 2: this.player.defUp(); break;
      case 3: this.player.attack(dragon.player); break;
      case 4: this.player.protect(); break;
      default: break;
    }
    dragon.attack();
    // console.log(dragon.getHealth());
    // console.log(this.getHealth());
  }
  getHealth(){
    return this.player.hp;
  }
  isDead(){
    return this.getHealth() <= 0;
  }
  show(){
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    var size = min(width/3, height/3);
    image(userImg, width*1.5/6, height*4.5/6);
    noStroke();
    fill('green');
    rectMode(CORNER)
    rect(width*1.5/6-size/2, height/2-height/60, size*this.getHealth()/100, height/30);
    rectMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(width*1.5/6, height/2, size, height/30);
    pop();
  }
}

class Player{
  constructor(atklv, deflv){
    this.atk = 10*atklv/4;
    this.def = map(deflv,1,5,1,0.5);
    this.hp = 100;
    this.isProtected = false;
    this.usedProtect = false;
  }
  atkUp(){
    this.atk += 2.5;
    this.def = max(0,this.def-2.5);
    this.usedProtect = false;
    this.isProtected = false;
  }
  defUp(){
    this.def += 2.5;
    this.atk = max(0,this.atk-2.5);
    this.usedProtect = false;
    this.isProtected = false;
  }
  protect(){
    if(this.usedProtect) return false;
    this.isProtected = true;
    this.usedProtect = true;
    return true;
  }
  attack(otherPlayer){
    this.usedProtect = false;
    this.isProtected = false;
    otherPlayer.isAttacked(this.atk + random(-2,2));
  }
  isAttacked(amount){
    if(this.isProtected) return;
    this.hp = this.hp - amount*(this.def + random(-0.05,0.05));
    console.log(this.hp);
    this.hp = round(this.hp);
    this.hp = max(0, this.hp);
  }
}