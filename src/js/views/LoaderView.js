/*

Copyright (c) 2015 Drew Dahlman

*/

const BaseView = require('./BaseView');

// Characters
const GhostRing = require('../characters/loaders/GhostRing');

class LoaderView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super( options );

    // Characters
    this.ghost = new GhostRing( options );
	}

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Setup and prep for load
  ------------------------------------------ */
  init() {
    
    // Listeners
    this.model.on('asset_loaded', (data) => this.ghost.loaded(data) );
    this.ghost.on('ghost_complete', () => this.start_loading() );
    this.ghost.on('ring_complete', () => this.complete() );

    this.ghost.update();
  }
  /*
  ------------------------------------------
  | start_loading:void (-)
  |
  | Ready to start loading.
  ------------------------------------------ */
  start_loading(){
    // Start the loader
    this.model.preload();
  }

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update those things dawg!
  ------------------------------------------ */
  update() {
    this.ghost.update();
  }


  /*
  ------------------------------------------
  | complete:void (-)
  |
  | Loading is complete start the exit.
  ------------------------------------------ */
  complete() {
    // console.log('playout')
    this.trigger('load_complete');
  }

}
	
module.exports = LoaderView;