/*

Copyright (c) 2015 Drew Dahlman

*/
const Eventful 			= require('../utils/eventful'),
			SoundManager 	= require('../components/SoundManager');

class BaseCharacter extends Eventful {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super();
		
		// Default Props
		this.data = options;
		this.canvas = options.canvas;
		this.ctx = options.ctx;
		this.model = options.model;

		// data
		this.data = {
			height: 180,
			width: 78,
			x: ((Math.random() * options.canvas.width)),
			y: ((Math.random() * options.canvas.height) + 90) * (-1),
			// y: (options.canvas.height / 2) - 150,
			target_x: ((Math.random() * options.canvas.width)),
			target: options.target,
			speed: (Math.random() * 12) + 10,
			points: 10
		}

		// hit area
		this.hit_area = {
			x: this.data.x,
			y: this.data.y,
			width: this.data.width - 50,
			height: this.data.height - 50
		}

		// sprite info
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
		
	}

	/*
	------------------------------------------
	| draw:void (-)
	|
	| Draw stuff.
	------------------------------------------ */
	draw() {

	}

}

module.exports = BaseCharacter;