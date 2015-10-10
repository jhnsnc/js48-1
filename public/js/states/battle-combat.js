(function() {
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
                console.log("selected ability targets a single monster - user prompted to select");
                //TODO: PLAYER NEEDS TO SPECIFY A TARGET
                break;
            case "enemy-all":
                console.log("selected ability targets all monsters");
                if (recipeData.debuffMultiplier !== 0.0) { //debuff
                    amount = Math.round(recipeData.debuffMultiplier * damageRoll);
                    _.forEach(this.monsters, function(monster, idx) {
                        if (recipeData.damageType === "physical" || recipeData.damageType === "hybrid") {
                            console.log(" - monster ("+(idx+1)+") - armor debuffed by "+amount);
                            monster.armorMod += amount;
                        }
                        if (recipeData.damageType === "magic" || recipeData.damageType === "hybrid") {
                            console.log(" - monster ("+(idx+1)+") - resist debuffed by "+amount);
                            monster.resistMod += amount;
                        }
                    });
                }
                //skip buff for enemies
                //skip heal for enemies
                if (recipeData.inflictTurnDebt !== 0) { //turnDebt
                    amount = recipeData.inflictTurnDebt;
                    _.forEach(this.monsters, function(monster, idx) {
                        console.log(" - monster ("+(idx+1)+") - turn debt increased by "+amount);
                        monster.turnDebt += amount;
                    });
                }
                if (recipeData.damageMultiplier !== 0.0) { //damage
                    amount = recipeData.damageMultiplier * damageRoll;
                    _.forEach(this.monsters, function(monster, idx) {
                        var reducedAmount = 0;

                        if (recipeData.damageType === "physical" || recipeData.damageType === "hybrid") {
                            reducedAmount += amount * (100/(100 + monster.armor + monster.armorMod));
                        }
                        if (recipeData.damageType === "magic" || recipeData.damageType === "hybrid") {
                            reducedAmount += amount * (100/(100 + monster.resist + monster.resistMod));
                        }
                        reducedAmount = Math.round(reducedAmount);
                        console.log(" - monster ("+(idx+1)+") - damage taken: "+reducedAmount);
                        monster.currentHP -= reducedAmount;
                    });
                }
                break;
            case "self":
                console.log("selected ability targets the player");
                //skip debuff for self
                if (recipeData.buffMultiplier !== 0.0) { //buff
                    if (recipeData.buffType === "physical" || recipeData.buffType === "hybrid") {
                        amount = Math.ceil(recipeData.buffMultiplier * damageRoll);
                        console.log(" - player - armor buffed by "+amount);
                        player.armorMod += amount;
                    }
                    if (recipeData.buffType === "magic" || recipeData.buffType === "hybrid") {
                        amount = Math.ceil(recipeData.buffMultiplier * damageRoll);
                        console.log(" - player - resist buffed by "+amount);
                        player.resistMod += amount;
                    }
                }
                if (recipeData.healMultiplier !== 0.0) { //heal
                    amount = Math.ceil(recipeData.healMultiplier * damageRoll);
                    console.log(" - player - healed by "+amount);
                    player.currentHP += amount;
                    player.clampHP();
                }
                //skip turnDebt for self
                //skip damage for self
                break;
        }

        this.takeMonsterTurn();
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
