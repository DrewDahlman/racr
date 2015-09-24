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

    // Add the template
    this.$template = $(JST['menu']());
    this.$el.append(this.$template);
    setTimeout( () => this.$template.addClass('show') ,0);

    // Add listeners
    let click = new SoundManager({sound: self.model.assets.sounds.click});
    $(".button", this.$template).on('mouseover', function(){
      click.play();
    });

    $("#play").on('click', function(){
      self.play();
    });

    $("#how-to").on('click', function(){
      console.log("how to")
    });

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

  /*
  ------------------------------------------
  | play:void (-)
  |
  | Let's play!
  ------------------------------------------ */
  play() {
    let self = this,
        glow = new SoundManager({sound: this.model.assets.sounds.death });

    // trigger a transition out
    this.trigger('ready_play');
    this.$template.removeClass('show');

    glow.on('end', function(){
      setTimeout( function() {
        self.trigger('play');
      },1000);
    });

    glow.play();
  }
}
	
module.exports = MenuView;