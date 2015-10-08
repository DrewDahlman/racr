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
    this.clu = new Clu( options );
    this.clu2 = new Clu( options );
    this.clu3 = new Clu( options );
    this.gem = new Gem( options );
    this.gem2 = new Gem( options );
    this.gem3 = new Gem( options );

    this.background = {
      x: -111,
      y: 0
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
    this.characters.push(this.clu);
    this.characters.push(this.clu2);
    // this.characters.push(this.clu3);
    this.characters.push(this.gem);
    this.characters.push(this.gem2);
    // this.characters.push(this.gem3);
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
      sound: this.model.assets.sounds.blast_1
    })

    blaster.player.volume = .25;
    blaster.play();

    this.projectiles.push(blast);
  }

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

    // Block 1
    this.ctx.translate(0, this.background.y);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 2);
    this.ctx.fillRect(0, 0, this.canvas.width, -this.canvas.height * 2);
    this.ctx.translate(0, this.background.y * (-1));

    // Block 2
    // this.ctx.translate(0, this.background.y - (this.canvas.height * 2));
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 2);
    // this.ctx.translate(0, this.background.y + (this.canvas.height * 2));


    // update projectiles
    _.each(this.projectiles, function(i){
      i.update();

      if( i.data.y < 0){
        let _index = self.projectiles.indexOf(i);
        projectile_gc.push(_index);
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
          
          // reset the bad guy
          i.dead();

          // trigger
          self.trigger('kill');

          // Points
          self.model.score += i.data.points;

          // Kill it
          let _index = self.projectiles.indexOf(i);
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
    this.background.y += 20;
    if( this.background.y >= this.canvas.height){
      this.background.y = 0;
    }

    // cleanup
    _.each(projectile_gc, function(i){
      self.projectiles.splice(i, 1);
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