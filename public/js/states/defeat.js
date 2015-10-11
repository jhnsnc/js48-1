var defeatState = function(game) {};

(function() {
    defeatState.prototype = {
        //var txtTitle;
        //var btnStartGame;

        create: function() {
            console.log("Showing defeat screen");

            var txtTitle, txtTryAgain, btnStartGame, txtLvlAchieved;

            //title
            txtTitle = createGameText({
                x: 540, y: 120,
                text: 'Defeat',
                fontSize: 80,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);

            //button
            btnStartGame = this.game.add.sprite(540, 290, "monster-RedSlime");
            btnStartGame.anchor.setTo(0.5, 0.5);
            btnStartGame.scale.setTo(4.0, 4.0);
            btnStartGame.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            btnStartGame.animations.play('idle');
            btnStartGame.inputEnabled = true;
            btnStartGame.input.useHandCursor = true;
            btnStartGame.events.onInputDown.add(this.backToTitle, this);

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

            //level achieved text
            txtLvlAchieved = createGameText({
                x: 540, y: 550,
                text: '- level reached: ' + player.level + ' -',
                fontSize: 20,
                strokeThickness: 8
            }, this);
            txtLvlAchieved.anchor.setTo(0.5, 0.5);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        backToTitle: function(sprite, pointer) {
            player.init();

            this.game.state.start("Title");
        }
    };
})();
