/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView      = require('./BaseView');

// Components
const SoundManager  = require('../components/SoundManager');

// Characters
const Player        = require('../characters/Player'),
      Clu           = require('../characters/Clu'),
      Gem           = require('../characters/Gem');

// Weapons
const Blast         = require('../characters/weapons/Blast');

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

    // Holders for things
    this.characters = [];
    this.projectiles = [];

    // Our Player
    this.player = new Player( options );

    // Add our target
    options.target = this.player;

    // Create enemies
    this.clu = new Clu( options );
    this.clu2 = new Clu( options );
    this.gem = new Gem( options );
    this.gem2 = new Gem( options );

    this.background = {
      x: -111,
      y: -10
    }

    // Bind some events
    $(window).keydown( function(event){
      switch(event.which){
        case 32:
          self.shoot();
          break;
        default: return;
      }
    }); 
	}

  init() {
    // this.characters.push(this.player);
    this.characters.push(this.clu);
    this.characters.push(this.clu2);
    this.characters.push(this.gem);
    this.characters.push(this.gem2);
  }

  /*
  ------------------------------------------
  | shoot:void (-)
  |
  | Shoot! Great shot kid!
  ------------------------------------------ */
  shoot() {

    let blast = new Blast({
      canvas: this.canvas,
      ctx: this.ctx,
      x: this.player.data.x + 10, 
      y: this.player.data.y
    });

    let blaster = new SoundManager({
      sound: this.model.assets.sounds.blast_3
    })

    blaster.player.volume = .25;
    blaster.play();

    this.projectiles.push(blast);

    console.log(blast.data.x, blast.data.y)
  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update.
  ------------------------------------------ */
	update() {
    let self = this;
    
    // _.each(this.model.keys, function(v, k, i){

    //   if(k == "32" && v){
    //     self.shoot();
    //   }

    // });

    // update projectiles
    _.each(this.projectiles, function(i){
      i.update();

      // if it's out of bounds kill it
      if( i.data.y < 0 ){
        self.projectiles.splice(i, 0);
      }
    });

    // Update the player
    this.player.update();

    self.ctx.rect(
      self.player.hit_area.x,
      self.player.hit_area.y,
      self.player.hit_area.width,
      self.player.hit_area.height
    );

    // self.ctx.strokeStyle = "red";
    // self.ctx.stroke();

    // Update the characters
    _.each(this.characters, function(i){
      
      // Update the character
      i.update();
      
      self.ctx.rect(
        i.hit_area.x,
        i.hit_area.y,
        i.hit_area.width,
        i.hit_area.height
      );

      // self.ctx.strokeStyle = "red";
      // self.ctx.stroke();

      // Check if character is dead
      _.each(self.projectiles, function(p){
        if( self.collision( p.data.x, p.data.y, p.data.width, p.data.height, i.hit_area.x, i.hit_area.y, i.hit_area.width, i.hit_area.height ) && i.hit_area.x > 0 ){
          i.dead();
          self.trigger('kill');
          self.model.score += i.points;
        }
      })

      // Check if player dead
      if( self.collision(self.player.hit_area.x, self.player.hit_area.y, self.player.hit_area.width, self.player.hit_area.height, i.hit_area.x, i.hit_area.y, i.hit_area.width, i.hit_area.height ) ){
        self.player.dead();
        self.trigger('dead');
      }

    });

    this.$el.css({
      'background-position': self.background.x+"px" + " " + self.background.y+"px"
    });

    this.background.y += 25;

    if(this.right){
      this.background.x -= 25;
    }

    if(this.left){
      this.background.x += 25;
    }

	}

  /*
  ------------------------------------------
  | collision:void (-)
  |
  | Check for a collision.
  ------------------------------------------ */
  collision( x1, y1, w1, h1, x2, y2, w2, h2 ) {
    w2 += x2;
    w1 += x1;
    if (x2 > w1 || x1 > w2) return false;
    h2 += y2;
    h1 += y1;
    if (y2 > h1 || y1 > h2) return false;
    return true;
  }
}
	
module.exports = GameView;