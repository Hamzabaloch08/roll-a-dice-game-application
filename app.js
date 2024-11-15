const player1 = document.querySelector('.playerOne')
const player2 = document.querySelector('.playerTwo')

const player1Score = document.querySelector('#Player1Score')
const player2Score = document.querySelector('#player2Score')
const player1DiceScore = document.querySelector('#player1DiceScore')
const player2DiceScore = document.querySelector('#player2DiceScore')

const rollDice = document.querySelector('#rollDice')
const newGame = document.querySelector('#newGame')
const holdScore = document.querySelector('#holdScore')
const diceImg = document.querySelector('.buttons > img')

let currentPlayer = 1; // 1 for player 1, 2 for player 2

let player1TotalScore = 0
let player2TotalScore = 0

let activePlayer1 = () => {
    player1.classList.add('activePlayer');
    player2.classList.remove('activePlayer');
};

let activePlayer2 = () => {
    player2.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
};

//player one score reset function
let resetPlayer1 = () => {
    player1TotalScore = 0
    player1DiceScore.innerHTML = 0
}
//player two score reset function
let resetPlayer2 = () => {
    player2TotalScore = 0
    player2DiceScore.innerHTML = 0
}

// newGame click eventFunction
newGame.addEventListener('click', (e) => {
    e.preventDefault();
    activePlayer1();
    resetPlayer1();
    resetPlayer2();
    diceImg.classList.add('diceImg');
});

// roll a dice click eventFunction
rollDice.addEventListener('click', (e) => {
    e.preventDefault();
    diceImg.classList.remove('diceImg');

    // random number generator
    let diceNumber = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `./assets/${diceNumber}.png`;

    if (currentPlayer === 2) {
        activePlayer2();
        player2TotalScore += diceNumber
        player2DiceScore.innerHTML = player2TotalScore
    } else {
        activePlayer1();
        player1TotalScore += diceNumber
        player1DiceScore.innerHTML = player1TotalScore
    }

    // Switch player only if dice number is 1
    if (diceNumber === 1) {
        if (currentPlayer === 1) {
            activePlayer2();
            currentPlayer = 2;
            resetPlayer1();
        } else {
            activePlayer1();
            currentPlayer = 1;
            resetPlayer2();
        }
    }
});

// holding score click eventfunction
holdScore.addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPlayer === 1) {
        player1Score.textContent + player1TotalScore
        resetPlayer1()
        activePlayer2();
    } else {
        player2Score.textContent + player2TotalScore
        resetPlayer2();
        activePlayer1();
    }
});
