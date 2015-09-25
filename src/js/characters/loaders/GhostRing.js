/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseCharacter = require('../BaseCharacter'),
			Loader 				= require('./Loader');

class GhostRing extends BaseCharacter {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super( options );
		let self = this;
		
		// Set our state
		this.state = 'pre_loading';

		// Our ghost & ring
		this.ghost = new Loader( {
			canvas: this.canvas, 
			radius: 150, 
			start: Math.PI / 2, 
			end: 2 * Math.PI, 
			stroke: .5, 
			opacity: .1, 
			glow: 15, 
			color: [ 129, 251, 252 ], 
			percent: 0, 
			percent_loaded: 100,
			load_speed: 2,
			complete: function() {
				self.trigger("ghost_complete");
			}
		});

		this.ring = new Loader( {
			canvas: this.canvas, 
			radius: 150, 
			start: Math.PI / 2, 
			end: 2 * Math.PI, 
			stroke: 3, 
			opacity: 1, 
			glow: 15, 
			color: [ 129, 251, 252 ], 
			percent: 0, 
			percent_loaded: 0,
			load_speed: 2,
			complete: function() {
				self.state = "play_out";
			}
		});
		
	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {

		if( this.state == "pre_loading" ) {
			this.ghost.draw();
		}

		if( this.state == "loading" ) {
			this.ghost.draw();
			this.ring.draw();
		}

		if( this.state == "play_out" ){
			this.ghost.play_out();
			this.ring.play_out();
		}

		if( this.ring.opacity <= 0 && this.state != "complete") {
			this.state = "complete";
			this.trigger('ring_complete');
		}

	}

	play_out() {
		console.log('out')
	}

	/*
	------------------------------------------
	| loaded:void (-)
	|
	| Loaded something.
	------------------------------------------ */
	loaded( data ){
		this.ring.percent_loaded = (data.loaded / data.total) * 100;
		this.state = "loading";
	}

}

module.exports = GhostRing;