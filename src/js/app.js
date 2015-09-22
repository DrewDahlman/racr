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
  	this.data = Data;
  }

}

module.exports = Application;

// Build it!
$(function() { _RACR.instance = new Application(); });