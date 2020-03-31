class PlayGame {
  
  constructor(){
    this.start();
  }
  //return true if any player has reached phaze 5, false otherwise
   checkPhaze5(playerArr){
     for(let i = 0; i < playerArr.length; i++){
       //assumes we have a get phase() function
         if(playerArr[i]._phase == 6)
           return true;
      }
     return false;
   }

   //return true if any player's hand is empty, used to tell when round is over
   isAnyHandEmpty(playerArr){
     for(let i = 0; i < playerArr.length; i++){
       //assumes we have function that returns size of a player's hand
       if(playerArr[i].handSize == 0)
        return true;
     }
   return false;
  }

  //first array is array of indexes to check
  //second array is hand of cards
  isASet(arr1, arr2){
   if(arr1[0] != -1){       
       let initialNum;
       let counter = 0;
      for(let i = 0; i < arr1; i++){
           if(arr2[arr1[i]]._number != 14 && counter == 0){
              initialNum = arr2[arr1[i]]._number;
              counter++;          
           }   
           if(counter > 0){
             if(initialNum != arr2[arr1[i]]._number && arr2[arr1[i]]._number != 14){
               return false;
             }
           }
      }
       return true;
    }
    else{
      let initialNum;
      let counter = 0;
      for(let i = 0; i < arr2; i++){
           if(arr2[i]._number != 14 && counter == 0){
              initialNum = arr2[i]._number;
              counter++;          
           }   
           if(counter > 0){
             if(initialNum != arr2[i]._number && arr2[arr1[i]]._number != 14){
               return false;
             }
           }
      }
       return true;
    }
  }

  isARun(arr1, arr2){
    if(arr1[0] != -1){
      let tempArr =[];
      //push each card number into an array to be sorted by
      for(let i = 0; i < arr1.length; i++)
        tempArr.push(arr2[arr1[i]]._number);
        //sort array in ascending order
        tempArr.sort(function(a, b){return a - b});
        //same method used in isASet, grab the number of the first card of hand
        let initialNum = arr2[arr1[0]]._number;
        for(let i = 1; i < tempArr.length; i++){
          let nextNum = arr2[arr1[i]]._number;
          //verify the next number is one greater then the last, a run
          if(nextNum != (initialNum + 1) && nextNum != 14)
          return false;
        }
      return true;
    }
    else{
      let tempArr =[];
      //push each card number into an array to be sorted by
      for(let i = 0; i < arr2.length; i++)
        tempArr.push(arr2[i]._number);
        //sort array in ascending order
        tempArr.sort(function(a, b){return a - b});
        //same method used in isASet, grab the number of the first card of hand
        let initialNum = arr2[0]._number;
        for(let i = 1; i < tempArr.length; i++){
          let nextNum = arr2[i]._number;
          //verify the next number is one greater then the last, a run
          if(nextNum != (initialNum + 1) && nextNum != 14)
          return false;
        }
      return true;
    }
  }

  start(){
    //list of players
    let playerArr = [];
    //Game deck of cards
    let gameDeck = new Deck();
    //input for number of players, will be replaced by HTML code to gather input
    let numPlayers = prompt("How many players: \n");
    //initializing discard pile with 0 cards to start
    let discardPile = [];
    discardPile.push(gameDeck.dealCard());
    //loop through each player, prompt them for a username
    //create a player object
    //add that player to the player array
    for(let i = 0; i < numPlayers; i++){
      let k = i+1;
      let name = prompt("Player # " + k + " Username ");
      let p = new Player(name);
      playerArr.push(p);
    }

    //each player is dealt a card traditional style until they each have 10
    for(let i = 0; i < 10; i++){
      for(let k = 0; k < playerArr.length; k++){ 
        playerArr[k].draw(gameDeck, discardPile, 1) 
      }
    }
    //game runs until someone reaches phaze 5
    while(this.checkPhaze5(playerArr) == false){
      //iterate through each players turn
      for(let i = 0; i < numPlayers; i++){
        if(this.isAnyHandEmpty(playerArr) == false){
          if(playerArr[i].isSkipped == false){
          playerArr[i].sortHand();
          playerArr[i].showHand();
          let topDis = discardPile[discardPile.length - 1]._number;
          alert(topDis);
          //gather input for draw card choice, input will be replaced by HTML code
          let firstChoice = prompt((playerArr[i]._name) + " enter 1 to draw from deck or Enter 2 to draw from discard pile \n");
          //call player draw function, send in choice and both piles
          //may need to add error checking for if discard pile is empty
          playerArr[i].draw(gameDeck, discardPile, firstChoice);
          //assume we have showHand function that sends and shows hand on webpage
          playerArr[i].sortHand();
          playerArr[i].showHand();
          //implementation of attempting a phaze
          let secondChoice = prompt("Press 1 if you would you like to lay down cards to your board, 0 to discard \n");
          //1 is yes, otherwise skip to discard
          if(secondChoice == 1){
            //if currently trying for phaze 1
            if(playerArr[i]._phase == 1){
              let set1 =[];
              let set2 =[];
              let printStr = "Enter your first set of 3";
              alert(printStr);
              //get the indexes of the cards the user wishes to attmpt a phaze with
              for(let counter = 0; counter < 3; counter++){
                let k = counter+1;  
                let temp = prompt("\nCard # " + k + " ");
                  //push the index of that card into an array
                  set1.push(temp);
              }
              //send the indexes of those cards to a function that returns whether its a true set or not
              if(this.isASet(set1, playerArr[i]._hand) == true){
                //if your first set was verifies, go on and repeat the same steps for second set
                let printStr = "Enter your second set of 3";
                alert(printStr);
                for(let counter = 0; counter < 3; counter++){
                  let k = counter+1; 
                  let temp = prompt("\nCard # " + k + " ");
                  set2.push(temp);
                }
                //test validity of second set
                if(this.isASet(set2, playerArr[i]._hand) == true){
                  //those sets will be sent to "board" array only if both sets are verified as true sets
                  //assuming we have function that takes an array of indexes, and the hand of the current player's cards and moves those cards to the "board" array
                  playerArr[i].moveCardsToBoard1(set1,playerArr[i]._hand);
                  playerArr[i].moveCardsToBoard2(set2, set1, playerArr[i]._hand);
                  playerArr[i].showBoards();
                  playerArr[i].addPhase();
                }
                else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
                }    
              }
              else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
              }
            }
            //repeat same set of steps for each other phaze
            else if(playerArr[i]._phase == 2){
              let set1 =[];
              let run2 =[];
              let printStr = "Enter your set of 4";
              alert(printStr);
                for(let counter = 0; counter < 4; counter++){
                  let k = counter+1; 
                  let temp = prompt("\nCard # " + k + " ");
                  set1.push(temp);
                }
                if(this.isASet(set1, playerArr[i]._hand) == true){
                  let printStr = "Enter your run of 4";
                  alert(printStr);
                    for(let counter = 0; counter < 4; counter++){
                      let k = counter+1; 
                      let temp = prompt("\nCard # " + k + " ");
                      run2.push(temp);
                    }
                  if(this.isARun(run2) == true){
                    playerArr[i].moveCardsToBoard1(set1,playerArr[i]._hand);
                    playerArr[i].moveCardsToBoard2(run2, set1, playerArr[i]._hand);
                    playerArr[i].addPhase();
                  }
                  else{
                    let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                    alert(printStr);
                  }
                }
                else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
                }
            }
            else if(playerArr[i]._phase == 3){
              let run1 =[];
              let printStr = "Enter your run of 8";
              alert(printStr);
                for(let counter = 0; counter < 8; counter++){
                  let k = counter+1; 
                  let temp = prompt("\nCard # " + k + " ");
                  run1.push(temp);
                }
                if(this.isARun(run1, playerArr[i]._hand) == true){
                  playerArr[i].moveCardsToBoard1(run1,playerArr[i]._hand);
                  playerArr[i].addPhase();
                }
                else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
                }
            }
            else if(playerArr[i]._phase == 4){
              let set1 =[];
              let set2 =[];
              let printStr = "Enter your first set of 4 ";
              alert(printStr);
                for(let counter = 0; counter < 4; counter++){
                   let k = counter+1; 
                  let temp = prompt("\nCard # " + k + " ");
                  set1.push(temp);
                }
                if(this.isASet(set1, playerArr[i]._hand) == true){
                  let printStr = "Enter your second set of 4";
                  alert(printStr);
                    for(let counter = 0; counter < 4; counter++){
                      let k = counter+1; 
                      let temp = prompt("\nCard # " + k + " ");
                      set2.push(temp);
                    }
                  if(this.isASet(set2, playerArr[i]._hand) == true){
                    playerArr[i].moveCardsToBoard1(set1,playerArr[i]._hand);
                    playerArr[i].moveCardsToBoard2(set2, set1, playerArr[i]._hand);
                    playerArr[i].addPhase();
                  }
                  else{
                    let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                    alert(printStr);
                  }
                }
                else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
                }
            }
            else if(playerArr[i]._phase == 5){
              let set1 =[];
              let set2 =[];
              let printStr = "Enter your set of 5";
              alert(printStr);
                for(let counter = 0; counter < 5; counter++){
                  let k = counter+1; 
                  let temp = prompt("\nCard #" + k + " ");
                  set1.push(temp);
                }
                if(this.isASet(set1, playerArr[i]._hand) == true){
                  let printStr = "Enter your set of 3";
                  alert(printStr);
                    for(let counter = 0; counter < 3; counter++){
                      let k = counter+1; 
                      let temp = prompt("\nCard # " + k + " ");
                      set2.push(temp);
                    }
                  if(this.isARun(set2, playerArr[i]._hand) == true){
                    playerArr[i].moveCardsToBoard1(set1,playerArr[i]._hand);
                    playerArr[i].moveCardstoBoard2(set2, set1, playerArr[i]._hand);
                    playerArr[i].addPhase();
                  }
                  else{
                    let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                    alert(printStr);
                  }
                }
                else{
                  let printStr = "Sorry! That doesn't qualify. Time to discard!\n";
                  alert(printStr);
                }
            }
          }
          //discard choice for player who hasn't completed a phaze
          if(playerArr[i].isBoardEmpty() == true){
            //get input on choice of card to discard, will be translated to HTML
            let discardChoice = prompt("Enter index of card you wish to discard \n");
            //assumes we have dropCard function that takes index of selected card to
            //discard from hand
            let temp = playerArr[i].valueOf(discardChoice);
            if(temp._number == 13){
              let choice = prompt("Enter the player number you want to skip");
              playerArr[choice - 1].makeSkipTrue();
            }
            discardPile.push(...(playerArr[i].dropCard(discardChoice)));
          }
          //discard choice for a player who has completed a phase
          else{
            let discardChoice = prompt("Enter 1 to just discard to the discard pile or 2 to hit another player's board \n");
            //if player chooses to discard reguarly
            if(discardChoice == 1){
              let index = prompt("Enter index of card you wish to discard \n");
              let temp = playerArr[i].valueOf(index);
              if(temp._number == 13){
                let choice = prompt("Enter the player number you want to skip");
                playerArr[choice - 1].makeSkipTrue();
              }
              discardPile.push(...(playerArr[i].dropCard(index)));
            }
            //if player chooses to add to another player's board hand
            else{
              playerArr[i].sortHand();
              playerArr[i].showHand();
              for(let k = 0; k < playerArr.length; k++){
                let m = k+1;
                let printStr = "Player #" + m + " board of cards \n";
                alert(printStr);
                playerArr[k].showBoards();
              }
              let playerNum = prompt("Which player do you want hit?\n");
              let playerBoard = prompt("Which board do you want to hit?\n");
              let numCards = prompt("How many cards do you want to put down?\n");
              let hitSet1 = [];
              let hitSet2 = [];
              for(let m = 0; m < playerArr[playerNum - 1].board1.length; m++)
                hitSet1.push(playerArr[playerNum - 1].board1[m]);
              for(let m = 0; m < playerArr[playerNum - 1].board2.length; m++)
                hitSet2.push(playerArr[playerNum - 1].board2[m]);
              let index1 = [];
              let index2 = [];
              let foo = [-1];
                if(playerBoard == 1){
                  let printStr = "Enter the indexes of the card you want to put down\n";
                  alert(printStr);
                  for(let counter = 0; counter < numCards; counter++){
                    let k = counter + 1;
                    let temp = prompt("\nCard #" + k + " ");
                    let temp2 = playerArr[i].valueOf(temp);
                    hitSet1.push(temp2);
                    index1.push(temp);
                  }
                  if(this.isARun(foo,hitSet1) == true || this.isASet(foo,hitSet1) == true){
                    playerArr[playerNum - 1].moveCardsToBoard1(index1,playerArr[i]._hand);
                    playerArr[i].showHand();
                    let alert1 = "Made it in verify if block";
                    alert(alert1);
                    let index = prompt("Enter index of card you wish to discard \n");
                    let temp = playerArr[i].valueOf(index);
                    if(temp._number == 13){
                      let choice = prompt("Enter the player number you want to skip");
                      playerArr[choice - 1].makeSkipTrue();
                    }
                    discardPile.push(...(playerArr[i].dropCard(index)));
                  }
                  else{
                    let printStr = "Sorry! That doesn't qualify. Next Player's turn! We in here1\n ";
                    alert(printStr);
                    playerArr[playerNum - 1].showBoards();
                    let index = prompt("Enter index of card you wish to discard \n");
                    let temp = playerArr[i].valueOf(index);
                    if(temp._number == 13){
                      let choice = prompt("Enter the player number you want to skip");
                      playerArr[choice - 1].makeSkipTrue();
                    }
                    discardPile.push(...(playerArr[i].dropCard(index)));
                  }
                }
                else{
                  let printStr = "Enter the indexes of the card you want to put down\n";
                  alert(printStr);
                  for(let counter = 0; counter < numCards; counter++){
                    let k = counter+1;
                    let temp = prompt("\nCard #" + k + " ");
                    let temp2 = playerArr[i].valueOf(temp);
                    let tempNum = temp2._number;
                    alert(tempNum);
                    hitSet2.push(temp2);
                    index2.push(temp);
                  }
                  if(this.isARun(foo,hitSet2) == true || this.isASet(foo,hitSet2) == true){
                    playerArr[playerNum - 1].moveCardsToBoard2(index2,foo,playerArr[i]._hand);
                    playerArr[i].showHand();
                    let index = prompt("Enter index of card you wish to discard \n");
                    let temp = playerArr[i].valueOf(index);
                    if(temp._number == 13){
                      let choice = prompt("Enter the player number you want to skip");
                      playerArr[choice - 1].makeSkipTrue();
                    }
                    discardPile.push(...(playerArr[i].dropCard(index)));
                  }
                  else{
                    let printStr = "Sorry! That doesn't qualify. Next Player's turn! We in here2\n";
                    alert(printStr);
                    let index = prompt("Enter index of card you wish to discard \n");
                    let temp = playerArr[i].valueOf(index);
                    if(temp._number == 13){
                      let choice = prompt("Enter the player number you want to skip");
                      playerArr[choice - 1].makeSkipTrue();
                    }
                    discardPile.push(...(playerArr[i].dropCard(index)));  
                  }
                }
              playerArr[playerNum - 1].showBoards();
              }
            }
          }
          }
        else{
          //Someone has an empty hand, round is over
          //calculate points for people who still have hands
          for(let k = 0; k < playerArr.length; k++){
            if(playerArr[k]._handSize != 0)
              playerArr[k].addPoints();
          }
          //print score to screen
          //assumes we have "point" getter function
          let printStr = "Scoreboard: \n";
          for(let k = 0; k < playerArr.length; k++){
            let m = k+1;
            printStr = printStr + "Player " + m + ": " + playerArr[k]._points + "\n";
          }
          alert(printStr);
          //go through player clear hand and board
          for(let k = 0; k < playerArr.length; k++){
            playerArr[k].clearHand();
            playerArr[k].clearBoard();
          }
          gameDeck = new Deck();
          discardPile = [];
          discardPile.push(gameDeck.dealCard());
          for(let p = 0; p < 10; p++){
            for(let k = 0; k < playerArr.length; k++){
              playerArr[k].draw(gameDeck, discardPile, 1)
              }
          }
          break;
        }
      }
    }
    let phaze5Cnt = 0;
    let playerHolder = [];
    for(let k = 0; k < playerArr.length; k++){
      if(playerArr[k]._phaze == 6){
        phaze5Cnt++;
        playerHolder.push(k);
      }
    }
    if(phaze5Cnt == 1){
      let printStr = "Congratulations!! Player " + playerArr[playerHolder[0]]._name + " is the first one to finish Phaze 5, and is our official winner!!";
      alert(printStr);
      let printStr2 = "Final Scoreboard: \n";
      for(let k = 0; k < playerArr.length; k++){
        let m = k+1;
        printStr2 = printStr + "Player " + m + ": " + playerArr[k]._points() + "\n";
      }
      alert(printStr2);
    }
    else{
      let printStr = "Final Scoreboard: \n";
      for(let k = 0; k < playerArr.length; k++){
        let m = k+1;
        printStr = printStr + "Player " + m + ": " + playerArr[k]._points() + "\n";
      }
      alert(printStr);
      let printStr2 = "Looks like we have a tie!! The winner will be decided by the one with the least points!\n";
      alert(printStr2);
      let scoreHolder = [];
      for(let k = 0; k < playerHolder.length; k++){
        scoreHolder.push(playerArr[playerHolder[k]]._points);
      }
      scoreHolder.sort(function(a, b){return a - b});
      let printStr3 = "Congratulations!! Player " + playerArr[playerHolder[0]]._name + " is the first one to finish phaze 5 with the least amount of points, and is our official winner!!"
      alert(printStr3);
    }
  }
}

let x = new PlayGame();

