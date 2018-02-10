# King or Koos

An application for playing the card game King or Koos with your friends.

## How to Play

The game consists of a series of rounds. Each round has a series of turns. The number of rounds and turns vary depending on the number of players, the number of decks used, and the way players are taking their turns.

### Rank

Card values are ranked from lowest to highest as shown:

**4, 5, 6, 7, 8, 9, 10, J, Q, K, A, 2, 3**

### Objective

The winner is the first player to get rid of all their cards. This player is the **King**.

The loser is the last player to get rid of all their cards. This player is the **Koos**.

### Setup

Any number of decks can be used and any number of players can play. Only a card's numeric value is relevant.

The deck(s) will be shuffled and dealt evenly to all players.

The starting player is the first player who indicates they have the 4 of ♠️ (Spades). Remember, if multiple decks are used, there will be multiple 4 of ♠️ (Spades) cards. The first player to indicate they have the card is the one who goes first.

### Rounds

A round is represented by a pile of cards that a player can add to during their turn. At the start of a round, the pile is empty.

A round is started by a player taking their turn and ends when either:

* The card with the highest value is on the top of the pile (3)
* The next player was the last player whose turn resulted in adding cards to the pile. This means all other players were not able to add cards to the pile.

### Turn

A turn is represented by a set of cards, each of which **must have the same value**. The card's suit does not matter. A player can skip their turn if they do not have any cards that can be added to the round's pile. 

The first turn in a round determines the number of cards that must be played per turn. All turns in that round must then play the same number of cards.

Subsequent turns must then play the same number of cards as the first turn dictated, but must play a higher value than the previous player's turn.

For example, a player might take their first turn and play the 4 of ♠️ and the 4 of ♦️.
The next player must then play a card with a value of 5 or higher.

***

## Feature Roadmap

This game is in the early stages of development. This first version (0.0.1) is only playable via a command line interface. 

To install this dependencies for this version of the game, clone this repository and run the following command:

```
$ yarn
```

After installing the dependencies, run this command to play:

```
$ yarn play
```

There are a lot of features that are coming in the near future to support an entertaining and social user experience. Here are the major front-end clients you can expect in the future:

* A web version with a responsive UI that can be played on any device with a web browser.

* A native mobile version that can be played on any of the latest major iOS or Android versions.


The base logic for the game is all up and running. It has had some *very* basic unit tests used during initial development, but expect a much more rigorous dedication to unit testing and integration testing in the future. There is also a strict dedication to keeping adequate documentation throughout the code base, because I'd be lost without it.

**If you find any bugs, please feel free to submit an issue!**
