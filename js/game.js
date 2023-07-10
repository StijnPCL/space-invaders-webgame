// Grootte van elke tegel in pixels
const tileSize = 32;

// Aantal rijen in het speelveld
const rows = 16;

// Aantal kolommen in het speelveld
const columns = 16;

let speelveld, context; // Variabelen voor het speelveld en de tekencontext
let ruimteschip, ruimteschipAfbeelding, ruimteschipSnelheidX; // Variabelen voor het ruimteschip
let aliens, alienAfbeelding, alienGridSize, alienGridStartX, alienGridStartY, alienSnelheid, alienRichting; // Variabelen voor de aliens
let gameOver; // Variabele om bij te houden of het spel voorbij is
let kogels, kogelSnelheidY, kogelBreedte, kogelHoogte; // Variabelen voor de kogels

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

// initialiseert de variabelen en zet de startwaarden voor het spel
function initialize() {
  speelveld = document.getElementById("speelveld"); // Het speelveld-element in het HTML-document
  speelveld.width = tileSize * columns; // Breedte van het speelveld in pixels
  speelveld.height = tileSize * rows; // Hoogte van het speelveld in pixels
  context = speelveld.getContext("2d"); // Tekencontext voor het speelveld

  ruimteschip = {
    x: (tileSize * columns) / 2 - tileSize, // X-positie van het ruimteschip
    y: tileSize * rows - tileSize * 2, // Y-positie van het ruimteschip
    breedte: 64, // Breedte van het ruimteschip in pixels
    hoogte: 64, // Hoogte van het ruimteschip in pixels
  };
  ruimteschipSnelheidX = tileSize; // Snelheid waarmee het ruimteschip horizontaal beweegt

  aliens = []; // Array voor de aliens
  alienGridSize = 6; // Grootte van het rooster van aliens (aantal aliens per rij en kolom)
  alienGridStartX = (columns * tileSize - alienGridSize * tileSize) / 2; // X-positie van het beginpunt van het alien-rooster
  alienGridStartY = 0; // Y-positie van het beginpunt van het alien-rooster
  alienSnelheid = 1.5; // Snelheid waarmee de aliens horizontaal bewegen
  alienRichting = 1; // Richting waarin de aliens bewegen (-1 naar links, 1 naar rechts)

  gameOver = false; // Variabele om bij te houden of het spel voorbij is

  kogels = []; // Array voor de kogels
  kogelSnelheidY = -8; // Snelheid waarmee de kogels verticaal bewegen
  kogelBreedte = 4; // Breedte van de kogels in pixels
  kogelHoogte = 25; // Hoogte van de kogels in pixels
}

// Laadt de afbeeldingen van het ruimteschip en de aliens
function loadImages() {
  ruimteschipAfbeelding = loadImage("img/ship.png"); // Afbeelding van het ruimteschip
  alienAfbeelding = loadImage("img/alien.png"); // Afbeelding van de aliens
}

// Laadt een afbeelding en retourneert het Image-object
function loadImage(src) {
  const image = new Image(); // Maak een nieuw Image-object
  image.src = src; // Stel de bron van de afbeelding in
  return image; // Retourneer het Image-object
}

// Genereert een nieuw rooster van aliens op het speelveld
function generateNewAliens() {
  aliens = []; // Maak de array van aliens leeg

  for (let i = 0; i < alienGridSize; i++) {
    for (let j = 0; j < alienGridSize; j++) {
      const alienX = alienGridStartX + j * tileSize; // X-positie van de huidige alien
      const alienY = alienGridStartY + i * tileSize; // Y-positie van de huidige alien
      aliens.push({ x: alienX, y: alienY }); // Voeg de alien toe aan de array van aliens
      context.drawImage(alienAfbeelding, alienX, alienY, tileSize, tileSize); // Tekenen van de alien op het speelveld
    }
  }
}

// De belangrijkste update-functie van het spel
function update() {
  requestAnimationFrame(update); // Vraag de browser om de update-functie opnieuw uit te voeren bij de volgende frame

  if (gameOver) {
    return; // Stop de update-functie als het spel voorbij is
  }

  context.clearRect(0, 0, speelveld.width, speelveld.height); // Wis het speelveld

  drawImage(ruimteschipAfbeelding, ruimteschip.x, ruimteschip.y, ruimteschip.breedte, ruimteschip.hoogte); // Tekenen van het ruimteschip op het speelveld

  aliens.forEach(function (alien) {
    alien.x += alienSnelheid * alienRichting; // Horizontale beweging van de aliens
    context.drawImage(alienAfbeelding, alien.x, alien.y, tileSize, tileSize); // Tekenen van de alien op het speelveld

    if (alien.x + tileSize > speelveld.width || alien.x < 0) {
      alienRichting *= -1; // Verander de richting van de aliens als ze de rand van het speelveld bereiken
      aliens.forEach(function (alien) {
        alien.y += tileSize; // Verticale beweging van de aliens
      });
    }
  });

  kogels.forEach(function (kogel) {
    kogel.y += kogelSnelheidY; // Verticale beweging van de kogels
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
      aliens.splice(alienIndexToRemove, 1); // Verwijder de geselecteerde alien uit de array van aliens
      kogels.splice(kogels.indexOf(kogel), 1); // Verwijder de huidige kogel uit de array van kogels

      if (aliens.length === 0) {
        gameOver = true; // Het spel is voorbij als er geen aliens meer over zijn
        checkGameOver();
      }
    }
  });

  kogels = kogels.filter((kogel) => kogel.y > 0); // Verwijder kogels die buiten het speelveld zijn gegaan
}

// Tekent een afbeelding op het speelveld
function drawImage(image, x, y, width, height) {
  context.drawImage(image, x, y, width, height);
}

// Verplaatst het ruimteschip naar links of rechts op basis van de gebruikersinvoer
function beweegRuimteschip(e) {
  if (gameOver) {
    return; // Stop de functie als het spel voorbij is
  }

  if (e.code == "ArrowLeft" || e.code == "KeyA") {
    if (ruimteschip.x - ruimteschipSnelheidX >= 0) {
      ruimteschip.x -= ruimteschipSnelheidX; // Verplaats het ruimteschip naar links binnen de grenzen van het speelveld
    }
  } else if (e.code == "ArrowRight" || e.code == "KeyD") {
    if (ruimteschip.x + ruimteschipSnelheidX + ruimteschip.breedte <= speelveld.width) {
      ruimteschip.x += ruimteschipSnelheidX; // Verplaats het ruimteschip naar rechts binnen de grenzen van het speelveld
    }
  }
}

// Maakt een nieuwe kogel aan en voegt deze toe aan de array van kogels
function vuurKogel() {
  const kogelX = ruimteschip.x + ruimteschip.breedte / 2; // X-positie van de kogel, in het midden van het ruimteschip
  const kogelY = ruimteschip.y; // Y-positie van de kogel, boven het ruimteschip
  kogels.push({ x: kogelX, y: kogelY }); // Voeg de kogel toe aan de array van kogels
}

// Start het spel opnieuw nadat het voorbij is
function startSpelOpnieuw() {
  gameOver = false; // Het spel is niet meer voorbij
  ruimteschip.x = (tileSize * columns) / 2 - tileSize; // Zet het ruimteschip terug naar de startpositie
  ruimteschip.y = tileSize * rows - tileSize * 2;
  kogels = []; // Maak de array van kogels leeg
  generateNewAliens(); // Genereer nieuwe aliens
}

// Controleert of het spel voorbij is
function checkGameOver() {
  if (aliens.length === 0) {
    startSpelOpnieuw(); // Start het spel opnieuw als er geen aliens meer over zijn
  }
}
