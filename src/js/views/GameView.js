/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView      = require('./BaseView');

// Components
const SoundManager  = require('../components/SoundManager');

// Characters
const Player        = require('../characters/Player'),
      Enemy         = require('../characters/BaseEvilPlayer');

class GameView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super( options );

    // Define self / this
    let self = this;
    
    // Define directions
    self.right = false;
    self.left = false;

    // Holders for things
    this.characters = [];
    this.projectiles = [];

    // DOM Elements
    this.$ui = $(JST['ui']());
    this.$el.append(this.$ui);

    // Our Player
    this.player = new Player( options );
    this.player.on('death', () => this.game_over() );

    // Add our target
    options.target = this.player;

    // Create enemies
    // At min 4
    for( let i = 0; i < 4; i++){

      // Vars
      let enemy = null,
          ran = Math.floor(Math.random() * this.model.characters.length);

      // character
      let character = this.model.characters[ran];
      console.log( self.model.characters.length, ran, character )

      // Create the enemy
      enemy = new Enemy({
        game: options,
        data: character
      });

      // Add to our loop
      this.characters.push(enemy);
    }

    // set a default background position
    this.background = {
      x: -111,
      y: 0
    }
	}

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Cause you gotta do stuff. Not always,
  | but sometimes.
  ------------------------------------------ */
  init() {}

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update.
  ------------------------------------------ */
	update() {
    let self = this,
        projectile_gc = [];
    
    // draw the floor
    let pattern = this.ctx.createPattern(this.model.assets.graphics.background.img, "repeat");
    this.ctx.fillStyle = pattern;

    // Background
    this.ctx.translate(0, this.background.y);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 2);
    this.ctx.fillRect(0, 0, this.canvas.width, -this.canvas.height * 2);
    this.ctx.translate(0, this.background.y * (-1));

    // update projectiles
    _.each(this.player.projectiles, function(i){
      i.update();

      if( i.data.y < 0){
        let _index = self.player.projectiles.indexOf(i);
        projectile_gc.push(_index);
      }
    });

    // Update the player
    this.player.update();

    // Update the characters
    _.each(this.characters, function(i){
      
      // Update the character
      i.update();

      // check if character is touching another kill the offender
      let others = _.without( self.characters, i);
      _.each( others, function(c){
        if( self.collision(c.data.x, c.data.y, c.data.width, c.data.height, i.data.x, i.data.y, i.data.width, i.data.height) ){
          i.reset();
        }
      });

      // Check if character is dead
      _.each(self.player.projectiles, function(p){
        if( self.collision( p.data.x, p.data.y, p.data.width, p.data.height, i.hit_area.x, i.hit_area.y, i.hit_area.width, i.hit_area.height ) && i.hit_area.x > 0 ){
          
          // reset the bad guy
          i.dead();

          // trigger
          self.trigger('kill');

          // Points
          self.model.score += i.data.points;

          // Kill it
          let _index = self.player.projectiles.indexOf(i);
          projectile_gc.push(_index);
        }
      })

      // Check if player dead
      if( self.collision(self.player.hit_area.x, self.player.hit_area.y, self.player.hit_area.width, self.player.hit_area.height, i.hit_area.x, i.hit_area.y, i.hit_area.width, i.hit_area.height ) ){
        
        // Take away some health
        self.model.health -= 10;
        self.trigger('ouch');

        if( self.model.health > 0 ){

          // reset the bad guy
          i.dead();

          // Score
          self.model.score += (i.data.points / 2)

          // Reduce health
          $('#health-bar').css({
            width: self.model.health + "%"
          });

        } else {
          self.player.dead();
        }
      }

    });

    // Animate the BG
    this.background.y += 18;
    if( this.background.y >= this.canvas.height){
      this.background.y = 0;
    }

    // cleanup and remove old bullets
    _.each(projectile_gc, function(i){
      self.player.projectiles.splice(i, 1);
    });

    // Points
    $("#score").text(self.model.score);

	}

  /*
  ------------------------------------------
  | game_over:void (-)
  |
  | WAH WAH WAH.
  ------------------------------------------ */
  game_over() {
    $(this.canvas).fadeOut();
    this.$ui.fadeOut();
    this.trigger('dead');
  }

  /*
  ------------------------------------------
  | collision:void (-)
  |
  | Check for a collision.
  | 
  | This takes two things, the primary obj &
  | the second is the target.
  |
  | 1 = Primary
  | 2 = Target
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