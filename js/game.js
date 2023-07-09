let tileSize = 32;
let rows = 16;
let columns = 16;

let speelveld;
let speelveldBreedte = tileSize * columns;
let speelveldHoogte = tileSize * rows;
let context;

let ruimteschipBreedte = 64;
let ruimteschipHoogte = 64;
let ruimteschipX = tileSize * columns / 2 - tileSize;
let ruimteschipY = tileSize * rows - tileSize * 2;

let ruimteschip = {
  x: ruimteschipX,
  y: ruimteschipY,
  breedte: ruimteschipBreedte,
  hoogte: ruimteschipHoogte,
};

let ruimteschipAfbeelding;
let ruimteschipSnelheidX = tileSize;

let gameOver = false;

window.onload = function () {
  speelveld = document.getElementById("speelveld");
  speelveld.width = speelveldBreedte;
  speelveld.height = speelveldHoogte;
  context = speelveld.getContext("2d");

  ruimteschipAfbeelding = new Image();
  ruimteschipAfbeelding.src = "img/ship.png";
  ruimteschipAfbeelding.onload = function () {
    context.drawImage(
      ruimteschipAfbeelding,
      ruimteschip.x,
      ruimteschip.y,
      ruimteschip.breedte,
      ruimteschip.hoogte
    );
  };

  requestAnimationFrame(update);
  document.addEventListener("keydown", beweegRuimteschip);
};

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  context.clearRect(0, 0, speelveld.width, speelveld.height);
  context.drawImage(
    ruimteschipAfbeelding,
    ruimteschip.x,
    ruimteschip.y,
    ruimteschip.breedte,
    ruimteschip.hoogte
  );
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
