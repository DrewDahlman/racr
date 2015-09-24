/*

Copyright (c) 2015 Drew Dahlman

*/

const Eventful = require('../utils/eventful');

class Preloader extends Eventful {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | model:model class
  |
  | Construct.
  ------------------------------------------ */
	constructor( model ) {
		super();
		const self 		= this;
		this.model 		= model;
		this.package_loaded = 0;
		this.loaded 	= 0;
		this.total 		= 0;

		// Get our TOTAL manifest
		_.each(this.model.manifest, function(i){
			_.each(i[0], function(){
				self.total++;
			});
		});

	}

	/*
	------------------------------------------
	| load:void (-)
	|
	| type:string
	|	data:data object
	|
	| Evaliate the type ( string ) and call
	| approriate loader.
	------------------------------------------ */
	load(type, data) {
		switch(type){
			case "audio":
				this.load_audio(data);
			case "graphics":
				this.load_graphics(data);
		}
	}

  /*
  ------------------------------------------
  | load_audio:void (-)
  |
  |	data:audio object
  | audio: { track_name: { src: 'audio_source' }}
  |
  | Loads the audio from an object.
  ------------------------------------------ */
	load_audio( data ) {

		// Create some vars to use
		let total_load = Object.keys(data[0]).length,
				loaded = 0,
				self = this;

		// Loop over all of the data and load it up
		_.each(data[0], function(item, key){

			// Create an Audio element
			let a = new Audio();

			// Listen for the data to load
			a.addEventListener('loadeddata', function(){

				// Push that data into the model
				self.model.assets.sounds[key] = {src: item.src, duration: (a.duration * 1000)};

				// Iterate on how much has loaded
				loaded += 1;
				self.loaded++;

				// If complete or not
				if(loaded == total_load){

					// Set loaded +1 ( total )
					loaded++;
					self.package_loaded++;

					// Fire off complete event
					self.trigger('load_complete', { message: "Audio Loaded", total: self.total, loaded: self.loaded });
				} else {

					// Fire off loaded event
					self.trigger('asset_loaded', { total: self.total, loaded: self.loaded } );
				}
			});

			// Set the source
			a.src = item.src;
		});
	}

	/*
	------------------------------------------
	| load_graphics:void (-)
  |
  |	data:audio object
  | graphics: { asset_group: { src: 'image_source' }}
  |
	| Load in the graphics.
	------------------------------------------ */
	load_graphics( data ) {
		// Create some vars to use
		let total_load = Object.keys(data[0]).length,
				loaded = 0,
				self = this;

		// Loop over all of the data and load it up
		_.each(data[0], function(item, key){

			// Create image element
			let img = new Image();

			// Listen for load event
			img.onload = function(){

				// Push data into model
				self.model.assets.graphics[key] = item.src;

				// Iterate loaded
				loaded += 1;
				self.loaded++;

				// If complete or not
				if(loaded == total_load){

					// Set loaded +1 ( total )
					loaded++;
					self.package_loaded++;

					// Fire off complete event
					self.trigger('load_complete', { message: "Graphics Loaded", total: self.total, loaded: self.loaded });
				} else {

					// Fire off loaded event
					self.trigger('asset_loaded', { total: self.total, loaded: self.loaded } );
				}
			}

			// Assign the source
			img.src = item.src;
		});
	}
}

module.exports = Preloader;