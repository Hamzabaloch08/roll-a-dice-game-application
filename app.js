// Player DOM elements
const player1 = document.querySelector('.playerOne');
const player2 = document.querySelector('.playerTwo');

// Player scores (displayed on the UI)
const player1Score = document.querySelector('#Player1Score');
const player2Score = document.querySelector('#player2Score');
const player1DiceScore = document.querySelector('#player1DiceScore');
const player2DiceScore = document.querySelector('#player2DiceScore');

// Control buttons and dice image
const rollDice = document.querySelector('#rollDice');
const newGame = document.querySelector('#newGame');
const holdScore = document.querySelector('#holdScore');
const diceImg = document.querySelector('.buttons > img');

// Game state variables
let currentPlayer = 1; // Tracks which player's turn it is (1 or 2)
let player1TotalScore = 0; // Player 1's running score for the current round
let player2TotalScore = 0; // Player 2's running score for the current round

// Highlight Player 1 as the active player
let activePlayer1 = () => {
    player1.classList.add('activePlayer');
    player2.classList.remove('activePlayer');
};

// Highlight Player 2 as the active player
let activePlayer2 = () => {
    player2.classList.add('activePlayer');
    player1.classList.remove('activePlayer');
};

// Reset Player 1's round score (used when rolling a 1)
let resetPlayer1 = () => {
    player1TotalScore = 0;
    player1DiceScore.innerHTML = 0;
};

// Reset Player 2's round score (used when rolling a 1)
let resetPlayer2 = () => {
    player2TotalScore = 0;
    player2DiceScore.innerHTML = 0;
};

// Start a new game: Reset scores, UI, and set Player 1 as active
newGame.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form behavior (if inside a form)

    // Reset scores and game state
    player1Score.innerHTML = 0; // Reset Player 1's total score in the UI
    player2Score.innerHTML = 0; // Reset Player 2's total score in the UI
    player1TotalScore = 0; // Reset Player 1's running score
    player2TotalScore = 0; // Reset Player 2's running score
    player1DiceScore.innerHTML = 0; // Reset Player 1's dice score display
    player2DiceScore.innerHTML = 0; // Reset Player 2's dice score display

    // Set game state to Player 1's turn
    currentPlayer = 1; // Reset to Player 1
    activePlayer1(); // Highlight Player 1 as active

    // Hide the dice image at the start of a new game
    diceImg.src = './assets/1.png'; // Reset dice image to a default state
    diceImg.classList.add('diceImg'); // Hide the dice initially
});


// Roll the dice and update the current player's score
rollDice.addEventListener('click', (e) => {
    e.preventDefault();

    diceImg.classList.remove('diceImg'); // Show dice image

    // Generate a random dice number (1 to 6)
    let diceNumber = Math.floor(Math.random() * 6 + 1);
    diceImg.src = `./assets/${diceNumber}.png`;

    if (currentPlayer === 2) {
        // Player 2's turn
        activePlayer2();
        player2TotalScore += diceNumber;
        player2DiceScore.innerHTML = player2TotalScore;
    } else {
        // Player 1's turn
        activePlayer1();
        player1TotalScore += diceNumber;
        player1DiceScore.innerHTML = player1TotalScore;
    }

    // If the dice rolls a 1, reset the current player's score and switch players
    if (diceNumber === 1) {
        if (currentPlayer === 1) {
            resetPlayer1();
            activePlayer2();
            currentPlayer = 2;
        } else {
            resetPlayer2();
            activePlayer1();
            currentPlayer = 1;
        }
    }
});

// Hold the score: Add the current player's round score to their total score and switch turns
holdScore.addEventListener('click', (e) => {
    if (currentPlayer === 2) {
        // Add Player 2's round score to their total score
        player2Score.innerHTML = parseInt(player2Score.innerHTML || 0) + player2TotalScore;
        player2TotalScore = 0; // Reset round score
        player2DiceScore.innerHTML = player2TotalScore;
        activePlayer1(); // Switch to Player 1
        currentPlayer = 1;
    } else {
        // Add Player 1's round score to their total score
        player1Score.innerHTML = parseInt(player1Score.innerHTML || 0) + player1TotalScore;
        player1TotalScore = 0; // Reset round score
        player1DiceScore.innerHTML = player1TotalScore;
        activePlayer2(); // Switch to Player 2
        currentPlayer = 2;
    }
});


