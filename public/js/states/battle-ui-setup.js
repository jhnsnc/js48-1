(function() {
    battleState.prototype.setupActionsPanel = function() {
        var panelBack;
        var btnScience, btnIngredients, btnResearch, btnInspect;

        this.actionsPanel = this.game.add.group();
        this.actionsPanel.position.setTo(140, 300);

        panelBack = this.actionsPanel.create(0, 0, "ui-ActionPanel");

        btnScience = createGameText({
            x: 30, y: 35,
            text: 'MAD SCIENCE!',
            fontSize: 45
        }, this);
        this.actionsPanel.add(btnScience);
        btnScience.inputEnabled = true;
        btnScience.input.useHandCursor = true;
        btnScience.events.onInputDown.add(this.handleScience, this);

        btnIngredients = createGameText({
            x: 30, y: 95,
            text: 'Ingredients',
            fontSize: 45
        }, this);
        this.actionsPanel.add(btnIngredients);
        btnIngredients.inputEnabled = true;
        btnIngredients.input.useHandCursor = true;
        btnIngredients.events.onInputDown.add(this.handleIngredients, this);

        btnResearch = createGameText({
            x: 30, y: 155,
            text: 'Research',
            fontSize: 45
        }, this);
        this.actionsPanel.add(btnResearch);
        btnResearch.inputEnabled = true;
        btnResearch.input.useHandCursor = true;
        btnResearch.events.onInputDown.add(this.handleResearch, this);

        btnInspect = createGameText({
            x: 30, y: 215,
            text: 'Inspect',
            fontSize: 45
        }, this);
        this.actionsPanel.add(btnInspect);
        btnInspect.inputEnabled = true;
        btnInspect.input.useHandCursor = true;
        btnInspect.events.onInputDown.add(this.handleInspect, this);
    };
    battleState.prototype.setupScienceSelectPanel = function() {
        var panelBack;
        var txtLabel, txtPrev, txtNext;

        this.scienceSelectPanel = this.game.add.group();
        this.scienceSelectPanel.position.setTo(140, 300);

        panelBack = this.scienceSelectPanel.create(0, 0, "ui-ActionPanel");

        //heading text
        txtLabel = createGameText({
            x: 30, y: 30,
            text: 'Select reaction:',
            fontSize: 25
        }, this);
        this.scienceSelectPanel.add(txtLabel);

        //hide panel on label click (and show actions panel)
        txtLabel.inputEnabled = true;
        txtLabel.input.useHandCursor = true;
        txtLabel.events.onInputDown.add(function dismissPanel(evt) {
            this.scienceSelectPanel.visible = false;
            this.actionsPanel.visible = true;
        }, this);

        //pagination text
        txtPrev = createGameText({
            x: 315, y: 265,
            text: '  <  ',
            fontSize: 30
        }, this);
        txtPrev.anchor.setTo(1.0, 0.5);
        txtPrev.inputEnabled = true;
        txtPrev.input.useHandCursor = true;
        txtPrev.events.onInputDown.add(function prevPage(evt) {
            this.updateRecipeDetails("-=1");
        }, this);

        this.scienceSelectPageNum = 1;
        this.scienceSelectPanel.add(txtPrev);
        this.txtScienceSelectPageNum = createGameText({
            x: 355, y: 265,
            text: this.scienceSelectPageNum + '/5',
            fontSize: 30
        }, this);
        this.txtScienceSelectPageNum.anchor.setTo(0.5, 0.5);
        this.scienceSelectPanel.add(this.txtScienceSelectPageNum);

        txtNext = createGameText({
            x: 395, y: 265,
            text: '  >  ',
            fontSize: 30
        }, this);
        txtNext.anchor.setTo(0.0, 0.5);
        this.scienceSelectPanel.add(txtNext);
        txtNext.inputEnabled = true;
        txtNext.input.useHandCursor = true;
        txtNext.events.onInputDown.add(function nextPage(evt) {
            this.updateRecipeDetails("+=1");
        }, this);

        //add recipe details subgroup
        this.recipeDetails = this.game.add.group();
        this.recipeDetails.position.setTo(30, 70);
        this.scienceSelectPanel.add(this.recipeDetails);

        //hidden by default
        this.scienceSelectPanel.visible = false;
    };
    battleState.prototype.setupIngredientsPanel = function() {
        var panelBack;
        var txtLabel;

        this.ingredientsPanel = this.game.add.group();
        this.ingredientsPanel.position.setTo(140, 300);

        panelBack = this.ingredientsPanel.create(0, 0, "ui-ActionPanel");

        //heading text
        txtLabel = createGameText({
            x: 30, y: 30,
            text: 'Ingredients inventory:',
            fontSize: 35
        }, this);
        this.ingredientsPanel.add(txtLabel);

        //hide panel on click (and show actions panel)
        panelBack.inputEnabled = true;
        panelBack.input.useHandCursor = true;
        panelBack.events.onInputDown.add(function dismissPanel(evt) {
            this.ingredientsPanel.visible = false;
            this.actionsPanel.visible = true;
        }, this);

        //add ingredients details subgroup
        this.ingredientsDetails = this.game.add.group();
        this.ingredientsDetails.position.setTo(30, 90);
        this.ingredientsPanel.add(this.ingredientsDetails);

        //hidden by default
        this.ingredientsPanel.visible = false;
    };
    battleState.prototype.setupResearchResultsPanel = function() {
        var panelBack;
        var txtLabel;

        this.researchResultsPanel = this.game.add.group();
        this.researchResultsPanel.position.setTo(140, 300);

        panelBack = this.researchResultsPanel.create(0, 0, "ui-ActionPanel");

        //heading text
        txtLabel = createGameText({
            x: 30, y: 30,
            text: 'Research results:',
            fontSize: 35
        }, this);
        this.researchResultsPanel.add(txtLabel);

        //hide panel on click (and show actions panel)
        panelBack.inputEnabled = true;
        panelBack.input.useHandCursor = true;
        panelBack.events.onInputDown.add(function dismissPanel(evt) {
            this.researchResultsPanel.visible = false;
            this.actionsPanel.visible = true;
        }, this);

        //hidden by default
        this.researchResultsPanel.visible = false;
    };
    battleState.prototype.setupInspectPanel = function() {
        var panelBack;
        var txtLabel;

        this.inspectPanel = this.game.add.group();
        this.inspectPanel.position.setTo(140, 300);

        panelBack = this.inspectPanel.create(0, 0, "ui-ActionPanel");

        //heading text
        txtLabel = createGameText({
            x: 30, y: 30,
            text: 'Inspect monster:',
            fontSize: 35
        }, this);
        this.inspectPanel.add(txtLabel);

        //hide panel on click (and show actions panel)
        panelBack.inputEnabled = true;
        panelBack.input.useHandCursor = true;
        panelBack.events.onInputDown.add(function dismissPanel(evt) {
            this.disableMonsterInspection();
            this.inspectPanel.visible = false;
            this.actionsPanel.visible = true;
        }, this);

        //add monster details subgroup
        this.inspectMonsterDetails = this.game.add.group();
        this.inspectMonsterDetails.position.setTo(30, 90);
        this.inspectPanel.add(this.inspectMonsterDetails);

        //hidden by default
        this.inspectPanel.visible = false;
    };
    battleState.prototype.setupPlayerPanel = function() {
        var panelBack, portrait, txtHp;

        this.playerPanel = this.game.add.group();
        this.playerPanel.position.setTo(640, 300);

        panelBack = this.playerPanel.create(0, 0, "ui-PlayerPanel");
        portrait = this.playerPanel.create(30, 30, "ui-PlayerPortrait");
        portrait.scale.setTo(1.5, 1.5);

        this.playerPanelDetails = this.game.add.group();
        this.playerPanelDetails.position.setTo(30, 30);
        this.playerPanel.add(this.playerPanelDetails);

        this.updatePlayerPanelDetails();
    };
})();
