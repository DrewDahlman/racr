/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView = require('./BaseView');

class LoaderView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( model ) {
    super( model );
    
    // Start the loader
    this.model.preload();

    // this.model.on('assets_loaded', () => this.intro() );
    this.model.on('asset_loaded', (data) => console.log(data.message));
	}
  
}
	
module.exports = LoaderView;