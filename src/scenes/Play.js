class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    timedEvent;

    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/newStarfield1.png');
        this.load.image('spaceship2', './assets/spaceship2.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame:9});
    }

    create(){
        
        let bgm = this.sound.add('bgm');
        bgm.play({volume: 0.3});
        
        this.timedEvent = this.time.delayedCall(30000, this.speedUp, [], this);

        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);

        //green UI background
        //this.add.rectangle(0, borderUISize+borderPadding, game.config.width, borderUISize*2, 0x00FF00).setOrigin(0,0);
        
        //white borders
        this.add.rectangle(0,0,game.config.width,borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0,borderUISize,game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width-borderUISize, 0, borderUISize,game.config.height, 0xFFFFFF).setOrigin(0,0);

        //add rocket
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        //ADD SPACESHIP
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5+borderPadding*2,'spaceship',0,20).setOrigin(0,0);
        this.ship03 = new Spaceship(this,game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.ship04 = new Spaceship2(this,game.config.width, borderUISize*4 + borderPadding, 'spaceship2', 0, 50).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:9, first:0}),
            frameRate: 30
        });

        this.p1Score = 0;
        this.p2score = 0;

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
        }

        let pointer = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top:5,
                bottom:5,
            },
            fixedWidth: 0
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, `p1: ${this.p1Score}`, scoreConfig);

        this.fireText = this.add.text(borderUISize + borderPadding * 30, borderUISize + borderPadding * 2, `FIRE`, scoreConfig);

        if(p2 == true){
            this.p1Turn = this.add.text(borderUISize + borderPadding*5, borderUISize + borderPadding * 4, `↑`, pointer);

            this.p2Turn = this.add.text(borderUISize + borderPadding * 45, borderUISize + borderPadding * 4, `↑`, pointer);
            this.p2Turn.visible = false;
            this.scoreRight = this.add.text(borderUISize + borderPadding * 40, borderUISize + borderPadding * 2, `p2: ${this.p2score}`, scoreConfig);
        }
        this.p1High = this.add.text(borderUISize + borderPadding * 11, borderUISize + borderPadding *2, `High:${highScore}`, scoreConfig);
        
        
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            bgm.stop();
            if(this.p1Score > highScore){
                highScore = this.p1Score;
            }
            if(this.p2score > highScore){
                highScore = this.p2score;
            }
        }, null, this);

        this.timer = this.add.text(borderUISize + borderPadding * 21, borderUISize + borderPadding *2, `Time:${game.settings.gameTimer/1000}`, scoreConfig);
    }

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            easyTime = 60000;
            hardTime = 45000;
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            easyTime = 60000;
            hardTime = 45000;
            this.scene.start("menuScene");
          }

        this.starfield.tilePositionX -= 4;

        if(nov == true){
            //easyTime -= 1000;
            this.timer.setText(`Time:${Math.round(game.settings.gameTimer * .001)}`);
            game.settings.gameTimer -= 25
        }
        if(exp == true){
            //hardTime -= 1000;
            this.timer.setText(`Time:${Math.round(game.settings.gameTimer * .001)}`);
            game.settings.gameTimer -= 1;
        }

        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket,this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

        if(this.p1Rocket.isFiring){
            this.fireText.visible = false;
        }
        if(!this.p1Rocket.isFiring){
            this.fireText.visible = true;
            if(currentTurn % 2 == 1 && p2 == true){
                this.p1Turn.visible = false;
                this.p2Turn.visible = true;
            } 
            if(currentTurn % 2 == 0 && p2 == true){
                this.p1Turn.visible = true;
                this.p2Turn.visible = false;
            }
        }
        
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(currentTurn % 2 == 1 || p2 == false){
            this.p1Score += ship.points;
        } 
        if(currentTurn % 2 == 0){
            this.p2score += ship.points;
        }
        this.scoreLeft.text = `p1: ${this.p1Score}`;
        if(p2){
            this.scoreRight.text = `p2: ${this.p2score}`;
        }
        this.sound.play('sfx_explosion');
    }

    speedUp(){
        this.ship01.moveSpeed += 3;
        this.ship02.moveSpeed += 3;
        this.ship03.moveSpeed += 3;
        this.ship04.moveSpeed += 3;
    }
}