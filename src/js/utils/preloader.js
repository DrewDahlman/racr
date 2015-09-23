/*

Copyright (c) 2015 Drew Dahlman

*/

const Eventful = require('./eventful');

class Preloader extends Eventful{

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | model:model class
  |
  | Construct.
  ------------------------------------------ */
	constructor(model) {
		super();
		this.model 		= model;
		this.loaded 	= 0;
	}

	/*
	------------------------------------------
	| load:void (-)
	|
	| type:string
	|	data:data object
	|
	| Description.
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
			let a = new Audio();
			a.addEventListener('loadeddata', function(){
				self.model.sounds[key] = {src: item.src, duration: (a.duration * 1000)};
				loaded += 1;
				if(loaded == total_load){
					self.loaded += 1;
					self.trigger('load_complete', { message: "Audio Loaded" });
				} else {
					self.trigger('asset_loaded', { message: loaded + " / " + total_load } );
				}
			});
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
			let img = new Image();
			img.onload = function(){
				self.model.graphics[key] = item.src;
				loaded += 1;
				if(loaded == total_load){
					self.loaded += 1;
					self.trigger('load_complete', { message: "Graphics Loaded" });
				} else {
					self.trigger('asset_loaded', { message: loaded + " / " + total_load } );
				}
			}
			img.src = item.src;
		});
	}
}

module.exports = Preloader;