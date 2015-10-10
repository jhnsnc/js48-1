(function() {
    battleState.prototype.setupMonsters = function(monsterTypes) {
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
                this.assignLevelAppropriateMonsterStats(monster, Math.floor(Math.random()*4+1) /* monster level */);
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
    };
    battleState.prototype.getRandomMonsterKey = function() {
        var keys = _.keys(MONSTER_DATA);
        return keys[Math.floor(Math.random()*keys.length)];
    };
    battleState.prototype.assignLevelAppropriateMonsterStats = function(monsterData, level) {
        level = Math.round(level);
        monsterData.level = level;
        //hp
        monsterData.maxHP = monsterData.hpBase + (monsterData.hpGrowth * level);
        monsterData.currentHP = monsterData.maxHP;
        //armor
        monsterData.armor = monsterData.armorBase + (monsterData.armorGrowth * level);
        monsterData.armorMod = 0;
        //resist
        monsterData.resist = monsterData.resistBase + (monsterData.resistGrowth * level);
        monsterData.resistMod = 0;
        //damage
        monsterData.damage = monsterData.damageBase + (monsterData.damageGrowth * level);
        //special
        monsterData.turnDebt = 0;
    };
})();
