###

Copyright (c) 2015 Drew Dahlman

###
class SoundManager

	constructor: () ->
		@sounds = []

	addSound: ( source, key ) ->
		@loadSound( source, key )

	loadSound: ( source, key ) ->

		## create our audio object
		audio = new Audio()

		## Set any props
		audio.loop = source.loop || false

		## Listen for load
		audio.addEventListener('loadeddata', () =>
			@sounds[key] = audio
		)

		## Set our source!
		audio.src = source.src

module.exports = SoundManager