"use strict";

let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: ["06", "16", "26"], hits: ["", "", ""]},
        {locations: ["24", "34", "44"], hits: ["", "", ""]},
        {locations: ["10", "11", "12"], hits: ["", "", ""]}
    ],
    fire: function (guess) {
        
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >=0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function(ship) {
        for (let i=0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
};

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"],
        firstChar = "",
        row,
        column;

    if (guess === null || guess.length !== 2) {
        view.displayMessage("Enter a letter and a number on the board.");
        console.log("null");
    } else {
        firstChar = guess.charAt(0);
        row = alphabet.indexOf(firstChar);
        column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            view.displayMessage("Ooops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize ||
                    column < 0 || column >= model.boardSize) {
            view.displayMessage("Ooops, that's off the board.");
        } else {
            console.log("ok");

            return row + column;
        }
    }
    return null;
}

let controller = {
    guesses: 0,
    
    processGuess: function (guess) {
        let location = parseGuess(guess);
        if (location) {
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
};

model.fire("53");
model.fire("24");
model.fire("34");
model.fire("44");


