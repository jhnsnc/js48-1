var battleState = function(game) {};

(function() {

    battleState.prototype = {
        //var monsters; //array of monster objects

        //var actionsPanel;

        //var scienceSelectPanel;

        //var ingredientsPanel;
        //var ingredientsDetails;

        //var researchResultsPanel;

        //var inspectPanel;
        //var inspectMonsterDetails;

        //var playerPanel;
        //var playerPanelDetails;

        create: function() {
            console.log("Starting Battle");

            var bgSky, bgGround, bgGroundHorizon, groundTileset;
            var tiles, bitmapData, grd;
            var x, y, w, h;


            //sky
            bgSky = this.game.add.sprite(0, 0, "background-Sky");
            bgSky.width = 1080;

            //ground tiles
            groundTileset = GROUND_TILESETS[ Math.floor(Math.random() * GROUND_TILESETS.length) ].name;
            tiles = new Phaser.Sprite(this.game, 0, 0, "tiles-"+groundTileset);
            bitmapData = new Phaser.BitmapData(this.game, "bitmapData-"+groundTileset, 240, 240);
            w = 48;
            h = 48;
            for (x = 0; x <= bitmapData.width; x += w) {
                for (y = 0; y <= bitmapData.height; y += h) { 
                    bitmapData.copy(tiles, w*Math.floor(Math.random()*4), 0, w, h, x, y);
                }
            }
            bitmapData.generateTexture("bg-"+groundTileset)
            bgGround = this.game.add.tileSprite(0, 200, 1080, 400, "bg-"+groundTileset);
            bgGround.tileScale.setTo(2.0, 2.0);

            //ground horizon gradient
            bitmapData = new Phaser.BitmapData(this.game, "bitmapData-GroundGradient", 1, 400);
            grd = bitmapData.context.createLinearGradient(0, 0, 1, 400);
            grd.addColorStop(0.00, "rgba(0,0,0,0.5)");
            grd.addColorStop(0.08, "rgba(0,0,0,0.2)");
            grd.addColorStop(0.20, "rgba(0,0,0,0.0)");
            grd.addColorStop(0.35, "rgba(0,0,0,0.2)");
            grd.addColorStop(1.00, "rgba(0,0,0,0.5)");
            bitmapData.rect(0, 0, 1, 400, grd);
            bitmapData.generateTexture("bg-GroundGradient");
            bgGroundHorizon = this.game.add.tileSprite(0, 200, 1080, 400, "bg-GroundGradient");

            //monsters
            this.setupMonsters([this.getRandomMonsterKey(), this.getRandomMonsterKey(), this.getRandomMonsterKey(), this.getRandomMonsterKey()]);

            //action panels
            this.setupActionsPanel();
            this.setupScienceSelectPanel();
            this.setupIngredientsPanel();
            this.setupResearchResultsPanel();
            this.setupInspectPanel();

            //play info panel
            this.setupPlayerPanel();

            //fullscreen toggle
            createFullscreenToggle(this);
        }
    };

})();
