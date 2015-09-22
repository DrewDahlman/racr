/*

Copyright (c) 2015 Drew Dahlman

*/

// Util, etc
let Env = require('./env'),
    Utils = require('./utils/utils'),
    Data = require('./data/data');

class Application {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
  constructor() {

  	/* Assign all the things */
  	this.data = Data;

  }

  /*
  ------------------------------------------
  | load:void (-)
  |
  | Load in what we need.
  ------------------------------------------ */
  load() {
  	
  }

}

module.exports = Application;

// Build it!
$(function() { _RACR.instance = new Application(); });