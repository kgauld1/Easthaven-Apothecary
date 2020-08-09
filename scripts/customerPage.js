let backgroundImg;
let startButton, font;
let potion_score, selection;
let added_coins;

function preload(){
  font = loadFont("arcade.ttf");
  backgroundImg = loadImage("images/wood.png");
}

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  textFont(font);

  background(backgroundImg);
  textAlign(CENTER);
  stroke(0);
  colorMode(HSB,360,100,100)
  fill(50,100,100);

  added_coins = false;

}

function draw(){
  localStorage.setItem("customerOrder", round(random(0,2)));

  potion_score = parseInt(localStorage.getItem("score"));
  potion_score = 5;
  if(potion_score==null || isNaN(potion_score)){
    console.log("No score yet :)");
  } else if (added_coins == false){
    //a perfect score would be 0
    var profit = floor(map(potion_score, 0, 12, 20, 0));
    var sgold = parseInt(localStorage.getItem("sgold"));
    if(sgold==null || isNaN(sgold)){
      sgold = profit;
    } else{
      sgold += profit;
    }
    added_coins = true;
    console.log(sgold);
    localStorage.setItem("sgold", sgold);
    //console.log(profit);
    
  }
}

function toStart(){
  window.open("/gameIndex.html", "_self");
}