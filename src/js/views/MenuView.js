/*

Copyright (c) 2015 Drew Dahlman

*/
const BaseView = require('./BaseView');

// Components
const SoundManager  = require('../components/SoundManager');

class MenuView extends BaseView {

  /*
  ------------------------------------------
  | constructor:void (-)
  |
  | Construct.
  ------------------------------------------ */
	constructor( options ) {
    super( options );
	}

  /*
  ------------------------------------------
  | init:void (-)
  |
  | Init!
  ------------------------------------------ */
  init() {
    const self = this;

    this.$template = $(JST['menu']());
    this.$el.append(this.$template);
    setTimeout( () => this.$template.addClass('show') ,0);

    console.log(this.model)

    $(window).keypress( function(e) {
      let s = null;

      console.log(e.which)
      
      switch(e.which){
        case 32:
            s = new SoundManager({
              sound: self.model.assets.sounds.blast_1
            }).play();
          break;
        case 118:
            s = new SoundManager({
              sound: self.model.assets.sounds.blast_2
            }).play();
          break;
        case 99:
            s = new SoundManager({
              sound: self.model.assets.sounds.blast_3
            }).play();
          break;
        case 120:
            s = new SoundManager({
              sound: self.model.assets.sounds.death
            }).play();
          break;
      }

    });
  }
}
	
module.exports = MenuView;