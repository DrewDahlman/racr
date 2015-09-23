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
const GameView 			= require('./views/GameView'),
      LoaderView    = require('./views/LoaderView');

class Application extends Eventful {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {  	
  	super();

    // DEBUG
    this.debug = true;

  	// Build out model
  	this.model = new AppModel( Data );

  	// Let's build the app
  	this.setup();
  }

  /*
  ------------------------------------------
  | setup:void (-)
  |
  | Setup do anything we need.
  ------------------------------------------ */
  setup() {

    // Some elements
    this.$el = $("#wrapper")

    // Our game canvas
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.height = this.$el.height();
    this.canvas.width = this.$el.width();

    // Append the canvas to the wrapper
    this.$el.html(this.canvas);

    if(this.debug){
      new Utils().stats(this);
    }

    // Load it up and let'r rip!
    this.load();
  }

  /*
  ------------------------------------------
  | build:void (-)
  |
  | Build a game!
  ------------------------------------------ */
  load() {

    // Set our view
    this.view = new LoaderView({
      canvas: this.canvas, 
      ctx: this.ctx, 
      $el: this.$el, 
      model: this.model 
    });

    // Kickoff our render frame
    this.render();
  }

  /*
  ------------------------------------------
  | render:void (-)
  |
  | One method to rule them all.
  ------------------------------------------ */
  render() {

    // If debug
    if(this.debug){
      this.stats.begin();
    }

    // Update the current view
    if(this.view){  
      this.view.update();
    }

    //If debug
    if(this.debug){
      this.stats.end();
    }

    requestAnimationFrame( () => this.render() );
  }
}

module.exports = Application;

// Build it!
$(function() { _RACR.instance = new Application(); });