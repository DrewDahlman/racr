/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView = require('./BaseView');

// Components
const SoundManager  = require('../components/SoundManager');

// Characters
const Player = require('../characters/Player'),
      Clu = require('../characters/Clu'),
      Gem = require('../characters/Gem');

class GameView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super( options );

    let self = this;
    
    self.right = false;
    self.left = false;

    this.characters = [];
    this.player = new Player( options );
    this.clu = new Clu( options );
    this.gem = new Gem( options );

    this.background = {
      x: -111,
      y: -10
    }

    // Bind some events
    $(window).keydown( function(event){
      switch(event.which){
        case 39:
          self.left = false;
          self.right = true;
          break;
        case 37:
          self.right = false;
          self.left = true;
          break;
        default: return;
      }
    }); 

    $(window).keyup(function() {
      self.right = false;
      self.left = false;
    });

	}

  init() {
    this.characters.push(this.player);
    this.characters.push(this.clu);
    this.characters.push(this.gem);
  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update.
  ------------------------------------------ */
	update() {
    let self = this;

    _.each(this.characters, function(i){
      i.update();
    });

    // this.$el.css({
    //   'background-position': self.background.x+"px" + " " + self.background.y+"px"
    // });

    // this.background.y += 15;

    // if(this.right){
    //   this.background.x -= 15;
    // }

    // if(this.left){
    //   this.background.x += 15;
    // }

	}
}
	
module.exports = GameView;