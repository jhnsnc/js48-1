var player = (function() {
    var self = {};

    self.ingredientsCount;

    self.currentHP;
    self.maxHP;
    self.baseStrength;
    self.tempStrength;
    self.baseArmor;
    self.tempArmor;

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

        self.maxHP = 20;
        self.currentHP = self.maxHP;

        self.baseStrength = 3;
        self.tempStrength = 0;

        self.baseArmor = 1;
        self.tempArmor = 0;
    }

    self.save = function() {
        //
    };

    init();
    return self;
}());
