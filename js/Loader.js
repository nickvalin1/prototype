Assignment3.Loader=function(game) {
    this.game=game;
    this.ready=false;
};
Assignment3.Loader.prototype={
    preload: function() {
        this.load.image('garden', 'assets/garden.jpg');
        this.load.image('scroll', 'assets/scroll.jpg');
        this.load.image('titan', 'assets/titan.gif');
        this.load.image('soldier', 'assets/soldier.gif');
        this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset', 'assets/tileset.png');
        this.load.image('general', 'assets/general.gif');
        this.load.image('knight', 'assets/knight.gif');
        this.load.spritesheet('princess', 'assets/princess.gif', 30, 58);
        this.load.spritesheet('dude', 'assets/dude.png', 32,32);
        this.load.image('blue', 'assets/blue.png');
        this.load.spritesheet('enemy', 'assets/enemy.gif', 32,50);
        this.load.image('waitButton', 'assets/waitButton.png');
        this.load.image('attackButton', 'assets/attackButton.png');
        this.load.image('background', 'assets/background.png');
    },
    update: function() {
        //if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
			//this.ready = true;
			this.state.start('Story');
		//}
    }
}
