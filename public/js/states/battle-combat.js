(function() {
    battleState.prototype.playerGatherResources = function(reactionId) {
        var totalIngredients, criticallyLowIngredients;

        totalIngredients = 0;
        criticallyLowIngredients = 0;
        _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
            totalIngredients += player.ingredientsCount[ingredientData.id];
            if (player.ingredientsCount[ingredientData.id] < 4) {
                criticallyLowIngredients += 1;
            }
        });


        if (totalIngredients < 20 || criticallyLowIngredients > 4) {
        } else if (totalIngredients > 50 || criticallyLowIngredients > 3) {
        } else if (totalIngredients > 80 || criticallyLowIngredients > 2) {
        } else {
            //player has lots of ings. extremely rare chance to get some, but probably not
            if (Math.random() < 0.01) { //success
                return {
                    ingredients: {},
                    message: "You somehow manage to find more ingredients to stuff into your already overflowing bags."
                };
            } else { //fail
                return {
                    ingredients: {},
                    message: "You\'ve got so many ingredients already. Aren\'t you itching to blow up those monsters?"
                };
            }
        }

        //return list of ingredients gathered and message for user
        //TODO
        return 
    };
    battleState.prototype.useReaction = function(reactionId) {
        var self = this;
        var recipeData = _.findWhere(RECIPES_DATA,{id: reactionId});

        console.log("user selected reaction: "+recipeData.displayName+' ('+reactionId+')');

        //deduct cost of recipe from ingredients count
        player.ingredientsCount[recipeData.ingredientTypeA] -= recipeData.ingredientCostA;
        player.ingredientsCount[recipeData.ingredientTypeB] -= recipeData.ingredientCostB;

        //process effects
        var damageRoll = player.damageRoll();
        var amount;
        switch (recipeData.target) {
            case "enemy-single":
                console.log("selected ability targets a single monster");
                this.showSelectTargetDialog(recipeData.displayName, recipeData.descriptionText, function(monster) {
                    self.monsterHandleSpell(monster, recipeData, damageRoll);
                    self.takeMonsterTurn();
                });
                break;
            case "enemy-all":
                console.log("selected ability targets all monsters");
                _.forEach(this.monsters, function(monster) {
                    self.monsterHandleSpell(monster, recipeData, damageRoll);
                });
                self.takeMonsterTurn();
                break;
            case "self":
                console.log("selected ability targets the player");
                player.handleSelfSpell(recipeData, damageRoll);
                self.takeMonsterTurn();
                break;
        }
    };
    battleState.prototype.takeMonsterTurn = function() {
        console.log("monsters retaliate");

        this.resolveTurn();
    };
    battleState.prototype.resolveTurn = function() {
        console.log("resolving combat turn");

        //normalize armor and resist buffs/debuffs
        //TODO

        this.updatePlayerPanelDetails();
    };
})();
