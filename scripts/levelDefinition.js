let levels = {
  1: {
    'numPotions': 1,
    'recipes': 1
  },
  2: {
    'numPotions': 2,
    'recipes': 1
  },
  3: {
    'numPotions': 3,
    'recipes': 1
  },
  4: {
    'numPotions': 4,
    'recipes': 1
  },
  5: {
    'numPotions': 5,
    'recipes': 2
  },
  6: {
    'numPotions': 6,
    'recipes': 2
  },
  7: {
    'numPotions': 7,
    'recipes': 2,
    'timePerPotion': 40
  },
  8: {
    'numPotions': 8,
    'recipes': 3
  },
  9: {
    'numPotions': 9,
    'recipes': 3
  },
  10: {
    'numPotions': 10,
    'recipes': 3
  }
};
let completed = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10:false
};
if(localStorage.getItem('completed') == undefined || JSON.parse(localStorage.getItem('completed')).length != completed.length)
  localStorage.setItem('completed', JSON.stringify(completed));
localStorage.setItem("levels", JSON.stringify(levels));


console.log(localStorage.getItem('completed'));
console.log(localStorage.getItem('levels'));