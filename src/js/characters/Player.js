/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('./utils/_Sprite'),
			SoundManager 	= require('../components/SoundManager');

// Weapons
const Blast         = require('./weapons/Blast'); 

class Player extends BaseCharacter {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super( options );
		let self = this;

		// Player Data
		this.data = {
			height: 187,
			width: 77,
			x: ( self.canvas.width / 2 ) - ( 77 / 2 ),
			y: self.canvas.height - 300,
			left: false,
			right: false,
			speed: 15
		}

		// Pew pew
    this.projectiles = [];

		// Hit area
		this.hit_area = {
			x: this.data.x,
			y: this.data.y,
			width: this.data.width - 50,
			height: this.data.height - 50
		}

		// Player sprite
		this.sprite = new Sprite({
			ctx: this.ctx,
			img: this.model.assets.graphics.vehicles.img, 
			width: this.data.width, 
			height: this.data.height,
			positions: [
				[7,378], // off
				[83.8,378] // on
			],
			color: [ 129, 251, 252 ], // RGB
			glow: 15
		});

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
      x: this.data.x + 10, 
      y: this.data.y
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
	| Update stuff dawg.
	------------------------------------------ */
	update() {
		let self = this;

		// Loop over model keys and take action
		_.each(this.model.keys, function(v, k, i){

			// Left
			if(k == "37" && v){
				self.data.left = true;
			} else if (k == "37" && !v){
				self.data.left = false;
			}

			// Right
			if(k ==  "39" && v){
				self.data.right = true;
			} else if(k == "39" && !v){
				self.data.right = false;
			}

		});

		if(this.data.right){
			if( this.data.x < this.canvas.width - (this.data.width) ){
				this.data.x += this.data.speed;
			}
		}

		if( this.data.left ){
			if( this.data.x > (this.data.width/2) ){
				this.data.x -= this.data.speed;
			}
		}

		this.hit_area.x = this.data.x;
		this.hit_area.y = this.data.y;

		this.render();	
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render!
	------------------------------------------ */
	render() {
		let self = this;
		
		if( this.model.health > 0 ){
			this.sprite.draw(1, this.data.x, this.data.y);
		
			// Debug
			if( window.debug ){
		    self.ctx.rect(
		      self.hit_area.x,
		      self.hit_area.y,
		      self.hit_area.width,
		      self.hit_area.height
		    );

		    self.ctx.strokeStyle = "red";
		    self.ctx.stroke();
			}

		}
	}

	dead() {
		let self = this;

		let death = new SoundManager({
      sound: this.model.assets.sounds.death
    }).play();

    // this.data.y = this.canvas.height + 150;
    setTimeout( function(){
    	self.trigger('death');
    }, 500);
    
	}
}

module.exports = Player;