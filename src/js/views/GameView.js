/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView = require('./BaseView');

// Components
const SoundManager  = require('../components/SoundManager');

class GameView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super( options );
	}

  init() {
    console.log("LETS PLAYYYY")    
  }

  /*
  ------------------------------------------
  | render:void (-)
  |
  | Render.
  ------------------------------------------ */
	render() {
    // super();
	}
}
	
module.exports = GameView;