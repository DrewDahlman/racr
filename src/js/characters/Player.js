/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('./BaseCharacter'),
			Sprite 				= require('../utils/sprite');

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
			y: ( self.canvas.height / 2 ) - ( 187 / 2 )
		}

		this.sprite = new Sprite(
			this.model.assets.graphics.vehicles.img, 
			this.data.width, 
			this.data.height,
			[
				[8,378],
				[84,378]
			]
		)

	}
	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {
		this.sprite.draw(this.ctx, 0, this.data.x, this.data.y)
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

module.exports = Player;