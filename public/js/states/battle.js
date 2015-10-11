var battleState = function(game) {};

(function() {

    battleState.prototype = {
        //var monsters; //array of monster objects

        //var actionsPanel;

        //var scienceSelectPanel;
        //var recipeDetails;
        //var recipesData;
        //var scienceSelectPageNum;
        //var txtScienceSelectPageNum;

        //var ingredientsPanel;
        //var ingredientsDetails;

        //var gatherResultsPanel;
        //var gatherResultsDetails;
        //var gatherLabel;

        //var inspectPanel;
        //var inspectMonsterDetails;

        //var playerPanel;
        //var playerPanelDetails;

        //var selectTargetPanel;
        //var txtSelectedAbility;
        //var txtSelectedAbilityDescription;

        create: function() {
            console.log("Starting Battle");

            var bgSky, bgGround, bgGroundHorizon, groundTileset;
            var tiles, bitmapData, grd;
            var x, y, w, h;
            var gfxCover;

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
            this.setupGatherResultsPanel();
            this.setupInspectPanel();
            this.setupSelectTargetPanel();

            //player info panel
            this.setupPlayerPanel();

            //fade in cover graphic (black)
            gfxCover = this.game.add.graphics(0, 0);
            gfxCover.beginFill(0x000000, 1.0);
            gfxCover.drawRect(0, 0, 1080, 600);
            gfxCover.endFill();
            gfxCover.alpha = 1.0;
            this.game.add.tween(gfxCover)
                .to({alpha: 0.0}, 2500, Phaser.Easing.Sinusoidal.InOut, true)
                .onComplete.add(function() {
                    gfxCover.parent.removeChild(gfxCover);
                }, this);

            //fullscreen toggle
            createFullscreenToggle(this);
        }
    };

})();
