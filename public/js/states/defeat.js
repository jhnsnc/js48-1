var defeatState = function(game) {};

(function() {
    defeatState.prototype = {
        //var displayElements;

        create: function() {
            console.log("Showing defeat screen");

            var txtTitle, txtTryAgain, btnStartGame, txtLvlAchieved;

            this.displayElements = this.game.add.group();
            this.displayElements.alpha = 0.0;

            //title
            txtTitle = createGameText({
                x: 540, y: 120,
                text: 'Defeat',
                fontSize: 80,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtTitle);

            //button
            btnStartGame = this.game.add.sprite(540, 290, "monster-RedSlime");
            btnStartGame.anchor.setTo(0.5, 0.5);
            btnStartGame.scale.setTo(4.0, 4.0);
            btnStartGame.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            btnStartGame.animations.play('idle');
            btnStartGame.inputEnabled = true;
            btnStartGame.input.useHandCursor = true;
            btnStartGame.events.onInputDown.add(this.backToTitle, this);
            this.displayElements.add(btnStartGame);

            //try again text
            txtTryAgain = createGameText({
                x: 540, y: 420,
                text: 'try again?',
                fontSize: 40,
                strokeThickness: 0,
                fill: '#e50525'
            }, this);
            txtTryAgain.anchor.setTo(0.5, 0.5);
            txtTryAgain.inputEnabled = true;
            txtTryAgain.input.useHandCursor = true;
            txtTryAgain.events.onInputDown.add(this.backToTitle, this);
            this.displayElements.add(txtTryAgain);

            //level achieved text
            txtLvlAchieved = createGameText({
                x: 540, y: 550,
                text: '- level reached: ' + player.level + ' -',
                fontSize: 20,
                strokeThickness: 8
            }, this);
            txtLvlAchieved.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtLvlAchieved);

            //fade in elements
            this.game.add.tween(this.displayElements)
                .to({alpha: 1.0}, 1250, Phaser.Easing.Sinusoidal.InOut, true);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        backToTitle: function(sprite, pointer) {
            player.init();

            this.game.add.tween(this.displayElements)
                .to({alpha: 0.0}, 500, Phaser.Easing.Sinusoidal.Out, true)
                .onComplete.add(function() {
                    this.game.state.start("Intro");
                }, this);
        }
    };
})();
