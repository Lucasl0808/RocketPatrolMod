/*
Lucas Lee
Game title: Rocket Patrol 2: 2 Many Rockets
Time for completion: about 8 hours
Mods:
    high score - 5
    fire button - 5
    background music - 5
    speed increase after 30 secs - 5
    new background image - 5
    new ship type - 15
    alternating 2 player - 15
    new title screen - 10
    working in game timer - 10
    add time to timer for successful hits - 15
    parallax scrolling for background(speed changes when ship moves and moves at different speeds than ships) - 10

    total: 100

    citations: https://phaser.discourse.group/t/countdown-timer/2471/3
    https://stackoverflow.com/questions/29148886/show-hide-sprites-texts-in-phaser
    https://stackoverflow.com/questions/56220214/how-to-correctly-resize-images-to-retain-quality-in-phaser-3

*/
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

let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding:{
        top:5,
        bottom:5,
    },
    fixedWidth: 100
};

let bgm;

let backgroundSpeed = 2;