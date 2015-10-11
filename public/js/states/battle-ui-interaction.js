(function() {
    battleState.prototype.updatePlayerPanelDetails = function() {
        var text;
        var txtHP, txtLevel, txtArmor, txtResist;

        //HP
        text = "HP: " + player.currentHP + "/" + player.maxHP;
        txtHP = createGameText({
            x: 0, y: 200,
            text: text,
            fontSize: 30
        }, this);

        //level
        text = "Level: " + player.level;
        txtLevel = createGameText({
            x: 85, y: 0,
            text: text,
            fontSize: 25
        }, this);

        //armor
        text = "Armor: " + player.armor;
        if (player.armorMod > 0) {
            text += " (+" + Math.round(Math.abs(player.armorMod)) + ")";
        } else if (player.armorMod < 0) {
            text += " (-" + Math.round(Math.abs(player.armorMod)) + ")";
        }
        txtArmor = createGameText({
            x: 0, y: 85,
            text: text,
            fontSize: 25
        }, this);

        //resist
        text = "Resist: " + player.resist;
        if (player.resistMod > 0) {
            text += " (+" + Math.round(Math.abs(player.resistMod)) + ")";
        } else if (player.resistMod < 0) {
            text += " (-" + Math.round(Math.abs(player.resistMod)) + ")";
        }
        txtResist = createGameText({
            x: 0, y: 120,
            text: text,
            fontSize: 25
        }, this);

        //update details with new elements
        this.playerPanelDetails.removeAll();
        this.playerPanelDetails.add(txtHP);
        this.playerPanelDetails.add(txtLevel);
        this.playerPanelDetails.add(txtArmor);
        this.playerPanelDetails.add(txtResist);
    };
    battleState.prototype.handleScience = function(evt) {
        console.log("Player chose \"MAD SCIENCE!\" command");
        this.updateRecipeData();
        this.updateRecipeDetails();
        this.scienceSelectPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleIngredients = function(evt) {
        console.log("Player chose \"Ingredients\" command");
        this.updateIngredientsPanel();
        this.ingredientsPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleGather = function(evt) {
        console.log("Player chose \"Gather\" command");
        this.gatherResultsPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleInspect = function(evt) {
        console.log("Player chose \"Inspect\" command");
        this.enableMonsterInspection();
        this.inspectPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.showSelectTargetDialog = function(recipeName, recipeDescription, callback) {
        console.log("Showing player \"Select target\" dialog");

        var self = this;

        this.actionsPanel.visible = false;
        this.selectTargetPanel.visible = true;

        this.txtSelectedAbility.text = recipeName;
        this.txtSelectedAbilityDescription.text = recipeDescription;

        //enable click events for all monsters
        _.forEach(self.monsters, function(monster) {
            monster.sprite.inputEnabled = true;
            monster.sprite.input.useHandCursor = true;
            monster.sprite.events.onInputDown.add(function(target) {
                //on click
                var targetMonsterData = _.find(self.monsters, function test(monster) {
                    return monster.sprite.z === target.z;
                }, self);

                //unbind click events
                self.disableMonsterInteraction();

                //swap panel visibility
                self.selectTargetPanel.visible = false;
                self.actionsPanel.visible = true;

                //invoke callback
                callback.apply(self, [targetMonsterData]);
            }, this);
        });
    };
    battleState.prototype.updateRecipeData = function() {
        var self = this;

        this.recipesData = [];

        //massage recipe data
        _.forEach(RECIPES_DATA, function(recipeData, idx) {
            var data = _.clone(recipeData);
            //TODO: apply player 'expertise' modifiers to cost, etc

            //get current ingredient inventory counts
            data.ingredientCountA = player.ingredientsCount[data.ingredientTypeA];
            data.ingredientCountB = player.ingredientsCount[data.ingredientTypeB];

            //determine if we can afford this recipe
            data.canAfford = true;
            if (data.ingredientCountA < data.ingredientCostA) {
                data.canAfford = false;
            } else if (data.ingredientCountB < data.ingredientCostB) {
                data.canAfford = false;
            }

            //set sprite names
            data.ingredientSpriteA = _.pluck(_.where(INGREDIENTS_DATA, {id: data.ingredientTypeA}), 'spriteName');
            data.ingredientSpriteB = _.pluck(_.where(INGREDIENTS_DATA, {id: data.ingredientTypeB}), 'spriteName');

            self.recipesData.push(data);
        });

        //sort recipes
        //split list
        self.recipesData = _.partition(self.recipesData, function(recipe) {
            return recipe.canAfford;
        });
        //sort pieces
        self.recipesData[0] = _.sortBy(self.recipesData[0], 'idx');
        self.recipesData[1] = _.sortBy(self.recipesData[1], 'idx');
        //merge pieces
        self.recipesData = self.recipesData[0].concat(self.recipesData[1]);
    };
    battleState.prototype.updateRecipeDetails = function(pageNum) {
        if (typeof pageNum === "undefined") {
            this.scienceSelectPageNum = this.scienceSelectPageNum || 1;
        } else if (typeof pageNum === "string") {
            if (pageNum === "+=1" && this.scienceSelectPageNum < 5) {
                this.scienceSelectPageNum += 1;
            } else if (pageNum === "-=1" && this.scienceSelectPageNum > 1) {
                this.scienceSelectPageNum -= 1;
            }
        } else if (typeof pageNum === "number" && pageNum >= 1 && pageNum <= 5) {
            this.scienceSelectPageNum = pageNum;
        }

        var recipesToShow = this.recipesData.slice(3*(this.scienceSelectPageNum-1), 3*this.scienceSelectPageNum);
        var subgroups = [];
        var self = this;

        //prep subgroups with display info for each recipe
        _.forEach(recipesToShow, function(recipeData, idx) {
            var subgroup = self.game.add.group();
            subgroup.position.setTo(0, idx*60);

            var textField, image, fill;

            //display name
            fill = (recipeData.canAfford) ? '#ffffff' : '#666666';
            textField = createGameText({
                x: 90, y: 0,
                text: recipeData.displayName,
                fontSize: 20,
                fill: fill
            }, self);
            subgroup.add(textField);
            if (recipeData.canAfford) {
                textField.inputEnabled = true;
                textField.input.useHandCursor = true;
                textField.events.onInputDown.add(function selectReaction(reactionId, evt) {
                    this.scienceSelectPanel.visible = false;
                    this.actionsPanel.visible = true;
                    this.useReaction(reactionId);
                }.bind(self, recipeData.id), self);
            }

            //description
            textField = createGameText({
                x: 90, y: 30,
                text: recipeData.descriptionText,
                fontSize: 12,
                fill: fill,
                strokeThickness: 4
            }, self);
            subgroup.add(textField);

            //ingredient A
            fill = (recipeData.ingredientCostA <= recipeData.ingredientCountA) ? '#ffffff' : '#666666';
            image = self.game.add.sprite(0 - 10, 0 - 13, recipeData.ingredientSpriteA);
            subgroup.add(image);
            textField = createGameText({
                x: 30, y: 0,
                text: recipeData.ingredientCountA+'/'+recipeData.ingredientCostA,
                fontSize: 15,
                fill: fill
            }, self);
            subgroup.add(textField);

            //ingredient B
            fill = (recipeData.ingredientCostB <= recipeData.ingredientCountB) ? '#ffffff' : '#666666';
            image = self.game.add.sprite(0 - 10, 25 - 13, recipeData.ingredientSpriteB);
            subgroup.add(image);
            textField = createGameText({
                x: 30, y: 25,
                text: recipeData.ingredientCountB+'/'+recipeData.ingredientCostB,
                fontSize: 15,
                fill: fill
            }, self);
            subgroup.add(textField);

            subgroups.push( subgroup );
        });

        //update pageNum display
        this.txtScienceSelectPageNum.text = this.scienceSelectPageNum + "/5";

        //wipe child groups and input elements
        _.forEach(this.recipeDetails.children, function(subgroup, idx) {
            //wipe input events off children
            _.forEach(subgroup.children, function(element, idx) {
                if (element.events) {
                    element.events.onInputDown.removeAll();
                }
                if (element.input) {
                    element.input.useHandCursor = false;
                }
                element.inputEnabled = false;
            });

            //remove children
            subgroup.removeAll();
        });

        //remove/add elements
        this.recipeDetails.removeAll();
        _.forEach(subgroups, function(subgroup) {
            self.recipeDetails.add(subgroup);
        });
    };
    battleState.prototype.updateIngredientsPanel = function() {
        var txtFields = [];
        var images = [];
        var numIngs = INGREDIENTS_DATA.length;
        var self = this;

        //prep text fields and images
        _.forEach(INGREDIENTS_DATA, function(ingredientData, idx) {
            var textField, image;

            textField = createGameText({
                x: 200*Math.floor(idx%2) + 100, y: Math.floor(idx/2)*60 + 10,
                text: 'x ' + player.ingredientsCount[ingredientData.id],
                fontSize: 30
            }, self);
            txtFields.push( textField );

            image = self.game.add.sprite(200*Math.floor(idx%2) + 12, Math.floor(idx/2)*60 - 22, ingredientData.spriteName);
            image.scale.setTo(2.0, 2.0);
            images.push(image);
        });

        //remove/add elements
        this.ingredientsDetails.removeAll();
        _.forEach(txtFields, function(textField) {
            self.ingredientsDetails.add(textField);
        });
        _.forEach(images, function(image) {
            self.ingredientsDetails.add(image);
        });
    };
    battleState.prototype.enableMonsterInspection = function() {
        var self = this;

        //wipe inspection display for monsters
        this.inspectMonster.apply(self, []);

        //enable click events for all monsters
        _.forEach(self.monsters, function(monster) {
            monster.sprite.inputEnabled = true;
            monster.sprite.input.useHandCursor = true;
            monster.sprite.events.onInputDown.add(function(target) {
                //on click
                var targetMonsterData = _.find(self.monsters, function test(monster) {
                    return monster.sprite.z === target.z;
                }, this);
                self.inspectMonster.apply(self, [targetMonsterData]);
            }, this);
        });
    };
    battleState.prototype.disableMonsterInteraction = function() {
        //disable click events for all monsters
        var self = this;
        _.forEach(self.monsters, function(monster) {
            monster.sprite.events.onInputDown.removeAll();
            monster.sprite.input.useHandCursor = false;
            monster.sprite.inputEnabled = false;
        });
    };
    battleState.prototype.inspectMonster = function(targetMonsterData) {
        this.inspectMonsterDetails.removeAll();

        if (typeof targetMonsterData !== "undefined") {
            var monsterPortrait;
            var txtHP, txtArmor, txtResist, txtDamage, text;
            var txtDrops, dropPrimary, dropSecondary, dropBonus;

            //create monster portrait
            monsterPortrait = this.inspectMonsterDetails.create(0, 10, targetMonsterData.spriteName);
            monsterPortrait.scale.setTo(2.0, 2.0);

            //add text details
            txtHP = createGameText({
                x: 110, y: 0,
                text: 'HP: ' + targetMonsterData.currentHP + '/' + targetMonsterData.maxHP,
                fontSize: 30
            }, this);

            text = 'Armor: ' + targetMonsterData.armor;
            if (targetMonsterData.armorMod > 0) {
                text += ' (+'+Math.round(targetMonsterData.armorMod)+')';
            } else if (targetMonsterData.armorMod < 0) {
                text += ' (-'+Math.round(Math.abs(targetMonsterData.armorMod))+')';
            }
            txtArmor = createGameText({
                x: 110, y: 40,
                text: text,
                fontSize: 25
            }, this);

            text = 'Resist: ' + targetMonsterData.resist;
            if (targetMonsterData.resistMod > 0) {
                text += ' (+'+Math.round(targetMonsterData.resistMod)+')';
            } else if (targetMonsterData.resistMod < 0) {
                text += ' (-'+Math.round(Math.abs(targetMonsterData.resistMod))+')';
            }
            txtResist = createGameText({
                x: 110, y: 80,
                text: text,
                fontSize: 25
            }, this);

            text = ((targetMonsterData.damageType === "physical") ? 'Might: ' : 'Magic: ') + targetMonsterData.damage;
            txtDamage = createGameText({
                x: 110, y: 120,
                text: text,
                fontSize: 25
            }, this);

            txtDrops = createGameText({
                x: 300, y: 0,
                text: "Drops:",
                fontSize: 30
            }, this);
            dropPrimary = this.inspectMonsterDetails.create(305, 25, _.result(_.findWhere(INGREDIENTS_DATA, {id: targetMonsterData.dropPrimary}), 'spriteName'));
            dropPrimary.scale.setTo(2.0, 2.0);
            dropSecondary = this.inspectMonsterDetails.create(317, 110, _.result(_.findWhere(INGREDIENTS_DATA, {id: targetMonsterData.dropSecondary}), 'spriteName'));
            dropSecondary.scale.setTo(1.5, 1.5);
            dropBonus = this.inspectMonsterDetails.create(389, 122, _.result(_.findWhere(INGREDIENTS_DATA, {id: targetMonsterData.dropBonus}), 'spriteName'));
            dropBonus.scale.setTo(1.0, 1.0);

            //add to subgroup
            this.inspectMonsterDetails.add(txtHP);
            this.inspectMonsterDetails.add(txtArmor);
            this.inspectMonsterDetails.add(txtResist);
            this.inspectMonsterDetails.add(txtDamage);
            this.inspectMonsterDetails.add(txtDrops);
        }
    };
})();
