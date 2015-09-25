/*

Copyright (c) 2015 Drew Dahlman

*/

function Loader( options ) {

	// Props
	this.ctx 						= options.canvas.getContext('2d');
	this.centerX 				= options.canvas.width / 2;
	this.centerY 				= options.canvas.height / 2;
	this.radius 				= options.radius;
	this.start 					= options.start;
	this.end 						= options.end;
	this.stroke 				= options.stroke;
	this.opacity 				= options.opacity;
	this.color 					= options.color;
	this.glow 					= options.glow;
	this.percent 				= options.percent;
	this.percent_loaded = options.percent_loaded || 0;
	this.load_speed 		= options.load_speed || 2;
	this.complete 			= options.complete || {};
	this.fully_loaded 	= false;

	// Methods
	this.stroke_color 	= function() {
		return "rgba("+this.color[0]+","+this.color[1]+", "+this.color[2]+", "+this.opacity+")";
	};
	this.progress 			= function() {
		return this.percent / 100;
	};
}

Loader.prototype = {
	draw: function(){

		// Begin
		this.ctx.beginPath();
		// Arc
		this.ctx.arc(
			this.centerX, 
			this.centerY, 
			this.radius, 
			-this.start, 
			((this.end * this.progress()) - this.start), 
			this.counter
		);

		// Shadow
		this.ctx.shadowOffsetX 	= 0;
		this.ctx.shadowOffsetY 	= 0;
		this.ctx.shadowBlur 		= this.glow;

		// Stoke
		this.ctx.shadowColor 		= this.stroke_color();
		this.ctx.strokeStyle 		= this.stroke_color();
		this.ctx.lineWidth 			= this.stroke;
		this.ctx.lineCap 				= "round";
		this.ctx.stroke();

		// Iterate percentage
		if( this.percent < this.percent_loaded ) {
			this.percent += this.load_speed;
		}

		// If load is complete
		if( this.percent >= this.percent_loaded && !this.fully_loaded) {
			this.fully_loaded = true;
			// call complete
			if( typeof(this.complete) === "function" ){
				this.complete();
			}
		}
	},
	play_out: function() {
		if( this.glow < 55 ){
			this.glow++;
		} else {
			if( this.opacity > 0 ){
				this.glow += 2;
				this.opacity -= .1;
			} else {

			}
		}
		this.draw();
	}
}

module.exports = Loader;