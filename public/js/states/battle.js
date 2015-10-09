var battleState = function(game) {};

(function() {

    var monsterData = {
        "RedSlime": {
            spriteName: "monster-RedSlime",
            maxHP: 20,
            damage: 2,
            armor: 0
        },
        "BlackSpider": {
            spriteName: "monster-BlackSpider",
            maxHP: 10,
            damage: 3,
            armor: 1
        },
        "Goblin": {
            spriteName: "monster-Goblin",
            maxHP: 25,
            damage: 6,
            armor: 3
        },
        "Pixie": {
            spriteName: "monster-Pixie",
            maxHP: 30,
            damage: 4,
            armor: 2
        },
        "Skeleton": {
            spriteName: "monster-Skeleton",
            maxHP: 40,
            damage: 20,
            armor: 6
        },
        "MudGolem": {
            spriteName: "monster-MudGolem",
            maxHP: 50,
            damage: 15,
            armor: 10
        },
    }

    battleState.prototype = {
        //var monsterSprites; //group of sprites
        //var monsters; //array of monster objects
        //var player; //sprite

        preload: function() {
            this.game.load.image("ui-ActionPanel", "assets/ui/ui-action-panel.png");

            this.game.load.image("ui-PlayerPanel", "assets/ui/ui-player-panel.png");
            this.game.load.image("ui-PlayerPortrait", "assets/ui/ui-player-portrait.png");
        },
        create: function() {
            console.log("Starting Battle");

            var bgSky, bgGround;

            bgSky = this.game.add.sprite(0, 0, "background-Sky");
            bgSky.width = 1080;
            bgGround = this.game.add.graphics(0, 0);
            bgGround.beginFill(0x5a3c18, 0.9);
            bgGround.drawRect(0, 200, 1080, 400);
            bgGround.endFill();

            //TODO: remove this
            this.txtTitle = this.game.add.text(540, 70, 'Battle screen', {
                fill: '#ffffff',
                stroke: '#181818',
                strokeThickness: 5
            });
            this.txtTitle.font = 'Topaz';
            this.txtTitle.fontSize = 50;
            this.txtTitle.anchor.setTo(0.5, 0.5);
            //DO SOMETHING

            this.setupMonsters(["MudGolem", "BlackSpider", "RedSlime", "Goblin"]);

            this.setupActionPanel();
            this.setupPlayerPanel();
        },
        setupMonsters: function(monsterTypes) {
            console.log("creating monsters of type: " + monsterTypes.join(', '));

            var i, len;
            var sprite, monster;
            var positionVariationX = 37.5;
            var positionVariationY = 22.5;

            this.monsterSprites = this.game.add.group();
            this.monsterSprites.position.setTo(0, 200);
            this.monsters = [];

            //generate monsters
            len = (monsterTypes.length <= 4) ? monsterTypes.length : 4; //max 4 monsters per battle
            for (i = 0; i < len; i += 1) {
                if (typeof monsterTypes[i] === "string") {
                    //create sprite and start idle animation
                    sprite = this.monsterSprites.create(0, 0, monsterData[monsterTypes[i]].spriteName);
                    sprite.anchor.setTo(0.5, 0.5);
                    sprite.scale.setTo(4.0, 4.0);
                    sprite.animations.add('idle', [0,0,0,0,0,1,2,3,0,1,2,3], 8, true);
                    sprite.animations.play('idle');

                    //clone data, assign additional values
                    monster = _.clone(monsterData[monsterTypes[i]]);
                    monster.currentHP = monster.maxHP;

                    this.monsters.push(monster);
                }
            }

            //position sprites
            switch (this.monsterSprites.length) {
                case 1:
                    this.monsterSprites.getAt(0).position.setTo(540 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 2:
                    this.monsterSprites.getAt(0).position.setTo(390 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(1).position.setTo(550 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 3:
                    this.monsterSprites.getAt(0).position.setTo(290 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(1).position.setTo(540 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(2).position.setTo(790 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
                case 4:
                    this.monsterSprites.getAt(0).position.setTo(265.00 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(1).position.setTo(448.33 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(2).position.setTo(631.67 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    this.monsterSprites.getAt(3).position.setTo(815.00 + (Math.random()*2*positionVariationX)-positionVariationX, (Math.random()*2*positionVariationY)-positionVariationY);
                    break;
            }
        },
        setupActionPanel: function() {
            var panelBack;

            this.actionPanel = this.game.add.group();
            this.actionPanel.position.setTo(140, 300);

            panelBack = this.actionPanel.create(0, 0, "ui-ActionPanel");
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
        }
    };

})();
