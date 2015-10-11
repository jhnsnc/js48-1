var player = (function() {
    var self = {};

    self.ingredientsCount;

    self.level;

    self.currentHP;
    self.maxHP;
    self.armor;
    self.armorMod;
    self.resist;
    self.resistMod;

    self.init = function() {
        //try to load from local storage
        //TODO

        //default values
        self.ingredientsCount = {};
        var i, ingAlloc = 26;
        _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
            self.ingredientsCount[ingredientData.id] = 0;
        });
        while(ingAlloc > 0) {
            var randType = INGREDIENTS_DATA[intBetween(0,INGREDIENTS_DATA.length)].id;
            if (self.ingredientsCount[randType] < 7) { //8 = max starting ing count per type
                self.ingredientsCount[randType] += 1;
                ingAlloc -= 1;
            }
        }

        //base stats
        self.level = 0;
        self.maxHP = 60;
        self.armor = 3;
        self.resist = 5;

        //level 0 -> 1
        self.levelUp();

        //derivative stats/temps
        self.currentHP = self.maxHP;
        self.armorMod = 0;
        self.resistMod = 0;
    }

    self.levelUp = function() {
        console.log("level up");

        self.level += 1;

        var statAlloc = 15; //10 points distributed between armor, resist, and HP (1 point = 2 HP, or 1 armor/resist)
        while(statAlloc > 0) {
            switch(intBetween(0,3)) {
                case 0:
                    self.maxHP += 5;
                    statAlloc -= 1;
                    break;
                case 1:
                    self.armor += 2;
                    statAlloc -= 1;
                    break;
                case 2:
                    self.resist += 2;
                    statAlloc -= 1;
                    break;
            }
        }

        self.currentHP = self.maxHP;
    }

    self.save = function() {
        //TODO?
    };

    self.damageRoll = function() {
        return (1.0 + ((Math.random()*0.2)-0.1)) * (10 + 10 * self.level);
    }

    self.clampHP = function() {
        if (self.currentHP > self.maxHP) {
            self.currentHP = self.maxHP;
        }
        self.currentHP = Math.floor(self.currentHP);
    }

    self.handleSelfSpell = function(recipeData, damageRoll, battle) {
        //console.log("self targeted recipe: ",damageRoll);
        //console.log(recipeData);

        var buffIndicator, healIndicator;

        //skip debuff for self
        if (recipeData.buffMultiplier !== 0.0) { //buff
            if (recipeData.buffType === "physical" || recipeData.buffType === "hybrid") {
                amount = Math.ceil(recipeData.buffMultiplier * damageRoll);
                console.log(" - player - armor buffed by "+amount);
                self.armorMod += amount;
            }
            if (recipeData.buffType === "magic" || recipeData.buffType === "hybrid") {
                amount = Math.ceil(recipeData.buffMultiplier * damageRoll);
                console.log(" - player - resist buffed by "+amount);
                self.resistMod += amount;
            }

            //visually show buff
            if (amount > 0) {
                buffIndicator = createGameText({
                    x: 30, y: 10,
                    text: amount,
                    fontSize: 40,
                    fill: '#751ac1',
                    strokeThickness: 8
                }, battle);
                buffIndicator.anchor.setTo(0.5, 0.5);
                battle.playerPanel.addChild(buffIndicator);
                battle.game.add.tween(buffIndicator)
                    .to({y: -30, alpha: 0.0}, 2500, Phaser.Easing.Sinusoidal.Out, true)
                    .onComplete.add(function() {
                        buffIndicator.parent.removeChild(buffIndicator);
                    }, battle);
            }
        }
        if (recipeData.healMultiplier !== 0.0) { //heal
            amount = Math.ceil(recipeData.healMultiplier * damageRoll);
            console.log(" - player - healed by "+amount);
            self.currentHP += amount;

            //visually show heal
            if (amount > 0) {
                healIndicator = createGameText({
                    x: 80, y: 40,
                    text: amount,
                    fontSize: 40,
                    fill: '#11c311',
                    strokeThickness: 8
                }, battle);
                healIndicator.anchor.setTo(0.5, 0.5);
                battle.playerPanel.addChild(healIndicator);
                battle.game.add.tween(healIndicator)
                    .to({y: 0, alpha: 0.0}, 2500, Phaser.Easing.Sinusoidal.Out, true)
                    .onComplete.add(function() {
                        healIndicator.parent.removeChild(healIndicator);
                    }, battle);
            }
        }
        //skip turnDebt for self
        //skip damage for self
    };

    self.init();
    return self;
}());
