/*

Copyright (c) 2015 Drew Dahlman

*/
class Arena {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {

		// Default Props
		this.data = options;
		this.canvas = options.canvas;
		this.ctx = options.ctx;
		this.model = options.model;

		// set a default background position
    this.background = {
      x: -111,
      y: 0
    }

	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update things.
	------------------------------------------ */
	update() {
    // Animate the BG
    this.background.y += 10;
    if( this.background.y >= this.canvas.height){
      this.background.y = 0;
    }

    this.render();
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render things.
	------------------------------------------ */
	render() {
		// draw the floor
    let pattern = this.ctx.createPattern(this.model.assets.graphics.background.img, "repeat");
    this.ctx.fillStyle = pattern;

    // Background
    this.ctx.translate(0, this.background.y);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 2);
    this.ctx.fillRect(0, 0, this.canvas.width, -this.canvas.height * 2);
    this.ctx.translate(0, this.background.y * (-1));
	}
}

module.exports = Arena;