/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('./utils/Sprite');

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
			x: 0,
			y: 0
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
			glow: 15,
			enemy: true
		})

	}
	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {
		this.sprite.draw(1, this.data.x, this.data.y);
	}
}

module.exports = Clu;