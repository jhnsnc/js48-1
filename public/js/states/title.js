var titleState = function(game) {};

(function() {
    titleState.prototype = {
        //var txtTitle;
        //var btnStartGame;

        create: function() {
            console.log("Showing title screen");

            //title
            this.txtTitle = createGameText({
                x: 540, y: 150,
                text: 'GAME TITLE',
                fontSize: 80,
                strokeThickness: 8
            }, this);
            this.txtTitle.anchor.setTo(0.5, 0.5);

            //start game button
            this.btnStartGame = this.game.add.sprite(540, 300, "monster-RedSlime");
            this.btnStartGame.anchor.setTo(0.5, 0.5);
            this.btnStartGame.scale.setTo(4.0, 4.0);
            this.btnStartGame.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            this.btnStartGame.animations.play('idle');
            this.btnStartGame.inputEnabled = true;
            this.btnStartGame.input.useHandCursor = true;
            this.btnStartGame.events.onInputDown.add(this.startGame, this);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        startGame: function(sprite, pointer) {
            this.game.state.start("Battle"); //TODO: start at different state
        }
    };
})();
