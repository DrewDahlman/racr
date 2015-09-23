/*

Copyright (c) 2015 Drew Dahlman

*/

class BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
		this.canvas 	= options.canvas;
		this.ctx 			= options.ctx;
		this.$el 			= options.$el;
    this.model    = options.model;
	}

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update some things!.
  ------------------------------------------ */
  update() {

    // Call render
    this.render();
  }
  
  /*
  ------------------------------------------
  | render:void (-)
  |
  | Render.
  ------------------------------------------ */
	render() {

	}
}
	
module.exports = BaseView;