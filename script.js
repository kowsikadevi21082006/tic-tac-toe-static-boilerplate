const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('description');
const restartButton = document.getElementById('restartbut');
let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const cell = e.target;
    const currentClass = currentPlayer;

    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentClass;
    checkGameStatus();
    swapPlayer();
};

const checkGameStatus = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = cells[winCondition[0]].textContent;
        let b = cells[winCondition[1]].textContent;
        let c = cells[winCondition[2]].textContent;

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        message.innerText = `Player ${currentPlayer} won the game!
        Well Done👍`;
        return;
    }
    else

    if (![...cells].some(cell => cell.textContent === '')) {
        gameActive = false;
        message.innerText = 'It\'s a draw!';
    }
};

const swapPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    description.innerText = '';
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);