(function() {
    battleState.prototype.useReaction = function(reactionId) {
        console.log("user selected reaction: "+_.pluck(_.where(RECIPES_DATA,{id: reactionId}), 'displayName')+' ('+reactionId+')');
    };
})();
