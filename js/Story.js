Assignment3.Story=function(game){};
var background;
var scroll;
var story;
var storyText;
var continueButton;
var i=0;
var click1=false;
Assignment3.Story.prototype={
    create: function() {
        background=this.add.sprite(-20,-20,'garden');
        background.scale.setTo(1.25,1.25);
        scroll=this.add.sprite(0,520,'scroll');
        scroll.scale.setTo(.6,.1);
        var titan=this.add.sprite(600,360,'titan');
        titan.scale.setTo(2,2);
        var soldier=this.add.sprite(400,360,'soldier');
        soldier.scale.setTo(-2,2);
        continueButton=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        story=["Nice day isn't it?", "Hmmph.", "Aren't you ever happy?", "Not my job to be happy. Job's to protect the Princess.", "Don't you think Princess Rhea would feel safer if she didn't have to look at your frown all the time?", "...", "Not like she needs protection anyway, the whole country loves her.", "Princesses always need protection.", "Guahhh!!!", "What was that?", "Nothing good. You head to the throne room, I'll check the courtyard.", "Yes General."];
        storyText=this.add.text(145,530,story[i]);
        storyText.wordWrap=true;
        storyText.wordWrapWidth=600;
    },
    update: function() {
        if (continueButton.isDown && i<story.length && !click1) {
            click1=true;
        }
        else if (click1 && continueButton.isUp) {
            i++;
            storyText.text=story[i];
            click1=false;
        }
        if (continueButton.isDown && i>=story.length-1) {
            this.state.start('Level1');
        }
    }
}