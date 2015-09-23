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
		this.canvas 	= options.canvas
		this.ctx 			= this.canvas.getContext('2d')
		this.$el 			= options.$el
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