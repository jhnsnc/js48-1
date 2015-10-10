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
            this.setupMonsters(["Pixie", "BlackSpider", "Skeleton", "Goblin"]);

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
        },
        setupMonsters: function(monsterTypes) {
            console.log("creating monsters of type: " + monsterTypes.join(', '));

            var i, len;
            var sprite, monster, monsterSprites;
            var positionVariationX = 25;
            var positionVariationY = 20;

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

                    //stagger monster animation start
                    setTimeout(function(idx) {
                        this.monsters[idx].sprite.animations.play('idle');
                    }.bind(this, i), i*(1500/len) + 250*Math.random());

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
            var txtLabel;

            this.scienceSelectPanel = this.game.add.group();
            this.scienceSelectPanel.position.setTo(140, 300);

            panelBack = this.scienceSelectPanel.create(0, 0, "ui-ActionPanel");

            //heading text
            txtLabel = createGameText({
                x: 30, y: 30,
                text: 'Select reaction:',
                fontSize: 35
            }, this);
            this.scienceSelectPanel.add(txtLabel);

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
            var txtLabel;

            this.ingredientsPanel = this.game.add.group();
            this.ingredientsPanel.position.setTo(140, 300);

            panelBack = this.ingredientsPanel.create(0, 0, "ui-ActionPanel");

            //heading text
            txtLabel = createGameText({
                x: 30, y: 30,
                text: 'Ingredients inventory:',
                fontSize: 35
            }, this);
            this.ingredientsPanel.add(txtLabel);

            //hide panel on click (and show actions panel)
            panelBack.inputEnabled = true;
            panelBack.input.useHandCursor = true;
            panelBack.events.onInputDown.add(function dismissPanel(evt) {
                this.ingredientsPanel.visible = false;
                this.actionsPanel.visible = true;
            }, this);

            //add ingredients details subgroup
            this.ingredientsDetails = this.game.add.group();
            this.ingredientsDetails.position.setTo(30, 90);
            this.ingredientsPanel.add(this.ingredientsDetails);

            //hidden by default
            this.ingredientsPanel.visible = false;
        },
        setupResearchResultsPanel: function() {
            var panelBack;
            var txtLabel;

            this.researchResultsPanel = this.game.add.group();
            this.researchResultsPanel.position.setTo(140, 300);

            panelBack = this.researchResultsPanel.create(0, 0, "ui-ActionPanel");

            //heading text
            txtLabel = createGameText({
                x: 30, y: 30,
                text: 'Research results:',
                fontSize: 35
            }, this);
            this.researchResultsPanel.add(txtLabel);

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
            var txtLabel;

            this.inspectPanel = this.game.add.group();
            this.inspectPanel.position.setTo(140, 300);

            panelBack = this.inspectPanel.create(0, 0, "ui-ActionPanel");

            //heading text
            txtLabel = createGameText({
                x: 30, y: 30,
                text: 'Inspect monster:',
                fontSize: 35
            }, this);
            this.inspectPanel.add(txtLabel);

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
            this.inspectMonsterDetails.position.setTo(30 + 60, 90 + 20);
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

            this.playerPanelDetails = this.game.add.group();
            this.playerPanelDetails.position.setTo(30, 30);
            this.playerPanel.add(this.playerPanelDetails);

            this.updatePlayerPanelDetails();
        },
        updatePlayerPanelDetails: function() {
            var text;
            var txtHP, txtStrength, txtArmor;

            //HP
            text = "HP: " + player.currentHP + "/" + player.maxHP;
            txtHP = createGameText({
                x: 85, y: 0,
                text: text,
                fontSize: 30
            }, this);

            //strength
            text = "Strength: " + player.baseStrength;
            if (player.tempStrenth > 0) {
                text += " (+" + Math.abs(player.tempStrength) + ")";
            } else if (player.tempStrenth < 0) {
                text += " (-" + Math.abs(player.tempStrength) + ")";
            }
            txtStrength = createGameText({
                x: 0, y: 85,
                text: text,
                fontSize: 30
            }, this);

            //armor
            text = "Armor: " + player.baseArmor;
            if (player.tempStrenth > 0) {
                text += " (+" + Math.abs(player.tempArmor) + ")";
            } else if (player.tempStrenth < 0) {
                text += " (-" + Math.abs(player.tempArmor) + ")";
            }
            txtArmor = createGameText({
                x: 0, y: 125,
                text: text,
                fontSize: 30
            }, this);

            //update details with new elements
            this.playerPanelDetails.removeAll();
            this.playerPanelDetails.add(txtHP);
            this.playerPanelDetails.add(txtStrength);
            this.playerPanelDetails.add(txtArmor);
        },
        handleScience: function(evt) {
            console.log("Player chose \"MAD SCIENCE!\" command");
            this.scienceSelectPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleIngredients: function(evt) {
            console.log("Player chose \"Ingredients\" command");
            this.updateIngredientsPanel();
            this.ingredientsPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleResearch: function(evt) {
            console.log("Player chose \"Research\" command");
            this.researchResultsPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        handleInspect: function(evt) {
            console.log("Player chose \"Inspect\" command");
            this.enableMonsterInspection();
            this.inspectPanel.visible = true;
            this.actionsPanel.visible = false;
        },
        updateIngredientsPanel: function() {
            var txtFields = [];
            var images = [];
            var numIngs = INGREDIENTS_DATA.length;
            var self = this;

            //prep text fields and images
            _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
                var textField, image;

                textField = createGameText({
                    x: 200*Math.floor(idx%2) + 100, y: Math.floor(idx/2)*60 + 10,
                    text: 'x ' + player.ingredientsCount[ingredientData.id],
                    fontSize: 30
                }, self);
                txtFields.push( textField );

                image = self.game.add.sprite(200*Math.floor(idx%2) + 12, Math.floor(idx/2)*60 - 22, ingredientData.spriteName);
                image.scale.setTo(2.0, 2.0);
                images.push(image);
            });

            //remove/add elements
            this.ingredientsDetails.removeAll();
            _.forEach(txtFields, function(textField) {
                self.ingredientsDetails.add(textField);
            });
            _.forEach(images, function(image) {
                self.ingredientsDetails.add(image);
            });
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
