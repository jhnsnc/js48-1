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

    function init() {
        //try to load from local storage
        //TODO

        //default values
        self.ingredientsCount = {};
        var i, ingAlloc = 30;
        _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
            self.ingredientsCount[ingredientData.id] = 0;
        });
        while(ingAlloc > 0) {
            var randType = INGREDIENTS_DATA[intBetween(0,INGREDIENTS_DATA.length)].id;
            if (self.ingredientsCount[randType] < 8) { //8 = max starting ing count per type
                self.ingredientsCount[randType] += 1;
                ingAlloc -= 1;
            }
        }

        //base stats
        self.level = 0;
        self.maxHP = 20;
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
        self.level += 1;

        var statAlloc = 8; //8 points distributed between armor, resist, and HP (1 point = 2 HP, or 1 armor/resist)
        while(statAlloc > 0) {
            switch(intBetween(0,3)) {
                case 0:
                    self.maxHP + 2;
                    statAlloc -= 1;
                    break;
                case 1:
                    self.armor + 1;
                    statAlloc -= 1;
                    break;
                case 2:
                    self.resist + 1;
                    statAlloc -= 1;
                    break;
            }
        }
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
        } else if (self.currentHP < 0) {
            self.currentHP = 0;
        }
        self.currentHP = Math.floor(self.currentHP);
    }

    init();
    return self;
}());
