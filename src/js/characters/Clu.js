/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseEvilPlayer 	= require('./BaseEvilPlayer'),
			Sprite 					= require('./utils/EvilSprite'),
			SoundManager 		= require('../components/SoundManager');

class Clu extends BaseEvilPlayer {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super( options );
	}
}

module.exports = Clu;