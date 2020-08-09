//variables
let dagger, sword, breadknife, bow, bg, back, textbox, pointer, buy;
let weapons, selection, owned_money, price, sgold, textbox_noarrow, buying, first_arrived;
let weapon_array, weapon_level, armor_array, armor_level, armor_names;
let shirt, leather, chainmail, armor;

function preload(){
  font = loadFont("arcade.ttf");
  sword = loadImage("images/sword.png")
  dagger = loadImage("images/dagger.png");
  breadknife = loadImage("images/knife.png");
  bow = loadImage("images/bow.png");
  bg = loadImage("images/wood.png");
  textbox = loadImage("images/textbox_arrow.png");
  sgold = loadImage("images/coin.png");
  textbox_noarrow =loadImage("images/textbox_noarrow.png")
  pointer = loadImage("images/pointer.png");
  shirt = loadImage("images/shirt.png");
  leather = loadImage("images/leather_tunic.png");
  chainmail = loadImage("images/chain_mail.png");
  armor = loadImage("images/armor.png");

}

function setup(){
  textFont(font);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  let back = createButton("BACK");
  back.style('font-family', 'arcade');
  back.style('background-color', 'Transparent');
  back.style('width', (width/10) + 'px');
  back.style('height', (width/24) + 'px');
  back.style('font-size', (width/48) + 'px')
  back.position(width-width/8, height - width/15);
  back.mousePressed(onBackClick);

  let buy = createButton("UPGRADE");
  buy.style('font-family', 'arcade');
  buy.style('background-color', 'Transparent');
  buy.style('width', (width/10) + 'px');
  buy.style('height', (width/24) + 'px');
  buy.style('font-size', (width/48) + 'px')
  buy.position(width-width/8, height - width/9);
  buy.mousePressed(buyWeapon);

  buying = false;
  first_arrived = true;

  textbox.resize(width/2, height*10/50)
  sword.resize(16/85*width, 16/85*width);
  dagger.resize(16/85*width, 16/85*width);
  bow.resize(16/85*width, 16/85*width);
  breadknife.resize(16/85*width, 16/85*width);
  shirt.resize(16/85*width, 16/85*width);
  leather.resize(16/85*width, 16/85*width);
  chainmail.resize(16/85*width, 16/85*width);
  armor.resize(16/85*width, 16/85*width);
  textbox_noarrow.resize(20/85*width, 7/85*width);
  sgold.resize(3/85*width, 3/85*width);
  pointer.resize(4/85*width, 4/85*width);

  weapon_array = [breadknife, dagger, bow, sword];
  weapon_level = 0;
  armor_array = [shirt, leather, chainmail, armor];
  armor_level = 0;

  weapons = ["bread knife", "dagger", "bow and arrow", "sword"];
  armor_names = ["t shirt", "leather tunic", "chain mail", "armor"];
  price = [50, 80, 120, 125];

  owned_money = parseInt(localStorage.getItem("sgold"))
  //owned_money = 0;
  if (owned_money==null || isNaN(owned_money)){
    owned_money = 0;
  }

  selection = 0;

  pre_armor = localStorage.getItem("armor");
  if (pre_armor == null || isNaN(pre_armor)){
    localStorage.setItem("armor", armor_level);
    localStorage.setItem("weapon", weapon_level);
  }
  armor_level = parseInt(localStorage.getItem("armor"));
  weapon_level = parseInt(localStorage.getItem("weapon"));
}

function onBackClick(){
  window.open("/levelSelect.html", "_self");
}

function buyWeapon(){
  first_arrived = false;
  buying = true;
  if(selection == 0){
    if (owned_money > price[weapon_level] && weapon_level < 3){
      localStorage.setItem("sgold", owned_money - price[weapon_level]);
      owned_money = parseInt(localStorage.getItem("sgold"))
      weapon_level+=1;
      localStorage.setItem("weapon", weapon_level);
    }
  } else{
    if (owned_money > price[armor_level] && armor_level < 3){
      localStorage.setItem("sgold", owned_money - price[armor_level]);
      owned_money = parseInt(localStorage.getItem("sgold"))
      armor_level+=1;
      localStorage.setItem("armor", armor_level);
    }
  }

}

function draw(){
  background(bg);
  image(weapon_array[weapon_level], 24/85*width, 1/15*height);
  console.log(armor_level);
  image(armor_array[armor_level], 44/85*width, 1/15*height);

  textAlign(CENTER);
  textSize(36);
  fill("black");
  noStroke();

  image(textbox_noarrow, 32.5/85*width, 0.52*height);
  text('You  own  ' + owned_money + '  sgold', width/2, 0.58*height);
  image(sgold, 41/85*width, 0.58*height);

  image(textbox, width/4, height*0.70)
  if (first_arrived){
    text('View  upgrade  using  arrow  keys', width * 0.5, height * .79);
    text('on  your  keyboard ', width * 0.5, height * .82);
  } else{
    if(selection == 0){
      selected_weapon();
    } else{
      selected_armor();
    }
  }
  image(pointer, (30/85*width+20/85*width*selection), 3*height/7);
  
}

function keyTyped() {
  console.log(key);
  if (key === '1') {
    selection = 0;
    buying = false;
    first_arrived = false;
  } else if (key === '2') {
    selection = 1;
    buying = false;
    first_arrived = false;
  } else if (key === '3') {
    selection = 2;
    buying = false;
    first_arrived = false;
  } else if (key === '4') {
    selection = 3;
    buying = false;
    first_arrived = false;
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    selection = abs(selection-1)%2;
    buying = false;
    first_arrived = false;
  } else if(keyCode === RIGHT_ARROW){
    selection = abs(selection+1)%2;
    buying = false;
    first_arrived = false;
  }
}

function selected_weapon(){
  if (buying == true){
    if (owned_money >= price[weapon_level] && weapon_level < 3){
      text('You  upgraded  to  a  ' + weapons[weapon_level], width * 0.5, height * .79);
    } else if (weapon_level == 3){ 
      text('Max upgrades reached', width * 0.5, height * .79);
    } else if (owned_money < price[weapon_level]){
      text('Not  enough  sgold', width * 0.5, height * .79);
    }
  } else {
    text('You  have  selected  the  ' + weapons[weapon_level], width * 0.5, height * .79);
    if (owned_money < price[weapon_level]){
      fill(color(174, 38, 9));
    } else{
      fill("black");
    }
    if(weapon_level < 3){
      text('This  costs  ' + price[weapon_level] + '  sgold', width * 0.5, height * .82);
    } else{
      text('This is your max upgrade', width * 0.5, height * .82);
    }
  }
}

function selected_armor(){
  if (buying == true){
    if (owned_money >= price[armor_level] && armor_level < 3){
      text('You  upgraded  to  a  ' + armor_names[armor_level], width * 0.5, height * .79);
    } else if (armor_level == 3){ 
      text('Max upgrades reached', width * 0.5, height * .79);
    } else if (owned_money < price[armor_level]){
      text('Not  enough  sgold', width * 0.5, height * .79);
    }
  } else {
    text('You  have  selected  the  ' + armor_names[armor_level], width * 0.5, height * .79);
    if (owned_money < price[armor_level]){
      fill(color(174, 38, 9));
    } else{
      fill("black");
    }
  }
  if(armor_level < 3){
    text('This  costs  ' + price[armor_level] + '  sgold', width * 0.5, height * .82);
  }else{
    text('This is your max upgrade', width * 0.5, height * .82);
  }
}