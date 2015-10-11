(function() {
    battleState.prototype.playerGatherResources = function(callback) {
        var totalIngredients, criticallyLowIngredients;

        totalIngredients = 0;
        criticallyLowIngredients = 0;
        _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
            totalIngredients += player.ingredientsCount[ingredientData.id];
            if (player.ingredientsCount[ingredientData.id] < 5) {
                criticallyLowIngredients += 1;
            }
        });

        var numIngs, message;
        if (totalIngredients < 20 || criticallyLowIngredients > 4) {
            //player really needs ings. he's likely going to get some
            if (Math.random() < 0.95) { //success
                numIngs = Math.floor(Math.pow(Math.random(), 1.5) * 6) + 6;
                message = "Just what you needed. Hopefully those monsters are ready, because it\'s no more Dr. Nice Guy!";
            } else { //fail
                numIngs = 0;
                message = "You desperately clutch something combustible, but everything within reach is depressingly non-flammable.";
            }
        } else if (totalIngredients < 40 || criticallyLowIngredients > 3) {
            //player probably has options, but not ideal one. decent chance to get some
            if (Math.random() < 0.65) { //success
                numIngs = Math.floor(Math.pow(Math.random(), 1.5) * 6) + 5;
                message = "Aha! These will do nicely. Now, what to make? A bomb? \nAn acid bomb? A bomb with little acid bombs inside?";
            } else { //fail
                numIngs = 0;
                message = "You doubt this bunny fluff and moldy cheese you found would produce a very impressive explosion.";
            }
        } else if (totalIngredients < 65 || criticallyLowIngredients > 2) {
            //player really doesn't need ings. low chance to get some
            if (Math.random() < 0.35) { //success
                numIngs = Math.floor(Math.pow(Math.random(), 1.5) * 5) + 5;
                message = "Check out all this stuff! \nBigger ingredients means bigger explosions, right?";
            } else { //fail
                numIngs = 0;
                message = "You\'ve got so many ingredients already. \nWhy aren\'t you blowing up those monsters right now?";
            }
        } else {
            //player has lots of ings. extremely rare chance to get some, but probably not
            if (Math.random() < 0.05) { //success
                numIngs = Math.floor(Math.pow(Math.random(), 1.5) * 5) + 4;
                message = "You somehow manage to find more ingredients to stuff into your already overflowing bags.";
            } else { //fail
                numIngs = 0;
                message = "Look at all these ingredients! Wait... nevermind. \nThose just fell out of your overflowing backpack.";
            }
        }

        //return list of ingredients gathered and message for user
        callback.apply(this, [numIngs, message]);

        this.takeMonsterTurn();
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
                    if (!monster.isDead) {
                        self.monsterHandleSpell(monster, recipeData, damageRoll);
                    }
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

        _.forEach(this.monsters, function(monster, idx) {
            var damageRoll, reducedAmount;

            //make sure the monster is still alive
            if (!monster.isDead) {
                //check turnDebt
                if (monster.turnDebt > 0) {
                    monster.turnDebt -= 1;
                } else {
                    //no turnDebt, can act
                    damageRoll = monster.damage * (1.0 + ((Math.random()*0.2)-0.1));

                    if (monster.damageType == "physical") {
                        //vs armor
                        reducedAmount = Math.max(1, Math.floor(damageRoll * (100/(100 + player.armor + player.armorMod))));
                        console.log(" - player - damage taken (physical): "+reducedAmount);
                        player.currentHP -= reducedAmount;
                    } else {
                        //vs resist
                        reducedAmount = Math.max(1, Math.floor(damageRoll * (100/(100 + player.resist + player.resistMod))));
                        console.log(" - player - damage taken (magic): "+reducedAmount);
                        player.currentHP -= reducedAmount;
                    }
                }
            }
        });

        this.resolveTurn();
    };
    battleState.prototype.resolveTurn = function() {
        var self = this;
        var loot = false;
        var numIngs;
        var allDead;

        console.log("resolving combat turn");

        //normalize monster armor and resist debuffs
        _.forEach(this.monsters, function(monster, idx) {
            monster.armorMod *= 0.6;
            monster.resistMod *= 0.6;
        });

        //check for monster deaths
        _.forEach(this.monsters, function(monster, idx) {
            if (!monster.isDead && monster.currentHP < 1) {
                console.log(" - monster ("+monster.type+") - is now dead");

                monster.isDead = true;

                //animate this monster away
                monster.sprite.animations.stop();
                monster.sprite.frame = 3;
                self.game.add.tween(monster.sprite)
                    .to({tint: 0xef1200}, 1500, Phaser.Easing.Quadratic.InOut, true);
                self.game.add.tween(monster.sprite)
                    .to({alpha: 0.0}, 1500, Phaser.Easing.Quadratic.Out, true, 1500);

                //award loot
                console.log("Player chose \"Gather\" command");

                //set up object if this is first loot awarded this round
                if (loot === false) {
                    loot = {};
                    _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
                        loot[ingredientData.id] = 0;
                    });
                }

                //standard loot
                numIngs = intBetween(5, 11); //5-10
                while(numIngs > 0) {
                    if (Math.random() < 0.7) { //70% chance to drop primary
                        loot[monster.dropPrimary] += 1;
                        numIngs -= 1;
                    } else { //30% chance to drop secondary
                        loot[monster.dropSecondary] += 1;
                        numIngs -= 1;
                    }
                }

                //bonus loot
                if (Math.random() < 0.1) { //10% chance to drop 1-2 bonus ings
                    loot[monster.dropBonus] += intBetween(1, 3);
                }
            }
        });

        //add loot to player count
        if (loot !== false) {
            _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
                player.ingredientsCount[ingredientData.id] += loot[ingredientData.id];
            });

            //update display
            this.gatherLabel.text = "Monsters dropped ingredients:";
            this.updateGatherResultsPanel(loot, "");
            this.gatherResultsPanel.visible = true;
            this.actionsPanel.visible = false;
        }

        //normalize player armor and resist buffs
        player.armorMod *= 0.6;
        player.resistMod *= 0.6;

        this.updatePlayerPanelDetails();

        //check for player death (loss condition)
        if (player.currentHP < 1) {
            //player dieded
            this.beginGameOverSequence();
        }

        //check for all monsters dead (victory condition)
        allDead = true;
        _.forEach(this.monsters, function(monster, idx) {
            allDead = allDead && monster.isDead;
        });
        if (allDead) {
            //seems like they're all dead, Jim
            this.beginVictorySequence();
        }
    };
})();
