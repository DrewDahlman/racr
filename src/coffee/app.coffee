###add

Copyright (c) 2015 Drew Dahlman

###

# Dependencies
Env             = require './env'
AppData         = require './AppData'
SoundManager    = require './utils/SoundManager'

class Application

  ###
  *------------------------------------------*
  | constructor:void (-)
  |
  | Construct.
  *----------------------------------------###
  constructor: ->
    _this = @
    @data = AppData
    @SoundManager = new SoundManager()

    ## Preload some data dawg
    _.each(@data.audio, (i,k) =>
      @SoundManager.addSound( i, k )
    )

module.exports = Application

$ ->
  # instance
  _RACR.instance = new Application()