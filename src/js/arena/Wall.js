/*

Copyright (c) 2015 Drew Dahlman

*/

class Wall {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		
		// Default Props
		this.canvas = options.game.canvas;
		this.ctx = options.game.ctx;
		this.model = options.game.model;

		// create a random width
		let width = (Math.random() * 450) + 250;

		this.data = {
			x: ( Math.random() * ( options.game.canvas.width ) ),
			y: ( ( Math.random() * ( options.game.canvas.height * 7 ) ) + 150 ) * (-1),
			width: width,
			height: 35,
			speed: options.data.speed
		}
	}

	/*
	------------------------------------------
	| reset:void (-)
	|
	| Rest.
	------------------------------------------ */
	reset() {
		// create a random width
		let width = (Math.random() * (this.canvas.width / 2) ) + 100;

		this.data.x = ( Math.random() * ( this.canvas.width ) );
		this.data.y = ( ( Math.random() * ( this.canvas.height * 7 ) ) + 150 ) * (-1);
		this.data.width = width;
	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update.
	------------------------------------------ */
	update() {

		this.data.y += this.data.speed;

		this.render();
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render.
	------------------------------------------ */
	render() {

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "rgb( 255, 0, 0 )";

		this.ctx.rect(
			this.data.x,
			this.data.y,
			this.data.width,
			this.data.height
		);
		this.ctx.fill();

		// Glow
    this.ctx.shadowOffsetX  = 0;
    this.ctx.shadowOffsetY  = 0;
    this.ctx.shadowBlur     = 15;
    this.ctx.shadowColor    = "rgb( 255, 0, 0 )";
    this.ctx.stroke();
    this.ctx.restore();

	}
}

module.exports = Wall;