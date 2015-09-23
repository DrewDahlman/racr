/*

Copyright (c) 2015 Drew Dahlman

*/

const BaseModel 	= require('./BaseModel'),
			Preloader 	= require('../utils/preloader');

class AppModel extends BaseModel {

	constructor(data) {
		super(data);

		this.manifest 		= data.manifest;
		this.sounds 			= [];
		this.graphics 		= [];
		this.characters 	= [];
		this.preloader 		= new Preloader( this );

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
	| ../utils/preloader.js
	------------------------------------------ */
	preload() {

		// Get our type based on the key in the manifest
		let _type = Object.keys(this.manifest)[this.preloader.loaded];

		// Check to see if our total loaded is < our manifest
		if(this.preloader.loaded < Object.keys(this.manifest).length){
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
		this.trigger('asset_loaded', { message: data.message });
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
		this.trigger('asset_loaded', { message: data.message });
		this.preload();
	}
}

module.exports = AppModel;