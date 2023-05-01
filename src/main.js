let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu,Play]
}

let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyUP;


//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize /3;

//define global high score
let highScore = 0;

//define time as variable
let easyTime = 60000;
let hardTime = 45000;

let nov = false;
let exp = false;

let p2 = false;
let currentTurn = 0;