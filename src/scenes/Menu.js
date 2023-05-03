class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm', './assets/bgm.mp3');
        this.load.image('moon', './assets/moonIcon.png');
        this.load.image('icon', './assets/menuIcon.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Lexend',
            fontSize: '19px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        let titleConfig = {
          fontFamily: 'Impact',
          fontSize: '40px',
          backgroundColor: '#d3ff8f',
          color: '#ff6ff2',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
        // show menu text
        this.add.text(game.config.width/2, game.config.height/5 - borderUISize - borderPadding, 'Space Shooters', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice, ↑ Novice 2p, → Expert,  ↓ Expert 2p', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2+80, `High Score: ${highScore}`, menuConfig).setOrigin(0.5);
        this.add.sprite(100,200,'moon');
        this.add.sprite(550,200,'icon');

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    
        //reset both modes to false
        nov = false;
        exp = false;
        p2 = false;
        currentTurn = 0;
      
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 3,
            spaceship2Speed: 5,
            gameTimer: easyTime    
          }
          nov = true;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
          // Novice mode 2p
          game.settings = {
            spaceshipSpeed: 3,
            spaceship2Speed: 5,
            gameTimer: easyTime    
          }
          nov = true;
          p2 = true;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 4,
            spaceship2Speed: 6,
            gameTimer: hardTime 
          }
          exp = true;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // Expert mode 2p
          game.settings = {
            spaceshipSpeed: 4,
            spaceship2Speed: 6,
            gameTimer: hardTime 
          }
          exp = true;
          p2 = true;
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
      }
}