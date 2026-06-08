let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameOver = false;

const players = [document.getElementById('player1'), document.getElementById('player2')];
const scoreEls = document.querySelectorAll('.score');
const currentScoreEls = document.querySelectorAll('.current-score');
const diceImg = document.getElementById('diceImg');

function switchPlayer() {
    currentScore = 0;
    currentScoreEls[activePlayer].textContent = 0;
    players[activePlayer].classList.remove('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    players[activePlayer].classList.add('active');
}

document.getElementById('diceBtn').addEventListener('click', function () {
    if (gameOver) return;

    const roll = Math.trunc(Math.random() * 6) + 1;
    diceImg.src = `assets/dice_${roll}.png`;

    if (roll === 1) {
        switchPlayer();
    } else {
        currentScore += roll;
        currentScoreEls[activePlayer].textContent = currentScore;
    }
});

document.getElementById('holdBtn').addEventListener('click', function () {
    if (gameOver) return;

    scores[activePlayer] += currentScore;
    scoreEls[activePlayer].textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
        gameOver = true;
        document.querySelector(`#player${activePlayer + 1} h2`).textContent = '🏆 Winner!';
        players[activePlayer].style.background = '#d4edff';
        return;
    }

    switchPlayer();
});

document.getElementById('reset').addEventListener('click', function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameOver = false;

    scoreEls.forEach(el => el.textContent = 0);
    currentScoreEls.forEach(el => el.textContent = 0);

    players.forEach(p => {
        p.classList.remove('active');
        p.style.background = '';
    });
    players[0].classList.add('active');

    document.querySelector('#player1 h2').textContent = 'Player 1';
    document.querySelector('#player2 h2').textContent = 'Player 2';

    diceImg.src = 'assets/dice_1.png';
});