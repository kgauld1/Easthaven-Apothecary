let backgroundImg;
let startButton, font;
let potion_score, selection;
let added_coins, potion_names, order;
let num_customers, customer_counter, customer_skin, cust_img;
let c_array;

function preload(){
  font = loadFont("arcade.ttf");
  backgroundImg = createImg("images/definitely_animated.gif");
  c_array = ["images/redhood.png", "images/bluehood.png", "images/gray.png", "images/mosshood.png", "images/purplehood.png", "images/trafficcone.png"]
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', 2)
  textFont(font);

  levelInfo = JSON.parse(localStorage.getItem('levels'));
  progressInfo = JSON.parse(localStorage.getItem('completed'));
  
  backgroundImg.style('width', windowWidth + 'px');
  backgroundImg.style('height', windowHeight + 'px');
  backgroundImg.position(0,0);
  backgroundImg.style('z-index', -1);
  
  textAlign(CENTER);
  stroke(0);
  
  colorMode(HSB,360,100,100)
  fill(50,100,100);
  
  potion_names = ["Fairy Tonic", "Healing Potion", "Lunar Phoenix"]
  added_coins = false;
  order = round(random(0,2));

  num_customers = localStorage.getItem('currentLevel');
  //console.log(num_customers);
  customer_counter = parseInt(localStorage.getItem("counter"));
  if(customer_counter==null || isNaN(customer_counter)){
    customer_counter = 0;
  }

  customer_skin = parseInt(localStorage.getItem("customer_skin"));
  if(customer_skin==null || isNaN(customer_skin)){
    customer_skin = floor(random(0,6));
  }

  cust_img = loadImage(c_array[customer_skin]);
}

function draw(){
  //background(0);
  fill(0);
  noStroke();
  textSize(45);
  textAlign(CENTER);
  potion_score = parseInt(localStorage.getItem("score"));
  console.log(potion_score);

  cust_img.resize(width, height);
  image(cust_img, -width/8, 0);

  //potion_score = -1;
  if((potion_score==null || isNaN(potion_score) || potion_score < 0) && added_coins == false){
    localStorage.setItem("customerOrder", order);
    text("A customer has arrived!", width/2, 39/50*height);
    text("They want a " + potion_names[order], width/2, 41/50*height);

    textSize(36);
    text("Press any button to start brewing", width/2, 45/50*height);
  } else if (added_coins == false){
    var time_took = parseInt(localStorage.getItem("time"));
    var profit = floor(map(potion_score+time_took, 0, 13, 14, 0));
    var sgold = parseInt(localStorage.getItem("sgold"));
    if(sgold==null || isNaN(sgold)){
      sgold = profit;
    } else{
      sgold += profit;
    }

    if(profit >= 8){
      text("The customer looks pleased", width/2, 39/50*height);
    } else if (profit >= 6){
      text("The customer looks satisfied", width/2, 39/50*height);
    } else if (profit >= 3){
      text("The customer looks disappointed", width/2, 39/50*height);
    } else{
      text("The customer looks angry", width/2, 39/50*height);
    }

    text("You  earned  " + profit + "  sgold", width/2, 41/50*height);
    textSize(36);
    text("Press any button to continue", width/2, 45/50*height);

    added_coins = true;
    localStorage.setItem("sgold", sgold);    

    customer_counter += 1;
    localStorage.setItem("counter", customer_counter);
    localStorage.setItem("score", -1)
  }
  if(parseInt(localStorage.getItem("counter")) == num_customers){
    progressInfo[num_customers] = true;
    localStorage.setItem('completed', JSON.stringify(progressInfo));
  }
}

function keyPressed(){
  if(progressInfo[num_customers]){
    localStorage.setItem("counter", 0);
    window.open("/levelSelect.html", "_self")
  } else if (added_coins){
    localStorage.setItem("score", -1);
    window.open("/customerPage.html", "_self") //hehe
  }
  else{
    window.open("/gameIndex.html", "_self");
  }
}

class Customer{
  constructor(){
    this.c = c_array[floor(0,6)];
    this.x = -100;
    this.y = height*0.1;
  }
  show(){
    image(this.c, this.x, this.y);
  }
}