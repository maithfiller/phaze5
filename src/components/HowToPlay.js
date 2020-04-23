import React, { Component } from 'react';
import './howto.css'


 class HowToPlay extends Component {
   render (){
  return(
    <div className="background">
    <h1 className="heading"> How To Play Phaze 5 </h1>
    <ol>1. Decide on how many of your best friends you want to play with and choose a username for each player!</ol>
    <ol>2. If it is your turn...</ol>
    <ol>     - you can decide to either pick up a card from the deck or pick up the last card that was placed in the discard pile </ol>
    <ol>     - after you pick up a card then make your move </ol>
    <ol> * you may automatically discard any one of your cards OR </ol>
    <ol> * you can place down cards that are in your hand if they satisfy the phase </ol>
    <ol> If you choose to lay down cards, then pick which cards you want to lay down and see if the computer agrees that it is a valid move </ol>
    <ol> You may then choose if you want to add any of your cards to the cards that have been laid down by your fellow players </ol>
    <ol> Once you feel that you have finished laying down cards, choose a card to discard. </ol>
    <ol> THE GOAL OF EACH ROUND IS TO MOVE TO THE NEXT PHASE AND LAY DOWN ALL OF YOUR CARDS </ol>
    <ol> THE GOAL OF THE GAME IS TO BE THE FIRST PERSON TO GO THROUGH ALL 5 PHASES FIRST! </ol>
    <ol> If more than one person finishes phase 2 in the same round, then the person with the least amount of points WINS! YAY! </ol>
    <ol> How do the points work? </ol>
    <ol> After every phase, the person who ran out of cards first gets 0 points, but everyone else must count how many points they have in their hand </ol>
    <ol> To do this... </ol>
    <ol> Cards 1-9 are worth 5 points </ol>
    <ol> Cards 10-12 are worth 10 points </ol>
    <ol> Skip (S) and Wild cards (W) are worth 25 points! </ol>
    </div>
);
}
}

export {HowToPlay};
