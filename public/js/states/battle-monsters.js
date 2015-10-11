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
                this.assignLevelAppropriateMonsterStats(monster, player.level /* monsters same level as player */);
                //this.assignLevelAppropriateMonsterStats(monster, Math.floor(Math.random()*4+1) /* random monster level */);
                monster.sprite = sprite;
                monster.type = monsterTypes[i];

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
        monsterData.isDead = false;
        //armor
        monsterData.armor = monsterData.armorBase + (monsterData.armorGrowth * level);
        monsterData.armorMod = 0;
        //resist
        monsterData.resist = monsterData.resistBase + (monsterData.resistGrowth * level);
        monsterData.resistMod = 0;
        //damage
        monsterData.damage = monsterData.damageBase + (monsterData.damageGrowth * level);
        //special
        monsterData.turnDebt = 1;
    };
    battleState.prototype.monsterHandleSpell = function(monster, recipeData, damageRoll) {
        //console.log("monster targeted recipe: ",damageRoll);
        //console.log(recipeData);
        var amount;

        if (recipeData.debuffMultiplier !== 0.0) { //debuff
            amount = Math.round(recipeData.debuffMultiplier * damageRoll);
            if (recipeData.debuffType === "physical" || recipeData.debuffType === "hybrid") {
                console.log(" - monster ("+monster.type+") - armor debuffed by "+amount);
                monster.armorMod -= amount;
            }
            if (recipeData.debuffType === "magic" || recipeData.debuffType === "hybrid") {
                console.log(" - monster ("+monster.type+") - resist debuffed by "+amount);
                monster.resistMod -= amount;
            }
        }
        //skip buff for enemies
        //skip heal for enemies
        if (recipeData.inflictTurnDebt !== 0) { //turnDebt
            amount = recipeData.inflictTurnDebt;
            console.log(" - monster ("+monster.type+") - turn debt increased by "+amount);
            monster.turnDebt += amount;
        }
        if (recipeData.damageMultiplier !== 0.0) { //damage
            amount = recipeData.damageMultiplier * damageRoll;
            if (recipeData.target === "enemy-all") { // AoE damage is 40% of base single-target damage
                amount *= 0.4;
            }
            var reducedAmount = 0;

            if (recipeData.damageType === "physical" || recipeData.damageType === "hybrid") {
                reducedAmount += amount * (100/(100 + monster.armor + monster.armorMod));
            }
            if (recipeData.damageType === "magic" || recipeData.damageType === "hybrid") {
                reducedAmount += amount * (100/(100 + monster.resist + monster.resistMod));
            }
            reducedAmount = Math.round(reducedAmount);
            console.log(" - monster ("+monster.type+") - damage taken: "+reducedAmount);
            monster.currentHP -= reducedAmount;
        }
    };
})();
