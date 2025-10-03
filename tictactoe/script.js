let currentPlayer='X';
let gameBoard=['','','','','','','','','','','','','','','',''];
let gameActive=true;

const winningCond = [
    [0,1,2,3],
    [0,4,8,12],
    [0,5,10,15],
    [3,6,9,12],
    [3,7,11,15],
    [12,13,14,15],
    [4,5,6,7],
    [8,9,10,11],
    [1,5,9,13],
    [2,6,10,14]
];
document.querySelectorAll('.cell').forEach(cell=> {
    cell.addEventListener('click',handleCellClick);
});

document.getElementById('restart').addEventListener('click',restartGame);
document.getElementById('theme-switch').addEventListener('change', toggleTheme);

function handleCellClick(e) {
    const index=e.target.dataset.index;
    if(gameBoard[index]!=='' || !gameActive) return;

    gameBoard[index]=currentPlayer;
    e.target.textContent=currentPlayer;
    checkResult();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer=currentPlayer==='X'?'O':'X';
    document.getElementById('turn').textContent=`Current turn: ${currentPlayer}`;
}

function checkResult() {
    for(let condition of winningCond) {
        let [a,b,c,d]=condition;
        if(gameBoard[a] && gameBoard[a]===gameBoard[b] && gameBoard[a]===gameBoard[c] && gameBoard[a]===gameBoard[d]) {
            gameActive=false;
            document.getElementById('message').textContent=`Player ${gameBoard[a]} wins!`;
            return;
        }
    }
    if(!gameBoard.includes('')) {
        gameActive=false;
        document.getElementById('message').textContent='It\'s a draw!';
    }
}

function restartGame() {
    gameBoard=['','','','','','','','','','','','','','','',''];
    gameActive=true;
    currentPlayer='X';
    document.getElementById('turn').textContent='Current turn: X';
    document.getElementById('message').textContent='';
    document.querySelectorAll('.cell').forEach(cell=>cell.textContent='');
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
}