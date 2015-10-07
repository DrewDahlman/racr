/*

Copyright (c) 2015 Drew Dahlman

*/

class BaseSprite {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {

		this.ctx = options.ctx;
		this.img = options.img;
		this.width = options.width;
		this.height = options.height;
		this.positions = options.positions;
		this.glow = options.glow;
		this.opacity = options.opacity;
		this.raw_color = options.color;
		this.position = {
			x: 0,
			y: 0
		};
		this.color = function( o ){
			let opacity = o;
    	return "rgba("+this.raw_color[0]+", "+this.raw_color[1]+", "+this.raw_color[2]+", "+opacity+")";
		};

		
	}


}

module.exports = BaseSprite;