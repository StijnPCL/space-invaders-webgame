<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Invaders</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div id="main-menu">
        <img src="img/space_invaders_logo.png" id="space-invaders-logo" alt="Space Invaders Logo">
        <a href="#" id="start-button">Start Spel</a>
        <a href="#" id="instruction-button">Instructies</a>
    </div>

    <div id="game-container">
        
    </div>

    <div id="instruction-overlay" class="overlay">
        <div class="instruction-content">
            <h2>Instructies</h2>
            <p>Gebruik de volgende toetsen om te bewegen:</p>
            <p>W - omhoog</p>
            <p>A - links</p>
            <p>S - omlaag</p>
            <p>D - rechts</p>
            <p>Spatiebalk - schieten</p>
            <button id="close-button">Sluiten</button>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>


</html>
