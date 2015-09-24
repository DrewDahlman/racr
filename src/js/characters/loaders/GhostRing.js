/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('../BaseCharacter');

class GhostRing extends BaseCharacter {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super( options );
		const self = this;

		// Ghost
		this.ghost = {
	    centerX: this.canvas.width / 2,
	    centerY: this.canvas.height / 2,
	    radius: 150,
	    start: Math.PI / 2,
	    end: 2 * Math.PI,
	    counter: false,
	    stroke: .5,
	    opacity: .1,
	    strokeColor: function() {
	    	return 'rgba(129, 251, 252, '+this.opacity+')'
	    },
	    percent: 0,
	    fully_loaded: 100,
	    loaded: false,
	    progress: function(){
	    	return this.percent / 100;
	    },
	    complete: function(){
	    	self.trigger('ghost_complete');
	    }
	  }

		this.ring = {
	    centerX: this.canvas.width / 2,
	    centerY: this.canvas.height / 2,
	    radius: 150,
	    start: Math.PI / 2,
	    end: 2 * Math.PI,
	    counter: false,
	    stroke: 3,
	    opacity: 1,
	    strokeColor: function() {
	    	return 'rgba(129, 251, 252, '+this.opacity+')'
	    },
	    percent: 0,
	    percent_loaded: 10,
	    fully_loaded: 100,
	    loaded: false,
	    glow: 15,
	    final_glow: 55,
	    current_glow: 15,
	    progress: function(){
	    	return this.percent / 100;
	    },
	    complete: function(){
	    	self.trigger('ring_complete');
	    }
	  }

	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {

		this.ctx.beginPath();

		// Arc
		this.ctx.arc(
			this.ghost.centerX, 
			this.ghost.centerY, 
			this.ghost.radius, 
			-this.ghost.start, 
			((this.ghost.end * this.ghost.progress()) - this.ghost.start), 
			this.ghost.counter
		);

		// Shadow
		this.ctx.shadowOffsetX 	= 0;
		this.ctx.shadowOffsetY 	= 0;
		this.ctx.shadowBlur 		= 15;

		// Stoke
		this.ctx.shadowColor 		= this.ring.strokeColor();
		this.ctx.strokeStyle 		= this.ghost.strokeColor();
		this.ctx.lineWidth 			= this.ghost.stroke;
		this.ctx.lineCap 				= "round";
		this.ctx.stroke();

		// Logic around WTF is happening
		if( this.ghost.percent < this.ghost.fully_loaded ){
			this.ghost.percent += 1.5;
		} else if ( this.ghost.percent >= this.ghost.fully_loaded && !this.ghost.loaded ) {
			this.ghost.loaded = true;
			this.ghost.complete();
		}

		// If Ghost has loaded and engine is running we will watch for payloads
		// that are fired off from our model
		if( this.ghost.loaded ) {
			this.ctx.beginPath();

			// Arc
			this.ctx.arc(
				this.ring.centerX, 
				this.ring.centerY, 
				this.ring.radius, 
				-this.ring.start, 
				((this.ring.end * this.ring.progress()) - this.ring.start), 
				this.ring.counter
			);

			// Shadow
			this.ctx.shadowOffsetX 	= 0;
			this.ctx.shadowOffsetY 	= 0;
			this.ctx.shadowBlur 		= this.ring.glow;

			// Stoke
			this.ctx.shadowColor 		= this.ring.strokeColor();
			this.ctx.strokeStyle 		= this.ring.strokeColor();
			this.ctx.lineWidth 			= this.ring.stroke;
			this.ctx.lineCap 				= "round";
			this.ctx.stroke();

			// Smoothly load things in
			if( this.ring.percent < this.ring.percent_loaded ) {
				this.ring.percent += .5;
			} else if ( this.ring.percent >= this.ring.fully_loaded && !this.ring.loaded ){
				this.ring.loaded = true;
			}

			// Animate this thing out
			if( this.ring.loaded ) {
				if( this.ring.glow < this.ring.final_glow ) {
					this.ring.glow++;
				}

				if( this.ring.glow >= (this.ring.final_glow - 10) ) {
					if( this.ring.opacity > 0 ) {
						this.ring.opacity -= .03;
						this.ghost.opacity -= .03;
					} else if( this.ring.opacity <= 0 ) {
						this.ring.complete();
					}
				}
			}
		}

	}

	/*
	------------------------------------------
	| loaded:void (-)
	|
	| Loaded something.
	------------------------------------------ */
	loaded( data ){
		this.ring.percent_loaded = (data.loaded / data.total) * 100;
	}

}

module.exports = GhostRing;