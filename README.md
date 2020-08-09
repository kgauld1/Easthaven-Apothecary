##Inspiration
Easthaven Apothecary takes inspiration from the classic games of Papa’s Pizzeria and Pokémon. Rush to complete orders before your customers get upset and raise money to buy gear to help you in your [spoiler alert!] final battle.

##What it does
In this game, you play the character of an apprentice working at an apothecary. Each day, you interact with different customers that each have a specific order in mind. Make their potions quickly, using the recipe book as your guide, or risk getting them upset.

The quicker and more accurately you make your potions, the more satisfied your customers will be, and the more they’ll pay you. As you warm up to the apothecary, keep an eye on your money bag (hopefully filled to the brim with sgold coins!) and make sure to visit the shop. You’ll be able to upgrade your armor and weapons as you go along.

While you may be just an employee, a dangerous foe awaits you at the end of your apprenticeship. Don’t forget to gear up!

##How we built it
Easthaven Apothecary was made using HTML, CSS, and JavaScript and using repl.it in order to collaborate. We used p5.js to create the functionality of the game, and pixilart.com to draw all of the backgrounds and images used in the game.

##Challenges we ran into
One of the challenges we ran to was with storing variables. Since our game uses multiple HTML and JS files, we used local storage to pass values between files. This lead to behavior that was sometimes unpredictable (i.e. refreshing the pages would maintain values that were set in storage, but reset all other variables). We were forced to step through the code multiple times to find where our code had gone awry and to reset local variables as needed.

Another challenge we ran into was expanding each level to be bigger than the last. We did this by increasing the number of customers per level until the last level had 10 customers coming to the apothecary in a day. However, we realized that this was much easier said than done because by resetting the page after each customer, we were also resetting every variable as well. Ironically, this was solved using local storage and a JSON to store level data.

##Accomplishments that we're proud of
We are very proud of the design of our game. From start to finish, every background, sprite, and animation was created by a member of our team using an online pixel art drawing board. This allowed us to create our own, personal world inside Easthaven Apothecary with its own universe and storyline.

##What we learned
We learned a lot about how browsers store values locally and how long these values stay declared. In order to test our game properly, we constantly had to close windows and even the entire browser in order to reset all of our variables and to ensure that we were getting a proper test run. Local storage was immensely helpful in making our game possible but caused many more problems as variables began to overwrite each other and initialize in unexpected places. It was interesting to learn how local storage treats different variables and how we could control that.

##What's next for Easthaven Apothecary
Easthaven Apothecary has so much room to expand! In the future, we plan to implement new potions that unlock after certain levels and expand the shop to allow the player to buy potion ingredients (currently, they have an unlimited supply in their store). This would include designing and drawing more potions, coming up with new recipes, and expanding our levels’ JSON data and the store’s interface. In the future, we hope that Easthaven Apothecary can become an adventure of deep storylines, decisions, and unique characters!

##Try it out!
[Easthaven Apothecary](http://www.brewpotions.online)
