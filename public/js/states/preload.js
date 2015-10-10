var preloadState = function(game) {};

(function() {
    preloadState.prototype = {
        preload: function() {
            var game = this.game;

            //monsters
            _.forEach(_.keys(MONSTER_DATA), function(id) {
                var monsterData = MONSTER_DATA[id];
                game.load.spritesheet(monsterData.spriteName, monsterData.spriteLocation, monsterData.spriteW, monsterData.spriteH);
            });

            //ingredients
            _.forEach(INGREDIENTS_DATA, function(ingredientData) {
                game.load.image(ingredientData.spriteName, ingredientData.spriteLocation);
            });

            //backgrounds
            game.load.image("background-Sky", "assets/sky.png");
            _.forEach(GROUND_TILESETS, function(tilesetData) {
                game.load.image("tiles-"+tilesetData.name, tilesetData.location);
            });

            //ui panels
            game.load.image("ui-ActionPanel", "assets/ui/ui-action-panel.png");
            game.load.image("ui-PlayerPanel", "assets/ui/ui-player-panel.png");
            game.load.image("ui-PlayerPortrait", "assets/ui/ui-player-portrait.png");
            game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");
        },
        create: function() {
            console.log("Preloading game assets");

            this.game.state.start("Title");
        }
    };
})();
