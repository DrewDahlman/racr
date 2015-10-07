/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('./utils/EvilSprite');

class Clu extends BaseCharacter {

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
			speed: (Math.random() * 15) + 10,
			friction: .95,
			velocity: 0,
			points: 10
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
				[7,-10], // off
				[80,-10] // on
			],
			color: [ 218, 67, 47 ], // RGB
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
		this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
		this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
		this.data.speed = (Math.random() * 15) + 10;
	}
}

module.exports = Clu;