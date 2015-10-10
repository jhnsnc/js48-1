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
        id: "Foomsplosion",
        displayName: "Foomsplosion",
        target: "enemy-all",
        ingredients: [
            {
                id: "Oil",
                amount: 2
            },
            {
                id: "BlackPowder",
                amount: 3
            }
        ]
    }
];

var GROUND_TILESETS = [
    /*{
        name: "CrustedGround",
        location: "assets/tiles/ground_crusted.png"
    },*/
    {
        name: "BrownDirt",
        location: "assets/tiles/ground_dirt_brown.png"
    }
];
