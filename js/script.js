const startButton = document.getElementById('start-button');
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');
const gameStatus = document.getElementById('game-status');
const instructionButton = document.getElementById('instruction-button');
const instructionOverlay = document.getElementById('instruction-overlay');
const closeButton = document.getElementById('close-button');

startButton.addEventListener('click', function (event) {
    event.preventDefault();
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
    gameStatus.textContent = 'Spel is gestart';
});

instructionButton.addEventListener('click', function (event) {
    event.preventDefault();
    instructionOverlay.style.display = 'flex';
});

closeButton.addEventListener('click', function () {
    instructionOverlay.style.display = 'none';
});
