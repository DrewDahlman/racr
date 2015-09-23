/*

Copyright (c) 2015 Drew Dahlman

*/

// Util, etc
const Env 					= require('./env'),
			Eventful 			= require('./utils/eventful'),
    	Utils 				= require('./utils/utils'),
    	Data 					= require('./data/data');

// Components
const SoundManager 	= require('./components/SoundManager');

// Models
const AppModel			= require('./models/AppModel');

// Views
const GameView 			= require('./views/GameView');

class Application extends Eventful {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {  	
  	super();

  	// Build out model
  	this.model = new AppModel( Data );

  	// Let's build the app
  	this.build();
  }

  /*
  ------------------------------------------
  | build:void (-)
  |
  | Build a game!
  ------------------------------------------ */
  build() {
  	// Listen for some inital model events
  	this.model.on('assets_loaded', () => this.intro() );
  	this.model.on('asset_loaded', (data) => console.log(data.message));
  	this.model.preload();
  }

  /*
  ------------------------------------------
  | intro:void (-)
  |
  | Let us bein...
  ------------------------------------------ */
  intro() {

  }

}

module.exports = Application;

// Build it!
$(function() { _RACR.instance = new Application(); });