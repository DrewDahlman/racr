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

	}

	/*
	------------------------------------------
	| setup:void (-)
	|
	| Setup!
	------------------------------------------ */

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