class BaseProjectile {

	constructor( options ) {

		// Canvas things
		this.canvas = options.canvas;
		this.ctx 		= options.ctx;
		this.data 	= {};

	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update!
	------------------------------------------ */
	update() {

	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render things!
	------------------------------------------ */
	render() {

	}
}

module.exports = BaseProjectile;