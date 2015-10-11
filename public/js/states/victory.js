var victoryState = function(game) {};

(function() {
    victoryState.prototype = {
        //var txtTitle;
        //var btnStartGame;

        create: function() {
            console.log("Showing victory screen");

            //title
            this.txtTitle = createGameText({
                x: 540, y: 150,
                text: 'Victory!',
                fontSize: 80,
                strokeThickness: 8
            }, this);
            this.txtTitle.anchor.setTo(0.5, 0.5);

            this.btnStartGame = this.game.add.sprite(540, 300, "monster-RedSlime");
            this.btnStartGame.anchor.setTo(0.5, 0.5);
            this.btnStartGame.scale.setTo(4.0, 4.0);
            this.btnStartGame.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
            this.btnStartGame.animations.play('idle');
            this.btnStartGame.inputEnabled = true;
            this.btnStartGame.input.useHandCursor = true;
            this.btnStartGame.events.onInputDown.add(this.beginNextBattle, this);

            //fullscreen toggle
            createFullscreenToggle(this);
        },
        beginNextBattle: function(sprite, pointer) {
            player.levelUp();
            player.armorMod = 0;
            player.resistMod = 0;
            this.game.state.start("Battle");
        }
    };
})();
