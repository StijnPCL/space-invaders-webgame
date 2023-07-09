<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Invaders</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <?php
    $startGame = isset($_GET['start_game']) ? $_GET['start_game'] : false;
    if ($startGame) {
        include 'game.php';
    } else {
        ?>
        <div id="main-menu">
            <img src="img/space_invaders_logo.png" id="space-invaders-logo" alt="Space Invaders Logo">
            <a href="?start_game=true" id="start-button">Start Spel</a>
            <a href="#" id="instruction-button">Instructies</a>
        </div>
    <?php
    }
    ?>

    <div id="instruction-overlay" class="overlay">
        <div class="instruction-content">
            <h2>Instructies</h2>
            <p>Gebruik de volgende toetsen om te bewegen:</p>
            <p>A - links</p>
            <p>D - rechts</p>
            <p>Spatiebalk - schieten</p>
            <button id="close-button">Sluiten</button>
        </div>
    </div>
</body>
<script src="js/script.js"></script>
</html>
