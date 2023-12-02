const gameGrid = document.querySelector('.game-grid');

//  the player's score
let score = 0;
const scoreElement = document.querySelector('#score span');

// creating a function to add a coin to the grid
function addCoin() {
    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.addEventListener('click', () => {
        score += 10;
        scoreElement.textContent = score;
        coin.remove();
        addCoin(); // adding a new coin to the grid
    });
    gameGrid.appendChild(coin);
}

for (let i = 0; i < 10; i++) {
    addCoin();
}
