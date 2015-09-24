/*

Copyright (c) 2015 Drew Dahlman

*/

class SoundManager {
	
	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Constructor.
	------------------------------------------ */
	constructor(data) {

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
	}

	/*
	------------------------------------------
	| play:void (-)
	|
	| Play it!
	------------------------------------------ */
	play() {
		if(this.loop){
			this.current_player = "a";
			this.play_loop();
		} else {
			this.player.play();
		}
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