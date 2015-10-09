/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('./utils/EvilSprite'),
			SoundManager 	= require('../components/SoundManager');

class Gem extends BaseCharacter {

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
			height: 180,
			width: 78,
			x: ((Math.random() * options.canvas.width)),
			y: ((Math.random() * options.canvas.height) + 90) * (-1),
			// y: (options.canvas.height / 2) - 150,
			target_x: ((Math.random() * options.canvas.width)),
			target: options.target,
			speed: (Math.random() * 12) + 10,
			points: 15
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
				[7,185], // off
				[80,185] // on
			],
			color: [ 200, 47, 218 ], // RGB
			glow: 15
		})

	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {
		this.data.x = this.data.target_x;
		this.hit_area.x = this.data.x;
		this.hit_area.y = this.data.y;

		// Render it
		this.render();
		// console.log(distance, force, this.data.velocity, this.data.x)
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render.
	------------------------------------------ */
	render() {
		// this.data.x = this.data.target.data.x;
		this.data.y += this.data.speed;
		this.sprite.draw(1, this.data.x, this.data.y);

		if( this.data.y > this.canvas.height + 144 ){
			this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
			this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
			this.data.speed = (Math.random() * 15) + 10;
		}

	}

	dead() {
		let death = new SoundManager({
      sound: this.model.assets.sounds.death
    }).play();

		this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
		this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
		this.data.speed = (Math.random() * 12) + 10;
	}

	reset() {
		this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
		this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
		this.data.speed = (Math.random() * 12) + 10;
	}
}

module.exports = Gem;