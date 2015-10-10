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
        _.forEach(INGREDIENTS_DATA, function(ingredientData) {
            self.ingredientsCount[ingredientData.id] = Math.floor(Math.random()*20); //FOOBAR //0;
        });

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
