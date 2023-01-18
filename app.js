
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
let circleTurn = false;


const message = document.getElementById("message");
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const messageContent = document.getElementById("message-content");

const restartButton = document.getElementById("restart-button");
const resetButton = document.getElementById("reset-button");

const currentTurn = document.getElementById("currentTurn");
const xScoreDisplay = document.getElementById("X-score-display");
const OScoreDisplay = document.getElementById("O-score-display");


let xScore = 0;
let OScore = 0;

startGame();


const WINNINGCOMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

restartButton.addEventListener("click", startGame);
resetButton.addEventListener("click", () => {
    OScore = 0;
    OScoreDisplay.innerText = `${OScore}`;
    xScore = 0;
    xScoreDisplay.innerText = `${xScore}`;

    startGame();
});

function startGame() {
    cellElements.forEach((cell) => {
        cell.addEventListener("click", handleClick, { once: true })
    })
    
    message.classList.remove("show");
    messageContent.innerText = "";
    // clear all locations
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
    })
    // set turn to x
    circleTurn = false;
    // set the hover state to the respective turn
    setBoardHoverClass();
}

let currentClass;
function handleClick(e) {
    /*
    I should basically do these four things.
        1. place the mark in that cell targeted
        2. check for winner
        3. check for draw
        4. switch turn
    */
    // place the mark in the clicked cell
    const cell = e.target;
    if (circleTurn) {
        currentClass = CIRCLE_CLASS;
    } else {
        currentClass = X_CLASS;
    }
    placeMark(cell, currentClass);

    // check if there's a winner

    if (checkWin(currentClass)) {
        message.classList.add("show");
        messageContent.innerText = `${currentClass} wins !!`;

        if (circleTurn) {
            OScore++;
            OScoreDisplay.innerText = `${OScore}`;
        } else {
            xScore++;
            xScoreDisplay.innerText = `${xScore}`;
        }
    }

    // check if it's a draw, i.e all cells are filled
    else if (checkDraw()) {
        message.classList.add("show");
        messageContent.innerText = `It's a draw`;
    }

    // swap turns
    swapTurns();
    setBoardHoverClass();

}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    if (circleTurn) {
        currentTurn.innerText = `O`;
    } else {
        currentTurn.innerText = `X`
    }
}


function setBoardHoverClass() {
    if (circleTurn) {
        board.classList.remove(X_CLASS);
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.remove(CIRCLE_CLASS);
        board.classList.add(X_CLASS);
    }
}


function checkWin(currentClass) {
    return WINNINGCOMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })

}

function checkDraw() {
    // cellElements.forEach((cell) => {
    //     let classLst = cell.className.split(" ");
    //     classLst = Array.from(classLst);
    //     if (!(CIRCLE_CLASS.indexOf(classLst) > -1 || X_CLASS.indexOf(classLst) > -1)) {
    //         return false;
    //     }
    // })
    // return true;

    for (let i = 0; i < cellElements.length; i++) {
        let cellClassLst = cellElements[i].className.split(" ");
        console.log(cellClassLst);
        if ((cellClassLst.indexOf(X_CLASS) == -1) && (cellClassLst.indexOf(CIRCLE_CLASS) == -1)) {
            return false;
        }
    }
    return true;

}