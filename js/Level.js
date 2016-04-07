Assignment3.Level=function(game){};
var map; //tilemap
var layer; //layer
var player; //player unit
var enemy1; //enemy unit
var enemy2;
var click=false;//first click
var click2=false;//second click
var currentTile;//tile
var tileArray=[];//tile[] of player
var enemyArray=[];//tile[] of tnemy1
var movementSelect;//blue hilight of valid movement option 
var attackButton;//attack button
var toAttack;
var waitButton;//wait button
var background;//red background for buttons
var HPtext;
var scroll1;
var scrollText;
var story1;
var playText=true;
var j=0;
var continueButton1;
var story2;
var playText2=false;
var k=0;
var speakerText1;
var speaker1;
var speaker2;

class Unit {
    constructor(name, health, strength, defense, speed, move, sprite, tile, arrayPosition) {
        this.name=name;
        this.health=health;
        this.strength=strength;
        this.defense=defense;
        this.speed=speed;
        this.move=move;
        this.sprite=sprite;
        this.tile=tile;
        this.arrayPosition=arrayPosition;
    }
    attack() {
        if (attackButton.visible==true) {
            toAttack.health-=player.strength-toAttack.defense;
            if (toAttack.health<=0) {
                toAttack.sprite.destroy();
                enemyArray[toAttack.arrayPosition]=null;
            }
        else {
            player.health-=toAttack.strength-player.defense;
            if (player.health<=0) {
                player.sprite.destroy();
            }
        }
        waitButton.visible=false;
        attackButton.visible=false;
        updateHealth();
        }
    } 
}

Assignment3.Level.prototype={
    create: function() {
        map=this.add.tilemap('level1');
        map.addTilesetImage('tileset');
        map.setCollision([13,21,22,35,74,98,99,100,101,102,103,104,105,106,120,121,122,123,124,125,126,127,128,135,136,142,143,144,145,146,147,148,149,150,164,172,176,186,194,208,216,225,230,231,232,236,237,238,252,253,254,258,259,260,274,275,276,280,281,282]);
        layer=map.createLayer('Tile Layer 1');
        
        marker = this.add.graphics();
        marker.lineStyle(2, 0xffffff, 1);
        marker.drawRect(0, 0, 32, 32);
        
        this.input.addMoveCallback(updateMarker, this);
        
        this.input.onDown.add(getCurrentTile, this);
        
        player= new Unit("Titan", 50, 15, 10, 15, 10, this.add.sprite(736,0,'dude'), map.getTileWorldXY(736,0), null);
        var general= new Unit("General", 70, 15, 25, 5, 4, this.add.sprite(128-12, 224-10, 'general'), map.getTileWorldXY(128,224), null);
        general.sprite.scale.setTo(.4,.4);
        var knight1= new Unit("Knight1", 50, 8, 20, 3, 3, this.add.sprite(96-8, 192-2, 'knight'), map.getTileWorldXY(96,192), null);
        var knight2= new Unit("Knight2", 50, 8, 20, 3, 3, this.add.sprite(160-8, 192-2, 'knight'), map.getTileWorldXY(160, 192), null);
        knight1.sprite.scale.setTo(.8,.8);
        knight2.sprite.scale.setTo(.8,.8);
        var princess= new Unit("Rhea", 20, 5, 5, 10, 4, this.add.sprite(128, 96-25, 'princess'), map.getTileWorldXY(128,96), null);
        enemy1= new Unit("enemy1", 20, 20, 5, 5, 4, this.add.sprite(736, 512-5, 'enemy'), map.getTileWorldXY(736,512), 0);
        enemy2= new Unit("enemy2", 20, 20, 5, 5, 4, this.add.sprite(768, 512-5, 'enemy'), map.getTileWorldXY(768,512), 1);
        enemy3= new Unit("enemy3", 20, 15, 5, 5, 4, this.add.sprite(640, 192-5, 'enemy'), map.getTileWorldXY(650,192), 2);
        enemy4= new Unit("enemy4", 20, 15, 5, 5, 4, this.add.sprite(448, 256-5, 'enemy'), map.getTileWorldXY(448,256), 3);
        enemy5= new Unit("enemy5", 20, 15, 5, 5, 4, this.add.sprite(480, 288-5, 'enemy'), map.getTileWorldXY(480,288), 4);
        enemy6= new Unit("enemy6", 20, 15, 5, 5, 4, this.add.sprite(64, 288-5, 'enemy'), map.getTileWorldXY(64,288), 5);
        enemy7= new Unit("enemy5", 20, 15, 5, 5, 4, this.add.sprite(96, 320-5, 'enemy'), map.getTileWorldXY(96,320), 6);
        enemy8= new Unit("enemy5", 20, 15, 5, 5, 4, this.add.sprite(192, 288-5, 'enemy'), map.getTileWorldXY(1920,288), 7);
        enemy9= new Unit("enemy5", 20, 15, 5, 5, 4, this.add.sprite(160, 320-5, 'enemy'), map.getTileWorldXY(160,320), 8);
        boss= new Unit("boss", 100, 50, 25, 20, 8, this.add.sprite(128-5, 320-20, 'boss'), map.getTileWorldXY(128,320), 9);
        enemy1.sprite.scale.setTo(1,.75);
        enemy2.sprite.scale.setTo(1,.75);
        enemy3.sprite.scale.setTo(1,.75);
        enemy4.sprite.scale.setTo(1,.75);
        enemy5.sprite.scale.setTo(1,.75);
        enemy6.sprite.scale.setTo(1,.75);
        enemy7.sprite.scale.setTo(1,.75);
        enemy8.sprite.scale.setTo(1,.75);
        enemy9.sprite.scale.setTo(1,.75);
        enemyArray[0]=enemy1;
        enemyArray[1]=enemy2;
        enemyArray[2]=enemy3;
        enemyArray[3]=enemy4;
        enemyArray[4]=enemy5;
        enemyArray[5]=enemy6;
        enemyArray[6]=enemy7;
        enemyArray[7]=enemy8;
        enemyArray[8]=enemy9;
        enemyArray[9]=boss;
        
        movementSelect=this.add.group();
        movementSelect.alpha=.1;
        
        background=this.add.image(800,0,'background');
        waitButton=this.add.button(800, 0, 'waitButton', wait, this);
        waitButton.visible=false;
        attackButton=this.add.button(800, 55, 'attackButton', player.attack, this);
        attackButton.visible=false;
        HPtext=this.add.text(800,300,"HP: "+player.health);
        
        scroll1=this.add.sprite(0,580,'scroll');
        scroll1.scale.setTo(.6,.05);
        
        story1=["These guards... they've been slaughtered...", "Hey! There's another one, get him!", "Well, it looks like I'll be fighting my way to the Princess.", "Who could these men be..."];
        speaker1=["Titan:", "???:", "Titan:", "Titan:"];
        story2=["Janus! What's going on?", "Enceladus is under attack.", "Well I can see that, but who are they?", "Nevermind that now, you must do your duty.", "I can't just leave you here!", "You can and you will, we all have our roles to play.", "Good luck my friend.", "Hmmph... good luck General.", "You face General Janus of Enceladus.", "Turn back now if you value your lives.", "I'm afraid I cannot do that General.", "You see, my orders are to take the Princess.", "You won't be doing so while I live.", "That shouldn't be a problem General.", "Hmmph, we shall see."];
        speaker2=["Titan:", "Janus:", "Titan:", "Janus:", "Titan:", "Janus:", "Titan:", "Janus:", "Janus:", "Janus:", "???:", "???:", "Janus:", "???:", "Janus:"];
        
        scrollText=this.add.text(145, 590, story1[j]);
        speakerText1=this.add.text(50, 590, speaker1[j]);
        
        continueButton1=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function() {
        if (playText) {
            if (continueButton1.isDown && j<story1.length && !click) {
                click=true;
            }
            else if (click && continueButton1.isUp) {
                j++;
                scrollText.text=story1[j];
                speakerText1.text=speaker1[j];
                click=false;
            }
            if (continueButton1.isDown && j>=story1.length-1) {
                scroll1.visible=false;
                scrollText.visible=false;
                speakerText1.visible=false;
                click=false;
                playText=false;
            }
        }
        else if (!playText2) {
            if (player.tile.x<=6) {
                playText2=true;
            }
            else if (click2 && this.input.mousePointer.isDown) {
                if (isIn(currentTile)) {
                    moveTo(player, currentTile);
                    movementSelect.removeAll();
                    click=false;
                    displayOptionMenu();
                }
            }
            else if (click && this.input.mousePointer.isUp) {
                click2=true;
            }
            else if (click2 && this.input.mousePointer.isUp) {
                click2=false;
            }
            else {
                if (this.input.mousePointer.isDown && !waitButton.visible) {
                    if (player.tile==currentTile) {
                        tileArray=[];
                        displayMovementOptions(player.tile, player.move, null);
                        click=true;
                    }
                }
            }
        }
        else {
            scroll1.visible=true;
            scrollText.text=story2[k];
            scrollText.visible=true;
            speakerText1.text=speaker2[k];
            speakerText1.visible=true;
            if (continueButton1.isDown && k<story2.length && !click) {
                click=true;
            }
            else if (click && continueButton1.isUp) {
                k++;
                scrollText.text=story2[k];
                speakerText1.text=speaker2[k];
                click=false;
            }
            if (continueButton1.isDown && k==7) {
                player.sprite.destroy();
            }
            if (continueButton1.isDown && k<=story2.length-1) {
                //this.state.start("Level2");
            }
        }
    }
}

//create an array of valid tiles to move to 
function displayMovementOptions(tile, move, direction) {
    if (tile==null) {
        return;
    }
    else if (!tile.collides) {
        if(!isIn(tile)&&!enemyTileCheck(tile)) {
            tileArray.push(tile);
            var blue=movementSelect.create(tile.x*32, tile.y*32, 'blue');
        }
    }
    if (move>0 && !tile.collides && !enemyTileCheck(tile)) {
        if (direction!='down') {
            displayMovementOptions(map.getTile(tile.x, tile.y-1), move-1, 'up');
        }
        if (direction!='up') {
            displayMovementOptions(map.getTile(tile.x, tile.y+1), move-1, 'down');
        }
        if (direction!='right'){
            displayMovementOptions(map.getTile(tile.x-1, tile.y), move-1, 'left');
        }
        if (direction!='left'){
            displayMovementOptions(map.getTile(tile.x+1, tile.y), move-1, 'right');
        }
    }
    else {
        return;
    }
}
//isValidMovement(player.tile, currentTile);
function isIn(option) {
    for (var i=0; i<tileArray.length; i++) {
        if (tileArray[i]==option) {
            return true;
        }
    }
    return false;
}
function enemyTileCheck(option) {
    for (var i=0; i<enemyArray.length; i++) {
        if (enemyArray[i]!=null && enemyArray[i].tile==option) {
            return true;
        }
    }
    return false;
}
function updateMarker() {
    marker.x = layer.getTileX(this.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(this.input.activePointer.worldY) * 32;
}
//moveTo(the unit to be moved, the tile to move to);
function moveTo(unit, tile) {
    player.sprite.x=currentTile.x*32;
    player.sprite.y=currentTile.y*32;
    player.tile=currentTile;
}
function getCurrentTile(){
    currentTile=map.getTileWorldXY(this.input.x, this.input.y);
}
function displayOptionMenu() {
    waitButton.visible=true;
    if (attackable()) {
        attackButton.visible=true;
    }
}
function attackable() {
    for (var ind=0; i<enemyArray.length; ind++) {
        if (enemyArray[ind]!=null) {
            if ((player.tile.x==enemyArray[ind].tile.x && Math.abs(player.tile.y-enemyArray[ind].tile.y)==1) || (player.tile.y==enemyArray[ind].tile.y && Math.abs(player.tile.x-enemyArray[ind].tile.x)==1)) {
                toAttack=enemyArray[ind];
                return true;
            }
        }
    }
    return false;
}
function wait() {
    waitButton.visible=false;
    attackButton.visible=false;
}
function updateHealth() {
    HPtext.text="HP: "+player.health;
}