/*

Copyright (c) 2015 Drew Dahlman

--
This file contains all assets that are used in the game as well as
all configurations for characters and levels.

*/

const data = {
	manifest: {
		audio: [{
			background: {
				src: './audio/background_b.mp3'
			},
			death: {
				src: './audio/death.mp3'
			},
			blast_1: {
				src: './audio/blast_1.mp3'
			},
			blast_2: {
				src: './audio/blast_2.mp3'
			},
			blast_3: {
				src: './audio/blast_3.mp3'
			}
		}],
		graphics: [{
			splash: {
				src: './images/splash.jpg'
			},
			vehicles: {
				src: './images/vehicle_assets.png'
			},
			test1: {
				src: './images/test/test1.jpg'
			},
			test2: {
				src: './images/test/test2.jpg'
			}
		}]
	}
}

module.exports = data