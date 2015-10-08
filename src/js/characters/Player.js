/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('./utils/_Sprite'),
			SoundManager 	= require('../components/SoundManager');

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

		this.data = {
			height: 187,
			width: 77,
			x: ( self.canvas.width / 2 ) - ( 77 / 2 ),
			y: self.canvas.height - 300,
			left: false,
			right: false,
			speed: 15
		}

		this.hit_area = {
			x: this.data.x,
			y: this.data.y,
			width: this.data.width - 50,
			height: this.data.height - 50
		}

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
			if( this.data.x > this.data.width ){
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
		if( this.model.health > 0 ){
			this.sprite.draw(1, this.data.x, this.data.y);
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