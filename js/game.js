const tileSize = 32;
const rows = 16;
const columns = 16;

let speelveld, context;
let ruimteschip, ruimteschipAfbeelding, ruimteschipSnelheidX;
let aliens, alienAfbeelding, alienGridSize, alienGridStartX, alienGridStartY, alienSnelheid, alienRichting;
let gameOver;
let kogels, kogelSnelheidY, kogelBreedte, kogelHoogte;

window.onload = function () {
  initialize();
  loadImages();
  generateNewAliens();
  requestAnimationFrame(update);
  document.addEventListener("keydown", beweegRuimteschip);
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      vuurKogel();
    }
  });
};

function initialize() {
  speelveld = document.getElementById("speelveld");
  speelveld.width = tileSize * columns;
  speelveld.height = tileSize * rows;
  context = speelveld.getContext("2d");

  ruimteschip = {
    x: (tileSize * columns) / 2 - tileSize,
    y: tileSize * rows - tileSize * 2,
    breedte: 64,
    hoogte: 64,
  };
  ruimteschipSnelheidX = tileSize;

  aliens = [];
  alienGridSize = 6;
  alienGridStartX = (columns * tileSize - alienGridSize * tileSize) / 2;
  alienGridStartY = 0;
  alienSnelheid = 0.7;
  alienRichting = 1;

  gameOver = false;

  kogels = [];
  kogelSnelheidY = -4;
  kogelBreedte = 4;
  kogelHoogte = 25;
}

function loadImages() {
  ruimteschipAfbeelding = loadImage("img/ship.png");
  alienAfbeelding = loadImage("img/alien.png");
}

function loadImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function generateNewAliens() {
  aliens = [];

  for (let i = 0; i < alienGridSize; i++) {
    for (let j = 0; j < alienGridSize; j++) {
      const alienX = alienGridStartX + j * tileSize;
      const alienY = alienGridStartY + i * tileSize;
      aliens.push({ x: alienX, y: alienY });
      context.drawImage(alienAfbeelding, alienX, alienY, tileSize, tileSize);
    }
  }
}

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, speelveld.width, speelveld.height);

  drawImage(ruimteschipAfbeelding, ruimteschip.x, ruimteschip.y, ruimteschip.breedte, ruimteschip.hoogte);

  aliens.forEach(function (alien) {
    alien.x += alienSnelheid * alienRichting;
    context.drawImage(alienAfbeelding, alien.x, alien.y, tileSize, tileSize);

    if (alien.x + tileSize > speelveld.width || alien.x < 0) {
      alienRichting *= -1;
      aliens.forEach(function (alien) {
        alien.y += tileSize;
      });
    }
  });

  kogels.forEach(function (kogel) {
    kogel.y += kogelSnelheidY;
    context.beginPath();
    context.moveTo(kogel.x, kogel.y);
    context.lineTo(kogel.x, kogel.y + kogelHoogte);
    context.strokeStyle = "white";
    context.lineWidth = kogelBreedte;
    context.stroke();

    const alienIndexToRemove = aliens.findIndex((alien) => {
      return kogel.x >= alien.x && kogel.x <= alien.x + tileSize && kogel.y <= alien.y + tileSize;
    });

    if (alienIndexToRemove !== -1) {
      aliens.splice(alienIndexToRemove, 1);
      kogels.splice(kogels.indexOf(kogel), 1);

      if (aliens.length === 0) {
        gameOver = true;
        checkGameOver();
      }
    }
  });

  kogels = kogels.filter((kogel) => kogel.y > 0);
}

function drawImage(image, x, y, width, height) {
  context.drawImage(image, x, y, width, height);
}

function beweegRuimteschip(e) {
  if (gameOver) {
    return;
  }

  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    if (ruimteschip.x - ruimteschipSnelheidX >= 0) {
      ruimteschip.x -= ruimteschipSnelheidX;
    }
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    if (ruimteschip.x + ruimteschipSnelheidX + ruimteschip.breedte <= speelveld.width) {
      ruimteschip.x += ruimteschipSnelheidX;
    }
  }
}

function vuurKogel() {
  const kogelX = ruimteschip.x + ruimteschip.breedte / 2;
  const kogelY = ruimteschip.y;
  kogels.push({ x: kogelX, y: kogelY });
}

function startSpelOpnieuw() {
  gameOver = false;
  ruimteschip.x = (tileSize * columns) / 2 - tileSize;
  ruimteschip.y = tileSize * rows - tileSize * 2;
  kogels = [];
  generateNewAliens();
}

function checkGameOver() {
  if (aliens.length === 0) {
    startSpelOpnieuw();
  }
}
