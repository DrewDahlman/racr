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
			},
			click: {
				src: './audio/click.mp3'
			},
			glow: {
				src: './audio/glow.mp3'
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
			},
			scanline_1_3: {
				src: './images/ui/scanline-1x3-trans.png'
			},
			background: {
				src: './images/ui/tile.png'
			}
		}]
	},
	characters: {
		player: {
			name: "",
			height: 187,
			width: 77,
			x: 0,
			y: 0,
			positions: [
				[8,378], // Off
				[84, 378] // On
			]
		}
	}
}

module.exports = data