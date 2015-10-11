var introState = function(game) {};

(function() {
    introState.prototype = {
        //var displayElements;

        create: function() {
            console.log("Showing intro screen");

            var txtTitle, txtParagraph, btnStartGame;
            var text;

            this.displayElements = this.game.add.group();
            this.displayElements.alpha = 0.0;

            //title
            txtTitle = createGameText({
                x: 540, y: 70,
                text: 'Intro!',
                fontSize: 60,
                strokeThickness: 8
            }, this);
            txtTitle.anchor.setTo(0.5, 0.5);
            this.displayElements.add(txtTitle);

            //paragraph intro text
            text = "You are a marauding mad scientist, seeking more power and mastery over science.";
            txtParagraph = createGameText({
                x: 140, y: 120,
                text: text,
                fontSize: 20,
                strokeThickness: 5
            }, this);
            txtParagraph.wordWrap = true;
            txtParagraph.wordWrapWidth = 800;
            this.displayElements.add(txtParagraph);

            text = "In order to become more powerful, you must fight various monsters that inhabit these lands. "+
                    "As you grow in power, so will they. Strive to reach the highest level you can!";
            txtParagraph = createGameText({
                x: 140, y: 165,
                text: text,
                fontSize: 20,
                strokeThickness: 5
            }, this);
            txtParagraph.wordWrap = true;
            txtParagraph.wordWrapWidth = 800;
            this.displayElements.add(txtParagraph);

            text = "Armor and resist can help reduce incoming physical or magic damage. "+
                    "Note, however, that armor and resist provide exponential reduction of incoming damage, so "+
                    "those stats will become more important as you level.";
            txtParagraph = createGameText({
                x: 140, y: 275,
                text: text,
                fontSize: 20,
                strokeThickness: 5
            }, this);
            txtParagraph.wordWrap = true;
            txtParagraph.wordWrapWidth = 800;
            this.displayElements.add(txtParagraph);

            text = "In order to take offensive actions, you must spend ingredients. You can gain additional ingredients "+
                    "by taking the time to gather them, or you can defeat monsters in order to gain resources based on their type.";
            txtParagraph = createGameText({
                x: 140, y: 385,
                text: text,
                fontSize: 20,
                strokeThickness: 5
            }, this);
            txtParagraph.wordWrap = true;
            txtParagraph.wordWrapWidth = 800;
            this.displayElements.add(txtParagraph);

            text = "code by Chris Johnson (@jhnsnc) \nfor #js48 (https://itch.io/jam/js48-1/)";
            txtParagraph = createGameText({
                x: 140, y: 525,
                text: text,
                fontSize: 15,
                strokeThickness: 5
            }, this);
            this.displayElements.add(txtParagraph);

            //start game button
            btnStartGame = createGameText({
                x: 940, y: 550,
                text: 'Proceed',
                fontSize: 50,
                strokeThickness: 0,
                fill: '#e50525'
            }, this);
            btnStartGame.anchor.setTo(1.0, 0.5);
            this.displayElements.add(btnStartGame);
            btnStartGame.inputEnabled = true;
            btnStartGame.input.useHandCursor = true;
            btnStartGame.events.onInputDown.add(this.beginNextBattle, this);

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
