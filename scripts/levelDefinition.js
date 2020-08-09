let levels = {
  1: {
    'numPotions': 1,
    'recipes': 1,
    'beaten': false,
    'timePerPotion': 60
  },
  2: {
    'numPotions': 3,
    'recipes': 1,
    'beaten': false,
    'timePerPotion': 60
  },
  3: {
    'numPotions': 5,
    'recipes': 1,
    'beaten': false,
    'timePerPotion': 50
  },
  4: {
    'numPotions': 7,
    'recipes': 1,
    'beaten': false,
    'timePerPotion': 50
  },
  5: {
    'numPotions': 9,
    'recipes': 2,
    'beaten': false,
    'timePerPotion': 45
  },
  6: {
    'numPotions': 11,
    'recipes': 2,
    'beaten': false,
    'timePerPotion': 45
  },
  7: {
    'numPotions': 13,
    'recipes': 2,
    'beaten': false,
    'timePerPotion': 40
  },
  8: {
    'numPotions': 15,
    'recipes': 3,
    'beaten': false,
    'timePerPotion': 40
  },
  9: {
    'numPotions': 17,
    'recipes': 3,
    'beaten': false,
    'timePerPotion': 35
  },
  10: {
    'numPotions': 20,
    'recipes': 3,
    'beaten': false,
    'timePerPotion': 35
  }
}
localStorage.setItem("levels", JSON.stringify(levels));