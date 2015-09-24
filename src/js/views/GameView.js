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
    console.log(this.model.assets.sounds)
    let bg = new SoundManager({sound: this.model.assets.sounds.background, loop: true}).play();
    
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