/*

Copyright (c) 2015 Drew Dahlman

*/

const Eventful = require('../utils/eventful');

class SoundManager extends Eventful {
	
	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Constructor.
	------------------------------------------ */
	constructor(data) {
		super();
		
		// Setup player
		this.player = new Audio(data.sound.src);

		// Loops on Loops
		// this.loop = data.loop || false;
		this.player.loop = data.loop || false;

		// Duration
		this.duration = data.sound.duration;

		// Hack around HTML5 Audio loop issues
		if(data.loop){
			this.player_loop = new Audio(data.sound.src);
		}

		// UGLY but works...
		_RACR.instance.on('mute', () => this.mute() )

		// Listen for end and fire off event
		this.player.addEventListener('ended', () => this.trigger('end') );
	}

	/*
	------------------------------------------
	| play:void (-)
	|
	| Play it!
	------------------------------------------ */
	play() {

		// Mute?
		if(window.mute){
			this.player.volume = 0;
		}

		// Looping things
		if(this.loop){
			this.current_player = "a";
			this.play_loop();
		} else {
			this.player.play();
		}
	}

	/*
	------------------------------------------
	| fade_in:void (-)
	|
	| Fade in.
	------------------------------------------ */
	fade_in(target_vol) {
		let self = this;
		this.vol = target_vol;

		if(!window.mute){
			$(this.player).animate({
				volume: target_vol
			}, function(){
				self.trigger('fade_in');
			});
		}
	}

	/*
	------------------------------------------
	| fade_out:void (-)
	|
	| Fade Out.
	------------------------------------------ */
	fade_out() {
		let self = this;
		$(this.player).animate({
			volume: 0
		}, function() {
			self.trigger('fade_out');
		});
	}

	/*
	------------------------------------------
	| mute:void (-)
	|
	| Mute.
	------------------------------------------ */
	mute() {
		this.fade_out();
		window.mute = true;
	}

	/*
	------------------------------------------
	| un_mute:void (-)
	|
	| Un Mute.
	------------------------------------------ */
	un_mute() {
		this.fade_in(this.vol);
		window.mute = false;
	}

	/*
	------------------------------------------
	| play_loop:void (-)
	|
	| Plays a loop with a weird hack, but ti works.
	------------------------------------------ */
	play_loop() {
		let self = this,
				player = null;

		switch(this.current_player){
			case "a":
				player = this.player;
				this.current_player = "b";
				break;
			case "b":
				player = this.player_loop;
				this.current_player = "a";
				break;
		}

		player.play();

		this.loop_timeout = setTimeout(function(){
			self.play_loop();
		}, this.duration - 1000);
	}

	/*
	------------------------------------------
	| pause:void (-)
	|
	| Pause Playing.
	------------------------------------------ */
	pause() {
		clearTimeout(this.loop_timeout);
		this.player.pause();
		if(this.player_loop){
			this.player_loop.pause();
		}
	}

}

module.exports = SoundManager;