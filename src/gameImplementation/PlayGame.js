import Deck from './Deck';
import Player from './Player';

class PlayGame {
  //return true if any player has reached phaze 5, false otherwise
  checkPhaze5(playerArr) {
    for (let i = 0; i < playerArr.length; i++) {
      //assumes we have a get phase() function
      if (playerArr[i].phase() == 6)
        return true;
    }
    return false;
  }
  //return true if any player's hand is empty, used to tell when round is over
  isAnyHandEmpty() {
    for (let i = 0; i < playerArr.length; i++) {
      //assumes we have function that returns size of a player's hand
      if (playerArr[i].handSize() == 0)
        return true;
    }
    return false;
  }

  //first array is array of indexes to check
  //second array is hand of cards
  isASet(arr1, arr2) {
    //grab number of the first card
    let initialNum = arr2[arr1[0]].number();
    for (let i = 1; i < arr1.length; i++) {
      //grab number of second card
      //iterate length of array - 1 times
      let nextNum = arr2[arr1[i]].number();
      //verify each card has the same number as the last
      //return false if any difference
      if (initialNum != nextNum) {
        return false;
      }
    }
    return true;
  }

  isARun(arr1, arr2) {
    let tempArr = [];
    //push each card number into an array to be sorted by
    for (let i = 0; i < arr1.length; i++)
      tempArr.push(arr2[arr1[i]].number());
    //sort array in ascending order
    tempArr.sort(function (a, b) { return a - b });
    //same method used in isASet, grab the number of the first card of hand
    let initialNum = arr2[arr1[0]].number();
    for (let i = 1; i < tempArr.length; i++) {
      let nextNum = arr2[arr1[i]].number();
      //verify the next number is one greater then the last, a run
      if (nextNum != (initialNum + 1))
        return false;
    }
    return true;
  }

  main() {
    //list of players
    let playerArr = [];
    //Game deck of cards
    let gameDeck = new Deck();
    //input for number of players, will be replaced by HTML code to gather input
    let numPlayers = prompt("How many players: ");
    //initializing discard pile with 0 cards to start
    let discardPile = [];

    //loop through each player, prompt them for a username
    //create a player object
    //add that player to the player array
    for (let i = 0; i < numPlayers; i++) {
      let name = prompt("Player #" + i + 1 + "Username");
      let p = new Player(name);
      playerArr.push(p);
    }

    //each player is dealt a card traditional style until they each have 10
    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < playerArr.length; k++) {
        playArr[k].draw(gameDeck, discardPile, 1)
      }
    }

    //game runs until someone reaches phaze 5
    while (checkPhaze5() == false) {
      //iterate through each players turn
      for (let i = 0; i < numPlayers.length; i++) {
        if (isAnyHandEmpty() == false) {
          //gather input for draw card choice, input will be replaced by HTML code
          let firstChoice = prompt("Enter 1 to draw from deck or Enter 2 to draw from discard pile ");
          //call player draw function, send in choice and both piles
          //may need to add error checking for if discard pile is empty
          playerArr[i].draw(gameDeck, discardPile, firstChoice);
          //assume we have showHand function that sends and shows hand on webpage
          playerArr[i].showHand();
          //implementation of attempting a phaze
          let secondChoice = prompt("Would you like to lay down cards to your hand? ");
          //1 is yes, otherwise skip to discard
          if (secondChoice == 1) {
            //sort players hand before they decide to try a phaze
            playerArr[i].sortHand();
            //if currently trying for phaze 1
            if (playerArr[i].phase() == 1) {
              let set1 = [];
              let set2 = [];
              console.log("Enter your first set of 3");
              //get the indexes of the cards the user wishes to attmpt a phaze with
              for (let counter = 0; counter < 3; counter++) {
                let temp = prompt("Card #" + i + 1 + "\n");
                //push the index of that card into an array
                set1.push(temp);
              }
              //send the indexes of those cards to a function that returns whether its a true set or not
              if (isASet(set1, playerArr[i].hand()) == true) {
                //if your first set was verifies, go on and repeat the same steps for second set
                console.log("Enter your second set of 3");
                for (let counter = 0; counter < 3; counter++) {
                  let temp = prompt("Card #" + i + 1 + "\n");
                  set2.push(temp);
                }
                //test validity of second set
                if (isASet(set2, playerArr[i].hand()) == true) {
                  //those sets will be sent to "board" array only if both sets are verified as true sets
                  //assuming we have function that takes an array of indexes, and the hand of the current player's cards and moves those cards to the "board" array
                  playerArr[i].moveCardsToBoard(set1, playerArr[i].hand());
                  playerArr[i].movecardstoBoard(set2, playerArr[i].hand());
                }
              }
            }
            //repeat same set of steps for each other phaze
            else if (playerArr[i].phase() == 2) {
              let set1 = [];
              let run2 = [];
              console.log("Enter your set of 4");
              for (let counter = 0; counter < 4; counter++) {
                let temp = prompt("Card #" + i + 1 + "\n");
                set1.push(temp);
              }
              if (isASet(set1, playerArr[i].hand()) == true) {
                console.log("Enter your run of 4");
                for (let counter = 0; counter < 4; counter++) {
                  let temp = prompt("Card #" + i + 1 + "\n");
                  run2.push(temp);
                }
                if (isARun(run2) == true) {
                  playerArr[i].moveCardsToBoard(set1, playerArr[i].hand());
                  playerArr[i].moveCardsToBoard(run2, playerArr[i].hand());
                }
              }
            }
            else if (playerArr[i].phase() == 3) {
              let run1 = [];
              console.log("Enter your run of 8");
              for (let counter = 0; counter < 8; counter++) {
                let temp = prompt("Card #" + i + 1 + "\n");
                run1.push(temp);
              }
              if (isARun(run1, playerArr[i].hand()) == true) {
                playerArr[i].moveCardsToBoard(run1, playerArr[i].hand());
              }
            }
            else if (playerArr[i].phase() == 4) {
              let set1 = [];
              let set2 = [];
              console.log("Enter your first set of 4 ");
              for (let counter = 0; counter < 4; counter++) {
                let temp = prompt("Card #" + i + 1 + "\n");
                set1.push(temp);
              }
              if (isASet(set1, playerArr[i].hand()) == true) {
                console.log("Enter your second set of 4");
                for (let counter = 0; counter < 4; counter++) {
                  let temp = prompt("Card #" + i + 1 + "\n");
                  set2.push(temp);
                }
                if (isASet(set2, playerArr[i].hand()) == true) {
                  playerArr[i].moveCardsToBoard(set1, playerArr[i].hand());
                  playerArr[i].moveCardsToBoard(run2, playerArr[i].hand());
                }
              }
            }
            else if (playerArr[i].phase() == 5) {
              let set1 = [];
              let set2 = [];
              console.log("Enter your set of 5");
              for (let counter = 0; counter < 5; counter++) {
                let temp = prompt("Card #" + i + 1 + "\n");
                set1.push(temp);
              }
              if (isASet(set1, playerArr[i].hand()) == true) {
                console.log("Enter your set of 3");
                for (let counter = 0; counter < 3; counter++) {
                  let temp = prompt("Card #" + i + 1 + "\n");
                  set2.push(temp);
                }
                if (isARun(set2, playerArr[i].hand()) == true) {
                  playerArr[i].moveCardsToBoard(set1, playerArr[i].hand());
                  playerArr[i].movecardstoBoard(run2, playerArr[i].hand());
                }
              }
            }
          }
          //get input on choice of card to discard, will be translated to HTML
          let discardChoice = prompt("Enter index of card you wish to discard ");
          //assumes we have dropCard function that takes index of selected card to
          //discard from hand
          discardPile.push(playerArr[i].dropCard(discardChoice));
        }
        else
          break;
      }
    }
  }

  newRound(decc) {
    // count players' points
    // put all players' cards back in the deck
    // shuffle the deck
    // deal new cards to players
  }
}
