![](public/images/splash.jpg)

## RACR
A game made for the [Denver Dev's](http://denverdevs.com) Code Challenge. Basically Tron, but updated and tweaked out.

## Build
To build and run locally.
- `cd` into project directory
- run `npm install`
- run `bower install`
- run `gulp`
- rock and roll, let'r rip!

## Notes
Some general notes on how things work.

###Data
Data is where character data is held as well as all game assets.

###GameView
GameView is a special view that deals with more details such as collision detection and such.

###Views
Each view is responsible for "characters" it brings characters into existance and calls their update.

###Characters
Each character is responsible for its own state and what it is doing, it can be acted upon by its parent view.

## TODO
- [x] Mute
- [ ] New Enemies
- [ ] Walls
- [x] Create Arena
- [ ] Gameplay
	- [ ] Add intros
- [ ] Data
	- [x] Build character data into objects to consume
	- [x] Integrate character data into new characters
- [ ] Player enhancements
	- [ ] Force Field
	- [ ] Spray Fire
	- [ ] Bombs
	- [x] Move blasters
	- [ ] Injury flair
- [ ] Enemy Enhancements
	- [ ] Bombs
	- [ ] Directions
	- [x] Spawning
	- [ ] Death flair
	- [ ] Enhance AI
- [ ] Cleanup
	- [ ] DRY THAT SHIT UP YO
	- [ ] Clean up character inheritance
	- [ ] Clean up sprites
	- [ ] Clean up gameplay logic