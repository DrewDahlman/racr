/*

Copyright (c) 2015 Drew Dahlman

*/
const Eventful = require('../utils/eventful');

class BaseView extends Eventful {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super();

		this.canvas 	    = options.canvas;
		this.ctx 			    = options.ctx;
		this.$el 			    = options.$el;
    this.model        = options.model;
    this.characters   = [];
	}

  /*
  ------------------------------------------
  | update:void (-)
  |
  | Update some things!.
  ------------------------------------------ */
  update() {

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