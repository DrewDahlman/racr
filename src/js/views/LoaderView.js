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
    this.ghost_ring = new GhostRing( options );
	}

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Setup and prep for load
  ------------------------------------------ */
  init() {
    
    // Listeners
    this.model.on('asset_loaded', (data) => this.ghost_ring.loaded(data) );
    this.ghost_ring.on('ghost_complete', () => this.start_loading() );
    this.ghost_ring.on('ring_complete', () => this.complete() );
    
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
    this.ghost_ring.update();
  }


  /*
  ------------------------------------------
  | complete:void (-)
  |
  | Loading is complete start the exit.
  ------------------------------------------ */
  complete() {
    this.trigger('load_complete');
  }

}
	
module.exports = LoaderView;