const player1 = document.querySelector('.playerOne')
const player2 = document.querySelector('.playerTwo')

const player1Score = document.querySelector('#player1Score')
const player2Score = document.querySelector('#player2Score')
const player1DiceScore = document.querySelector('#player1DiceScore')
const player2DiceScore = document.querySelector('#player2DiceScore')

const rollDice = document.querySelector('#rollDice')
const newGame = document.querySelector('#newGame')
const holdScore = document.querySelector('#holdScore')
const diceImg = document.querySelector('.buttons > img')

let currentPlayer = 1; // 1 for player 1, 2 for player 2

let activePlayer1 = () => {
    player1.classList.add('activePlayer');
    player2.classList.remove('activePlayer');
};
let activePlayer2 = () => {
    player2.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
}

rollDice.addEventListener('click', (e) => {
    e.preventDefault();
    diceImg.classList.remove('diceImg');

    let diceNumber = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `./assets/${diceNumber}.png`;

    if (currentPlayer === 1) {
        activePlayer1()
        player1DiceScore.innerHTML = +diceNumber
    } else {
        activePlayer2()
        player2DiceScore.innerHTML = +diceNumber
    }

    // Switch player only if dice number is 1
    if (diceNumber === 1) {
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }
});
