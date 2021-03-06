/*

Copyright (c) 2015 Drew Dahlman

*/

const 	Eventful 		= require('../utils/eventful'),
				Preloader 	= require('../components/Preloader');

class AppModel extends Eventful {

	constructor(data) {
		super();
		
		// Manifest
		this.manifest 		= data.manifest;
		this.characters 	= data.characters;
		this.levels 			= data.levels;

		// Keys
		this.keys 		= {};

		// State
		this.state 		= "";

		// Score
		this.score 		= 0;

		// Health
		this.health 	= 100;
		
		// Level
		this.level 		= "level_1";

		// Setup data
		this.assets = {
			sounds: [],
			graphics: [],
			characters: []	
		}

		// Preloader
		// Use this to load things in
		this.preloader = new Preloader( this );

		// Listeners
		this.preloader.on('asset_loaded', ( data ) => this.asset_loaded(data) );
		this.preloader.on('load_complete', ( data ) => this.package_loaded(data) );
	}

	/*
	------------------------------------------
	| preload:void (-)
	|
	| Will cycle through the manifest and emit
	| an event on asset load. Will load until
	| entire manifest is accounted for.
	|
	| Kind of wild but read it over, and checkout
	| ../utils/preloader.js ( :35 )
	------------------------------------------ */
	preload() {

		// Get our type based on the key in the manifest
		let _type = Object.keys(this.manifest)[this.preloader.package_loaded];

		// Check to see if our total loaded is < our manifest
		if(this.preloader.package_loaded < Object.keys(this.manifest).length){
			this.preloader.load(_type, this.manifest[_type]);
		} else {
			this.trigger('assets_loaded');
		}
	}

	/*
	------------------------------------------
	| asset_loaded:void (-)
	|
	| Fire asset loaded event.
	------------------------------------------ */
	asset_loaded(data) {
		this.trigger('asset_loaded', { total: data.total, loaded: data.loaded });
	}

	/*
	------------------------------------------
	| package_loaded:void (-)
	|
	| When a package from the manifest is complete
	| fire off a complete event, then check to see
	| if there are more files to be loaded.
	------------------------------------------ */
	package_loaded(data) {
		this.trigger('asset_loaded', { message: data.message, total: data.total, loaded: data.loaded });
		this.preload();
	}

	/*
	------------------------------------------
	| reset:void (-)
	|
	| Reset the game.
	------------------------------------------ */
	reset() {
		// Keys
		this.keys 		= {};

		// State
		this.state 		= "";

		// Score
		this.score 		= 0;

		// Health
		this.health 	= 100;
	}
}

module.exports = AppModel;