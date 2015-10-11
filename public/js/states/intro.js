var introState = function(game) {};

(function() {
    introState.prototype = {
        //var displayElements;

        create: function() {
            console.log("Showing intro screen");

            var txtTitle, btnStartGame;

            this.displayElements = this.game.add.group();
            this.displayElements.alpha = 0.0;

            //title
            txtTitle = createGameText({
                x: 540, y: 150,
                text: 'Intro!',
                fontSize: 80,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtTitle);

            //button
            btnStartGame = this.game.add.sprite(540, 300, "monster-RedSlime");
            btnStartGame.anchor.setTo(0.5, 0.5);
            btnStartGame.scale.setTo(4.0, 4.0);
            btnStartGame.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            btnStartGame.animations.play('idle');
            btnStartGame.inputEnabled = true;
            btnStartGame.input.useHandCursor = true;
            btnStartGame.events.onInputDown.add(this.beginNextBattle, this);
            this.displayElements.add(btnStartGame);

            //fade in elements
            this.game.add.tween(this.displayElements)
                .to({alpha: 1.0}, 1250, Phaser.Easing.Sinusoidal.InOut, true);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        beginNextBattle: function(sprite, pointer) {
            this.game.add.tween(this.displayElements)
                .to({alpha: 0.0}, 500, Phaser.Easing.Sinusoidal.Out, true)
                .onComplete.add(function() {
                    this.game.state.start("Battle");
                }, this);
        }
    };
})();
