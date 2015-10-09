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
	characters: [{
		name: "Clu",
		height: 180,
		width: 78,
		x: 0,
		y: 0,
		speed: function() {
			return (Math.random() * 12) + 10
		},
		positions: [
			[7,-10], // off
			[80,-10] // on
		],
		color: [ 218, 67, 47 ], // RGB
		glow: 15,
		points: 15,
		hit_area: {
			x: 0,
			y: 0,
			height: 130,
			width: 28
		}
	},{
		name: "Gem",
		height: 180,
		width: 78,
		x: 0,
		y: 0,
		speed: function() {
			return (Math.random() * 12) + 10
		},
		positions: [
			[7,185], // off
			[80,185] // on
		],
		color: [ 200, 47, 218 ], // RGB
		glow: 15,
		points: 15,
		hit_area: {
			x: 0,
			y: 0,
			height: 130,
			width: 28
		}
	},{
		name: "Drewcifer",
		height: 180,
		width: 78,
		x: 0,
		y: 0,
		speed: function() {
			return (Math.random() * 12) + 10
		},
		positions: [
			[7,-10], // off
			[80,-10] // on
		],
		color: [ 252, 210, 129 ], // RGB
		glow: 15,
		points: 15,
		hit_area: {
			x: 0,
			y: 0,
			height: 130,
			width: 28
		}
	},{
		name: "Lucifer",
		height: 180,
		width: 78,
		x: 0,
		y: 0,
		speed: function() {
			return (Math.random() * 12) + 10
		},
		positions: [
			[7,-10], // off
			[80,-10] // on
		],
		color: [ 255, 0, 0 ], // RGB
		glow: 15,
		points: 15,
		hit_area: {
			x: 0,
			y: 0,
			height: 130,
			width: 28
		}
	}]
}

module.exports = data