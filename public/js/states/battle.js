var battleState = function(game) {};

(function() {

    var MONSTER_DATA = {
        "RedSlime": {
            spriteName: "monster-RedSlime",
            maxHP: 20,
            strength: 2,
            armor: 0
        },
        "BlackSpider": {
            spriteName: "monster-BlackSpider",
            maxHP: 10,
            strength: 3,
            armor: 1
        },
        "Goblin": {
            spriteName: "monster-Goblin",
            maxHP: 25,
            strength: 6,
            armor: 3
        },
        "Pixie": {
            spriteName: "monster-Pixie",
            maxHP: 30,
            strength: 4,
            armor: 2
        },
        "Skeleton": {
            spriteName: "monster-Skeleton",
            maxHP: 40,
            strength: 20,
            armor: 6
        },
        "MudGolem": {
            spriteName: "monster-MudGolem",
            maxHP: 50,
            strength: 15,
            armor: 10
        },
    };
    var GROUND_TILESETS = [
        /*{
            name: "CrustedGround",
            location: "assets/tiles/ground_crusted.png"
        },*/
        {
            name: "BrownDirt",
            location: "assets/tiles/ground_dirt_brown.png"
        }
    ];

    battleState.prototype = {
        //var groundTileset;
        //var monsters; //array of monster objects
        //var player; //sprite
        //var actionsPanel;
        //var playerPanel;
        //var scienceSelectPanel;
        //var ingredientsPanel;
        //var researchResultsPanel;
        //var inspectPanel;
        //var inspectMonsterDetails;

        preload: function() {
            this.groundTileset = GROUND_TILESETS[ Math.floor(Math.random() * GROUND_TILESETS.length) ];

            this.game.load.image("ui-ActionPanel", "assets/ui/ui-action-panel.png");

            this.game.load.image("ui-PlayerPanel", "assets/ui/ui-player-panel.png");
            this.game.load.image("ui-PlayerPortrait", "assets/ui/ui-player-portrait.png");

            //this.game.load.image("tiles-CrustedGround", "assets/tiles/ground_crusted.png");
            this.game.load.image("tiles-"+this.groundTileset.name, this.groundTileset.location);
        },
        create: function() {
            console.log("Starting Battle");

            var bgSky, bgGround, bgGroundHorizon;
            var tiles, bitmapData, grd;
            var x, y, w, h;

            //sky
            bgSky = this.game.add.sprite(0, 0, "background-Sky");
            bgSky.width = 1080;

            //ground tiles
            tiles = new Phaser.Sprite(this.game, 0, 0, "tiles-"+this.groundTileset.name);
            bitmapData = new Phaser.BitmapData(this.game, "bitmapData-"+this.groundTileset.name, 240, 240);
            w = 48;
            h = 48;
            for (x = 0; x <= bitmapData.width; x += w) {
                for (y = 0; y <= bitmapData.height; y += h) { 
                    bitmapData.copy(tiles, w*Math.floor(Math.random()*4), 0, w, h, x, y);
                }
            }
            bitmapData.generateTexture("bg-"+this.groundTileset.name)
            bgGround = this.game.add.tileSprite(0, 200, 1080, 400, "bg-"+this.groundTileset.name);
            bgGround.tileScale.setTo(2.0, 2.0);

            //ground horizon gradient
            bitmapData = new Phaser.BitmapData(this.game, "bitmapData-GroundGradient", 1, 400);
            grd = bitmapData.context.createLinearGradient(0, 0, 1, 400);
            grd.addColorStop(0.0, "rgba(0,0,0,0.5)");
            grd.addColorStop(0.2, "rgba(0,0,0,0.2)");
            grd.addColorStop(1.0, "rgba(0,0,0,0.0)");
            bitmapData.rect(0, 0, 1, 400, grd);
            bitmapData.generateTexture("bg-GroundGradient");
            bgGroundHorizon = this.game.add.tileSprite(0, 200, 1080, 400, "bg-GroundGradient");

            //monsters
            this.setupMonsters(["Pixie", "BlackSpider", "Skeleton", "Goblin"]);

            //action panels
            this.setupActionsPanel();
            this.setupScienceSelectPanel();
            this.setupIngredientsPanel();
            this.setupResearchResultsPanel();
            this.setupInspectPanel();

            //play info panel
            this.setupPlayerPanel();
        },
        setupMonsters: function(monsterTypes) {
            console.log("creating monsters of type: " + monsterTypes.join(', '));

            var i, len;
            var sprite, monster, monsterSprites;
            var positionVariationX = 37.5;
            var positionVariationY = 22.5;

            monsterSprites = this.game.add.group();
            monsterSprites.position.setTo(0, 200);
            this.monsters = [];

            //generate monsters
            len = (monsterTypes.length <= 4) ? monsterTypes.length : 4; //max 4 monsters per battle
            for (i = 0; i < len; i += 1) {
                if (typeof monsterTypes[i] === "string") {
                    //create sprite and start idle animation
                    sprite = monsterSprites.create(0, 0, MONSTER_DATA[monsterTypes[i]].spriteName);
                    sprite.anchor.setTo(0.5, 0.5);
                    sprite.scale.setTo(4.0, 4.0);
                    sprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
                    sprite.animations.play('idle');

                    //clone data, assign additional values
                    monster = _.clone(MONSTER_DATA[monsterTypes[i]]);
                    monster.currentHP = monster.maxHP;
                    monster.sprite = sprite;

                    this.monsters.push(monster);
                }
            }

            //position sprites
            switch (this.monsters.length) {
                case 1:
                    this.monsters[0].sprite.position.setTo(540 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 2:
                    this.monsters[0].sprite.position.setTo(390 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[1].sprite.position.setTo(550 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 3:
                    this.monsters[0].sprite.position.setTo(290 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[1].sprite.position.setTo(540 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[2].sprite.position.setTo(790 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 4:
                    this.monsters[0].sprite.position.setTo(265.00 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[1].sprite.position.setTo(448.33 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[2].sprite.position.setTo(631.67 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsters[3].sprite.position.setTo(815.00 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
            }
        },
        setupActionsPanel: function() {
            var panelBack;
            var btnScience, btnIngredients, btnResearch, btnInspect;

            this.actionsPanel = this.game.add.group();
            this.actionsPanel.position.setTo(140, 300);

            panelBack = this.actionsPanel.create(0, 0, "ui-ActionPanel");

            btnScience = createGameText({
                x: 30, y: 35,
                text: 'MAD SCIENCE!',
                fontSize: 45
            }, this);
            this.actionsPanel.add(btnScience);
            btnScience.inputEnabled = true;
            btnScience.input.useHandCursor = true;
            btnScience.events.onInputDown.add(this.handleScience, this);

            btnIngredients = createGameText({
                x: 30, y: 95,
                text: 'Ingredients',
                fontSize: 45
            }, this);
            this.actionsPanel.add(btnIngredients);
            btnIngredients.inputEnabled = true;
            btnIngredients.input.useHandCursor = true;
            btnIngredients.events.onInputDown.add(this.handleIngredients, this);

            btnResearch = createGameText({
                x: 30, y: 155,
                text: 'Research',
                fontSize: 45
            }, this);
            this.actionsPanel.add(btnResearch);
            btnResearch.inputEnabled = true;
            btnResearch.input.useHandCursor = true;
            btnResearch.events.onInputDown.add(this.handleResearch, this);

            btnInspect = createGameText({
                x: 30, y: 215,
                text: 'Inspect',
                fontSize: 45
            }, this);
            this.actionsPanel.add(btnInspect);
            btnInspect.inputEnabled = true;
            btnInspect.input.useHandCursor = true;
            btnInspect.events.onInputDown.add(this.handleInspect, this);
        },
        setupScienceSelectPanel: function() {
            var panelBack;
            var txtPlaceholder;

            this.scienceSelectPanel = this.game.add.group();
            this.scienceSelectPanel.position.setTo(140, 300);

            panelBack = this.scienceSelectPanel.create(0, 0, "ui-ActionPanel");

            //DUMMY: add placeholder text
            txtPlaceholder = createGameText({
                x: 30, y: 30,
                text: 'Select reaction:',
                fontSize: 35
            }, this);
            this.scienceSelectPanel.add(txtPlaceholder);

            //hide panel on click (and show actions panel)
            panelBack.inputEnabled = true;
            panelBack.input.useHandCursor = true;
            panelBack.events.onInputDown.add(function dismissPanel(evt) {
                this.scienceSelectPanel.visible = false;
                this.actionsPanel.visible = true;
            }, this);

            //hidden by default
            this.scienceSelectPanel.visible = false;
        },
        setupIngredientsPanel: function() {
            var panelBack;
            var txtPlaceholder;

            this.ingredientsPanel = this.game.add.group();
            this.ingredientsPanel.position.setTo(140, 300);

            panelBack = this.ingredientsPanel.create(0, 0, "ui-ActionPanel");

            //DUMMY: add placeholder text
            txtPlaceholder = createGameText({
                x: 30, y: 30,
                text: 'Ingredients inventory:',
                fontSize: 35
            }, this);
            this.ingredientsPanel.add(txtPlaceholder);

            //hide panel on click (and show actions panel)
            panelBack.inputEnabled = true;
            panelBack.input.useHandCursor = true;
            panelBack.events.onInputDown.add(function dismissPanel(evt) {
                this.ingredientsPanel.visible = false;
                this.actionsPanel.visible = true;
            }, this);

            //hidden by default
            this.ingredientsPanel.visible = false;
        },
        setupResearchResultsPanel: function() {
            var panelBack;
            var txtPlaceholder;

            this.researchResultsPanel = this.game.add.group();
            this.researchResultsPanel.position.setTo(140, 300);

            panelBack = this.researchResultsPanel.create(0, 0, "ui-ActionPanel");

            //DUMMY: add placeholder text
            txtPlaceholder = createGameText({
                x: 30, y: 30,
                text: 'Research results:',
                fontSize: 35
            }, this);
            this.researchResultsPanel.add(txtPlaceholder);

            //hide panel on click (and show actions panel)
            panelBack.inputEnabled = true;
            panelBack.input.useHandCursor = true;
            panelBack.events.onInputDown.add(function dismissPanel(evt) {
                this.researchResultsPanel.visible = false;
                this.actionsPanel.visible = true;
            }, this);

            //hidden by default
            this.researchResultsPanel.visible = false;
        },
        setupInspectPanel: function() {
            var panelBack;
            var txtInstructions;

            this.inspectPanel = this.game.add.group();
            this.inspectPanel.position.setTo(140, 300);

            panelBack = this.inspectPanel.create(0, 0, "ui-ActionPanel");

            //instructions text
            txtInstructions = createGameText({
                x: 30, y: 30,
                text: 'Inspect monster:',
                fontSize: 35
            }, this);
            this.inspectPanel.add(txtInstructions);

            //hide panel on click (and show actions panel)
            panelBack.inputEnabled = true;
            panelBack.input.useHandCursor = true;
            panelBack.events.onInputDown.add(function dismissPanel(evt) {
                this.disableMonsterInspection();
                this.inspectPanel.visible = false;
                this.actionsPanel.visible = true;
            }, this);

            //add monster details subgroup
            this.inspectMonsterDetails = this.game.add.group();
            this.inspectMonsterDetails.position.setTo(30, 90);
            this.inspectPanel.add(this.inspectMonsterDetails);

            //hidden by default
            this.inspectPanel.visible = false;
        },
        setupPlayerPanel: function() {
            var panelBack, portrait, txtHp;

            this.playerPanel = this.game.add.group();
            this.playerPanel.position.setTo(640, 300);

            panelBack = this.playerPanel.create(0, 0, "ui-PlayerPanel");
            portrait = this.playerPanel.create(30, 30, "ui-PlayerPortrait");
            portrait.scale.setTo(1.5, 1.5);

            txtHp = this.game.add.text(115, 30, 'HP:', {
                fill: '#ffffff',
                stroke: '#181818',
                strokeThickness: 5
            });
            txtHp.font = 'Topaz';
            txtHp.fontSize = 30;
            this.playerPanel.add(txtHp);
        },
        handleScience: function(evt) {
            console.log("Player chose \"MAD SCIENCE!\" command");
            this.scienceSelectPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleIngredients: function(evt) {
            console.log("Player chose \"ingredients\" command");
            this.ingredientsPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleResearch: function(evt) {
            console.log("Player chose \"research\" command");
            this.researchResultsPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleInspect: function(evt) {
            console.log("Player chose \"inspect\" command");
            this.enableMonsterInspection();
            this.inspectPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        enableMonsterInspection: function() {
            var self = this;

            //wipe inspection display for monsters
            this.inspectMonster.apply(self, []);

            //enable click events for all monsters
            _.forEach(self.monsters, function(monster) {
                monster.sprite.inputEnabled = true;
                monster.sprite.input.useHandCursor = true;
                monster.sprite.events.onInputDown.add(function(target) {
                    //on click
                    var targetMonsterData = _.find(self.monsters, function test(monster) {
                        return monster.sprite.z === target.z;
                    }, this);
                    self.inspectMonster.apply(self, [targetMonsterData]);
                }, this);
            });
        },
        disableMonsterInspection: function() {
            //disable click events for all monsters
            _.forEach(this.monsters, function(monster) {
                monster.sprite.events.onInputDown.removeAll(this);
                monster.sprite.input.useHandCursor = false;
                monster.sprite.inputEnabled = true;
            });
        },
        inspectMonster: function(targetMonsterData) {
            this.inspectMonsterDetails.removeAll();

            if (typeof targetMonsterData !== "undefined") {
                var monsterPortrait;
                var txtHP, txtStrength, txtArmor;

                //create monster portrait
                monsterPortrait = this.inspectMonsterDetails.create(0, 10, targetMonsterData.spriteName);
                monsterPortrait.scale.setTo(2.0, 2.0);

                //add text details
                txtHP = createGameText({
                    x: 110, y: 0,
                    text: 'HP: ' + targetMonsterData.currentHP + '/' + targetMonsterData.maxHP,
                    fontSize: 30
                }, this);
                txtStrength = createGameText({
                    x: 110, y: 40,
                    text: 'Strength: ' + targetMonsterData.strength,
                    fontSize: 30
                }, this);
                txtArmor = createGameText({
                    x: 110, y: 80,
                    text: 'Armor: ' + targetMonsterData.armor,
                    fontSize: 30
                }, this);

                //add to subgroup
                this.inspectMonsterDetails.add(txtHP);
                this.inspectMonsterDetails.add(txtStrength);
                this.inspectMonsterDetails.add(txtArmor);
            }
        }
    };

})();
