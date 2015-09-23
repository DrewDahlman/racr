/*

Copyright (c) 2015 Drew Dahlman

*/
const Eventful = require('../utils/eventful');

class BaseModel extends Eventful {

	/*
  ------------------------------------------
  | constructor:void (-)
  |
  | data:object - data
  |
  | Construct.
  ------------------------------------------ */
	constructor( data ) {

		super();

		// Defaults
		this.data = data || {};
	}

}

module.exports = BaseModel;