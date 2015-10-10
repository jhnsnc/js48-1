var createGameText = function (options, ctx) {
    var result;
    var defaults = {
        fill: '#ffffff',
        stroke: '#181818',
        strokeThickness: 5,
        fontSize: 30
    };

    options = _.extend(defaults, options);
    result = ctx.game.add.text(options.x, options.y, options.text, {
        fill: options.fill,
        stroke: options.stroke,
        strokeThickness: options.strokeThickness
    });
    result.font = 'Topaz';
    result.fontSize = options.fontSize;

    return result
}
