/*

Copyright (c) 2015 Drew Dahlman

*/

// Util, etc
const Env 					= require('./env'),
			Eventful 			= require('./utils/eventful'),
    	Utils 				= require('./utils/utils'),
    	Data 					= require('./data/data');

// Models
const AppModel			= require('./models/AppModel');

// Components
const SoundManager  = require('./components/SoundManager');

// Views
const LoaderView    = require('./views/LoaderView'),
      MenuView      = require('./views/MenuView'),
      GameView 			= require('./views/GameView');

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
    window.mute = true;

  	// Build out model
  	this.model = new AppModel( Data );

    // Some elements
    this.$el = $("#wrapper");

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

    let self = this;

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

    // Controls
    $(window).keydown( function(event){
      self.model.keys[event.which] = true;
    });

    $(window).keyup( function(event){
      self.model.keys[event.which] = false;
    });

    // Load it up and let'r rip!
    this.init();
  }

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Build a game! Start the engine
  ------------------------------------------ */
  init() {

    // Set our view
    this.view = new LoaderView({
      canvas: this.canvas, 
      ctx: this.ctx, 
      $el: this.$el, 
      model: this.model 
    });

    // Kick off the view
    this.view.init();

    // Listen for the load to complete
    this.view.on('load_complete', () => this.start_game() );
    // this.view.on('load_complete', () => this.play() );

    // Start the engine
    this.render();
  }

  /*
  ------------------------------------------
  | start_game:void (-)
  |
  | Start the game!
  ------------------------------------------ */
  start_game() {

    let self = this;

    // Remove the listener ( keep shit clean yo! )
    this.view.off('load_complete');

    this.view = new MenuView({
      canvas: this.canvas, 
      ctx: this.ctx, 
      $el: this.$el, 
      model: this.model 
    });

    // Start some sweet tunes!
    this.background_sound = new SoundManager({
      sound: this.model.assets.sounds.background, 
      loop: true
    });

    this.background_sound.player.volume = .15;
    this.background_sound.play();

    // Listen to the view
    this.view.on('ready_play', () => $(this.background_sound.player).animate({volume: 0}) )
    this.view.on('play', function(){
      self.background_sound.player.currentTime = 0;
      self.background_sound.fade_in(.15);
      self.view.off('ready_play').off('play');
      self.play();
    })

    // Kick off the view
    this.view.init();

  }

  /*
  ------------------------------------------
  | play:void (-)
  |
  | Game time baby!
  ------------------------------------------ */
  play() {
    let self = this;

    this.view = new GameView({
      canvas: this.canvas, 
      ctx: this.ctx, 
      $el: this.$el, 
      model: this.model 
    });

    this.view.init();

    this.view.on('dead', function(){
      self.model.alive = false;
    });

    this.view.on('kill', function(){
      self.$el.removeClass('glow');
      setTimeout( function() {
        self.$el.addClass('glow');
      },0);
    });
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

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update the current view
    if(this.view){  
      this.view.update();
    }

    //If debug
    if(this.debug){
      this.stats.end();
    }

    if(this.model.alive){
      requestAnimationFrame( () => this.render() );
    }
  }
}

module.exports = Application;

// Build it!
$(function() { _RACR.instance = new Application(); });