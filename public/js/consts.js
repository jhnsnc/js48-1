var MONSTER_DATA = {
    "RedSlime": {
        spriteName: "monster-RedSlime",
        spriteLocation: "assets/monsters/slime_red_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "magic",
        dropPrimary: "Oil",
        dropSecondary: "Mud",
        dropBonus: "Bone"
    },
    "Pixie": {
        spriteName: "monster-Pixie",
        spriteLocation: "assets/monsters/pixie_a_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "magic",
        dropPrimary: "PixieDust",
        dropSecondary: "BugJuice",
        dropBonus: "BlackPowder"
    },
    "MudMan": {
        spriteName: "monster-MudMan",
        spriteLocation: "assets/monsters/golem_mud_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "magic",
        dropPrimary: "Mud",
        dropSecondary: "BlackPowder",
        dropBonus: "Oil"
    },
    "BlackSpider": {
        spriteName: "monster-BlackSpider",
        spriteLocation: "assets/monsters/spider_black_giant_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "physical",
        dropPrimary: "BugJuice",
        dropSecondary: "Oil",
        dropBonus: "PixieDust"
    },
    "Goblin": {
        spriteName: "monster-Goblin",
        spriteLocation: "assets/monsters/goblin_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "physical",
        dropPrimary: "BlackPowder",
        dropSecondary: "Bone",
        dropBonus: "BugJuice"
    },
    "Skeleton": {
        spriteName: "monster-Skeleton",
        spriteLocation: "assets/monsters/skeleton_sprite.png",
        spriteW: 48,
        spriteH: 48,
        hpBase: 15,
        hpGrowth: 10,
        armorBase: 1,
        armorGrowth: 2,
        resistBase: 1,
        resistGrowth: 1,
        damageBase: 1,
        damageGrowth: 2,
        damageType: "physical",
        dropPrimary: "Bone",
        dropSecondary: "PixieDust",
        dropBonus: "Mud"
    }
};

var INGREDIENTS_DATA = [
    {
        id: "Oil",
        displayName: "Oil",
        spriteName: "ingredient-Oil",
        spriteLocation: "assets/ingredients/oil_drop.png"
    },
    {
        id: "BugJuice",
        displayName: "Bug Juice",
        spriteName: "ingredient-BugJuice",
        spriteLocation: "assets/ingredients/potion_purple.png"
    },
    {
        id: "PixieDust",
        displayName: "Pixie Dust",
        spriteName: "ingredient-PixieDust",
        spriteLocation: "assets/ingredients/satchel_pixie_dust.png"
    },
    {
        id: "BlackPowder",
        displayName: "Black Powder",
        spriteName: "ingredient-BlackPowder",
        spriteLocation: "assets/ingredients/black_powder.png"
    },
    {
        id: "Bone",
        displayName: "Bone",
        spriteName: "ingredient-Bone",
        spriteLocation: "assets/ingredients/bone.png"
    },
    {
        id: "Mud",
        displayName: "Mud",
        spriteName: "ingredient-Mud",
        spriteLocation: "assets/ingredients/mud_ball.png"
    }
];

var RECIPES_DATA = [
    {
        id: "Oil-PixieDust",
        idx: 1,
        displayName: "Ishy\'s Scathing Glare",
        descriptionText: "Withers a single enemy\'s armor and resist.",
        target: "enemy-single",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.1,
        debuffType: "hybrid",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Oil",
        ingredientCostA: 3,
        ingredientTypeB: "PixieDust",
        ingredientCostB: 3
    },//1
    {
        id: "Oil-Mud",
        idx: 2,
        displayName: "Silv\'s Lightning Fury",
        descriptionText: "Strikes target enemy with ferocious lightning.",
        target: "enemy-single",
        damageMultiplier: 1.15,
        damageType: "magic",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Oil",
        ingredientCostA: 3,
        ingredientTypeB: "Mud",
        ingredientCostB: 3
    },//2
    {
        id: "Oil-BugJuice",
        idx: 3,
        displayName: "Kudakeru\'s Special Sauce",
        descriptionText: "A delicious concoction. Heals and raises resist.",
        target: "self",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.12,
        buffType: "magic",
        healMultiplier: 1.5,
        inflictTurnDebt: 0,
        ingredientTypeA: "Oil",
        ingredientCostA: 2,
        ingredientTypeB: "BugJuice",
        ingredientCostB: 3
    },//3
    {
        id: "Oil-BlackPowder",
        idx: 4,
        displayName: "Steinbjorn\'s Powder Keg",
        descriptionText: "Blows up in everyone\'s face for physical damage.",
        target: "enemy-all",
        damageMultiplier: 1.12,
        damageType: "physical",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Oil",
        ingredientCostA: 3,
        ingredientTypeB: "BlackPowder",
        ingredientCostB: 3
    },//4
    {
        id: "Oil-Bone",
        idx: 5,
        displayName: "Saelani\'s Redoubt",
        descriptionText: "Fortifies your defenses against all damage types.",
        target: "self",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.1,
        buffType: "hybrid",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Oil",
        ingredientCostA: 3,
        ingredientTypeB: "Bone",
        ingredientCostB: 3
    },//5
    {
        id: "PixieDust-Mud",
        idx: 6,
        displayName: "Malkethos\' Meteor Rain",
        descriptionText: "Blasts all enemies and destroys their armor.",
        target: "enemy-all",
        damageMultiplier: 1.05,
        damageType: "physical",
        debuffMultiplier: 0.08,
        debuffType: "physical",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "PixieDust",
        ingredientCostA: 3,
        ingredientTypeB: "Mud",
        ingredientCostB: 3
    },//6
    {
        id: "PixieDust-BugJuice",
        idx: 7,
        displayName: "Dev\'s GoFast Brew",
        descriptionText: "Gotta go fast. Take another turn without retaliation.",
        target: "enemy-all",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 2,
        ingredientTypeA: "PixieDust",
        ingredientCostA: 3,
        ingredientTypeB: "BugJuice",
        ingredientCostB: 3
    },//7
    {
        id: "PixieDust-BlackPowder",
        idx: 8,
        displayName: "Rakellalea\'s Biting Powder",
        descriptionText: "Damages a single enemy and prevents them from retaliating.",
        target: "enemy-single",
        damageMultiplier: 0.42,
        damageType: "hybrid",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 1,
        ingredientTypeA: "PixieDust",
        ingredientCostA: 3,
        ingredientTypeB: "BlackPowder",
        ingredientCostB: 3
    },//8
    {
        id: "PixieDust-Bone",
        idx: 9,
        displayName: "Exarael\'s Protective Cage",
        descriptionText: "Provides temporary armor and recovers health.",
        target: "self",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.15,
        buffType: "physical",
        healMultiplier: 1.4,
        inflictTurnDebt: 0,
        ingredientTypeA: "PixieDust",
        ingredientCostA: 3,
        ingredientTypeB: "Bone",
        ingredientCostB: 2
    },//9
    {
        id: "Mud-BugJuice",
        idx: 10,
        displayName: "MadJack\'s Foomsplosion",
        descriptionText: "Wrecks all enemies with massive magic damage.",
        target: "enemy-all",
        damageMultiplier: 1.25,
        damageType: "magic",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Mud",
        ingredientCostA: 3,
        ingredientTypeB: "BugJuice",
        ingredientCostB: 4
    },//10
    {
        id: "Mud-BlackPowder",
        idx: 11,
        displayName: "Talia\'s Rejuvination",
        descriptionText: "Recovers a large amount of health.",
        target: "self",
        damageMultiplier: 0.0,
        damageType: "none",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 2.4,
        inflictTurnDebt: 0,
        ingredientTypeA: "Mud",
        ingredientCostA: 2,
        ingredientTypeB: "BlackPowder",
        ingredientCostB: 2
    },//11
    {
        id: "Mud-Bone",
        idx: 12,
        displayName: "Woar\'s Heavy Beatstick",
        descriptionText: "Whacks one enemy over the head for heavy physical damage.",
        target: "enemy-single",
        damageMultiplier: 0.9,
        damageType: "physical",
        debuffMultiplier: 0.0,
        debuffType: "none",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "Mud",
        ingredientCostA: 2,
        ingredientTypeB: "Bone",
        ingredientCostB: 2
    },//12
    {
        id: "BugJuice-BlackPowder",
        idx: 13,
        displayName: "JackCloudy\'s Acid Cloud",
        descriptionText: "Deals magic damage to all and weakens armor.",
        target: "enemy-all",
        damageMultiplier: 0.95,
        damageType: "magic",
        debuffMultiplier: 0.09,
        debuffType: "physical",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "BugJuice",
        ingredientCostA: 2,
        ingredientTypeB: "BlackPowder",
        ingredientCostB: 3
    },//13
    {
        id: "BugJuice-Bone",
        idx: 14,
        displayName: "Ging\'s Blasting Stick",
        descriptionText: "Blasts an enemy in the face and lowers magic resist.",
        target: "enemy-single",
        damageMultiplier: 1.04,
        damageType: "physical",
        debuffMultiplier: 0.1,
        debuffType: "magic",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "BugJuice",
        ingredientCostA: 3,
        ingredientTypeB: "Bone",
        ingredientCostB: 3
    },//14
    {
        id: "BlackPowder-Bone",
        idx: 15,
        displayName: "The Bilbax Tickler",
        descriptionText: "\"Tickles\" an enemy with magic damage and lowers resist.",
        target: "enemy-single",
        damageMultiplier: 1.0,
        damageType: "magic",
        debuffMultiplier: 0.09,
        debuffType: "magic",
        buffMultiplier: 0.0,
        buffType: "none",
        healMultiplier: 0.0,
        inflictTurnDebt: 0,
        ingredientTypeA: "BlackPowder",
        ingredientCostA: 3,
        ingredientTypeB: "Bone",
        ingredientCostB: 2
    }//15
];

var GROUND_TILESETS = [
    /*{
        name: "CrustedGround",
        location: "assets/tiles/ground_crusted.png"
    },*/
    /*{
        name: "LightCrustedGround",
        location: "assets/tiles/ground_crusted_light.png"
    },*/
    {
        name: "BrownDirt",
        location: "assets/tiles/ground_dirt_brown.png"
    },
    {
        name: "DarkDirt",
        location: "assets/tiles/ground_dirt_dark.png"
    },
    {
        name: "Grass",
        location: "assets/tiles/ground_grass.png"
    },
    /*{
        name: "BurntGrass",
        location: "assets/tiles/ground_grass_burnt.png"
    },*/
    {
        name: "Sand",
        location: "assets/tiles/ground_sand.png"
    }
];
