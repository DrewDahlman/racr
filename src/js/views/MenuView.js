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
      },0);
    });

    glow.play();
  }
}
	
module.exports = MenuView;