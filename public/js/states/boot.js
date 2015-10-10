var bootState = function(game) {};

bootState.prototype = {
    preload: function() {
        //this.game.load.image("loading")
    },
    create: function() {
        console.log("Initial game setup");

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        //this.scale.setScreenSize();
        this.game.state.start("Preload");
    }
}
