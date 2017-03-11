"use strict";

function init() {
    let fireButton = document.getElementById("fireButton");
    let guessInput = document.getElementById("guessInput");
    fireButton.onclick = handleFireButton;
    guessInput.onkeypress = handleKeyPress;
}

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
    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },
    generateShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {

        } else {

        }
        
        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {

            } else {

            }
        }

        return newShipLocations;
    },
    collision: function () {

    },
    fire: function (guess) {
        
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (index >=0 && ship.hits[index]!="hit") {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            } else if (index >=0 && ship.hits[index]=="hit") {
                view.displayMessage("You have already hit that area.");
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

function handleFireButton() {
    let guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);

    guessInput.value = "";
}

function handleKeyPress(e) {
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;
