/*

Copyright (c) 2015 Drew Dahlman

*/
const Eventful = require('../utils/eventful');

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
		this.canvas = options.canvas;
		this.ctx = options.ctx;

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