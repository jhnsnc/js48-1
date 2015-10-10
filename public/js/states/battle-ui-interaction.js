(function() {
    battleState.prototype.updatePlayerPanelDetails = function() {
        var text;
        var txtHP, txtStrength, txtArmor;

        //HP
        text = "HP: " + player.currentHP + "/" + player.maxHP;
        txtHP = createGameText({
            x: 85, y: 0,
            text: text,
            fontSize: 30
        }, this);

        //strength
        text = "Strength: " + player.baseStrength;
        if (player.tempStrenth > 0) {
            text += " (+" + Math.abs(player.tempStrength) + ")";
        } else if (player.tempStrenth < 0) {
            text += " (-" + Math.abs(player.tempStrength) + ")";
        }
        txtStrength = createGameText({
            x: 0, y: 85,
            text: text,
            fontSize: 30
        }, this);

        //armor
        text = "Armor: " + player.baseArmor;
        if (player.tempStrenth > 0) {
            text += " (+" + Math.abs(player.tempArmor) + ")";
        } else if (player.tempStrenth < 0) {
            text += " (-" + Math.abs(player.tempArmor) + ")";
        }
        txtArmor = createGameText({
            x: 0, y: 125,
            text: text,
            fontSize: 30
        }, this);

        //update details with new elements
        this.playerPanelDetails.removeAll();
        this.playerPanelDetails.add(txtHP);
        this.playerPanelDetails.add(txtStrength);
        this.playerPanelDetails.add(txtArmor);
    };
    battleState.prototype.handleScience = function(evt) {
        console.log("Player chose \"MAD SCIENCE!\" command");
        this.scienceSelectPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleIngredients = function(evt) {
        console.log("Player chose \"Ingredients\" command");
        this.updateIngredientsPanel();
        this.ingredientsPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleResearch = function(evt) {
        console.log("Player chose \"Research\" command");
        this.researchResultsPanel.visible = true;
        this.actionsPanel.visible = false;
    };
    battleState.prototype.handleInspect = function(evt) {
        console.log("Player chose \"Inspect\" command");
        this.enableMonsterInspection();
        this.inspectPanel.visible = true;
        this.actionsPanel.visible = false;
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
    battleState.prototype.disableMonsterInspection = function() {
        //disable click events for all monsters
        _.forEach(this.monsters, function(monster) {
            monster.sprite.events.onInputDown.removeAll(this);
            monster.sprite.input.useHandCursor = false;
            monster.sprite.inputEnabled = true;
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
                text += ' (+'+Number(targetMonsterData.armorMod).toFixed(1)+')';
            } else if (targetMonsterData.armorMod < 0) {
                text += ' (-'+Number(Math.abs(targetMonsterData.armorMod)).toFixed(1)+')';
            }
            txtArmor = createGameText({
                x: 110, y: 40,
                text: text,
                fontSize: 30
            }, this);

            text = 'Resist: ' + targetMonsterData.resist;
            if (targetMonsterData.resistMod > 0) {
                text += ' (+'+Number(targetMonsterData.resistMod).toFixed(1)+')';
            } else if (targetMonsterData.resistMod < 0) {
                text += ' (-'+Number(Math.abs(targetMonsterData.resistMod)).toFixed(1)+')';
            }
            txtResist = createGameText({
                x: 110, y: 80,
                text: text,
                fontSize: 30
            }, this);

            text = ((targetMonsterData.damageType === "phsyical") ? 'Might: ' : 'Magic: ') + targetMonsterData.damage;
            txtDamage = createGameText({
                x: 110, y: 120,
                text: text,
                fontSize: 30
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
