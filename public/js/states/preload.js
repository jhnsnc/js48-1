var preloadState = function(game) {};

preloadState.prototype = {
    preload: function() {
        this.game.load.image("background-Sky", "assets/sky.png");

        this.game.load.spritesheet("monster-Goblin", "assets/monsters/goblin_sprite.png", 48, 48);
        this.game.load.spritesheet("monster-MudGolem", "assets/monsters/golem_mud_sprite.png", 48, 48);
        this.game.load.spritesheet("monster-Pixie", "assets/monsters/pixie_a_sprite.png", 48, 48);
        this.game.load.spritesheet("monster-Skeleton", "assets/monsters/skeleton_sprite.png", 48, 48);
        this.game.load.spritesheet("monster-RedSlime", "assets/monsters/slime_red_sprite.png", 48, 48);
        this.game.load.spritesheet("monster-BlackSpider", "assets/monsters/spider_black_giant_sprite.png", 48, 48);
    },
    create: function() {
        console.log("Preloading game assets");

        this.game.state.start("Title");
    }
};
