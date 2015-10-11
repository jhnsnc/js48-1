var titleState = function(game) {};

(function() {
    titleState.prototype = {
        //var displayElements;

        create: function() {
            console.log("Showing title screen");

            var txtTitle, monsterSprite, btnStartGame;

            this.displayElements = this.game.add.group();
            this.displayElements.alpha = 0.0;

            //title
            txtTitle = createGameText({
                x: 540, y: 100,
                text: 'Monstrous',
                fontSize: 120,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtTitle);
            txtTitle = createGameText({
                x: 540, y: 220,
                text: 'Mixtures',
                fontSize: 120,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtTitle);

            //monster sprites
            //Skeleton
            monsterSprite = this.game.add.sprite(360, 300, "monster-Skeleton");
            monsterSprite.anchor.setTo(0.5, 0.5);
            monsterSprite.scale.setTo(4.0, 4.0);
            monsterSprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            monsterSprite.animations.play('idle');
            this.displayElements.add(monsterSprite);
            //Goblin
            monsterSprite = this.game.add.sprite(690, 300, "monster-Goblin");
            monsterSprite.anchor.setTo(0.5, 0.5);
            monsterSprite.scale.setTo(4.0, 4.0);
            monsterSprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            monsterSprite.animations.play('idle');
            this.displayElements.add(monsterSprite);
            //MudMan
            monsterSprite = this.game.add.sprite(450, 320, "monster-MudMan");
            monsterSprite.anchor.setTo(0.5, 0.5);
            monsterSprite.scale.setTo(4.0, 4.0);
            monsterSprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            monsterSprite.animations.play('idle');
            this.displayElements.add(monsterSprite);
            //Pixie
            monsterSprite = this.game.add.sprite(610, 320, "monster-Pixie");
            monsterSprite.anchor.setTo(0.5, 0.5);
            monsterSprite.scale.setTo(4.0, 4.0);
            monsterSprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            monsterSprite.animations.play('idle');
            this.displayElements.add(monsterSprite);
            //RedSlime
            monsterSprite = this.game.add.sprite(550, 340, "monster-RedSlime");
            monsterSprite.anchor.setTo(0.5, 0.5);
            monsterSprite.scale.setTo(4.0, 4.0);
            monsterSprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            monsterSprite.animations.play('idle');
            this.displayElements.add(monsterSprite);

            //start game button
            btnStartGame = createGameText({
                x: 540, y: 500,
                text: 'Play!',
                fontSize: 50,
                strokeThickness: 8
            }, this);
            btnStartGame.anchor.setTo(0.5, 0.5);
            this.displayElements.add(btnStartGame);
            btnStartGame.inputEnabled = true;
            btnStartGame.input.useHandCursor = true;
            btnStartGame.events.onInputDown.add(this.startGame, this);

            //fade in elements
            this.game.add.tween(this.displayElements)
                .to({alpha: 1.0}, 1250, Phaser.Easing.Sinusoidal.InOut, true);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        startGame: function(sprite, pointer) {
            this.game.add.tween(this.displayElements)
                .to({alpha: 0.0}, 500, Phaser.Easing.Sinusoidal.Out, true)
                .onComplete.add(function() {
                    this.game.state.start("Intro");
                }, this);
        }
    };
})();
