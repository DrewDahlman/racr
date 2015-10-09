/*

Copyright (c) 2015 Drew Dahlman

*/

// Things of the arena
const Wall = require('./Wall');

class Arena {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {

		// Default Props
		this.data = options;
		this.canvas = options.canvas;
		this.ctx = options.ctx;
		this.model = options.model;

		// set a default background position
    this.background = {
      x: -111,
      y: 0
    }

    // Data
    this.data = {
    	speed: 10
    }

    // Walls
    this.walls = [];

    for(let i = 0; i < this.model.levels[this.model.level].walls; i++){
    	
    	// Create our wall
    	let wall = new Wall({ 
    		game: options, 
    		data: { 
    			speed: this.data.speed 
    		}
    	});

    	this.walls.push( wall );
    }
	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update things.
	------------------------------------------ */
	update() {

    // Animate the BG
    this.background.y += this.data.speed;
    if( this.background.y >= this.canvas.height){
      this.background.y = 0;
    }

    this.render_floor();
    this.render_walls();
	}

	/*
	------------------------------------------
	| render_fllow:void (-)
	|
	| Render things.
	------------------------------------------ */
	render_floor() {
		let self = this;

		// draw the floor
    let pattern = this.ctx.createPattern(this.model.assets.graphics.background.img, "repeat");
    this.ctx.fillStyle = pattern;

    // Background
    this.ctx.translate(0, this.background.y);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height * 2);
    this.ctx.fillRect(0, 0, this.canvas.width, -this.canvas.height * 2);
    this.ctx.translate(0, this.background.y * (-1));
	}

	/*
	------------------------------------------
	| render_walls:void (-)
	|
	| Render Walls.
	------------------------------------------ */
	render_walls() {
		let self = this;

    // Walls
    _.each( this.walls, function(w){
    	
    	// Check to ensure each wall is on it's own area
    	let other_walls = _.without( self.walls, w);
    	_.each(other_walls, function(ow){
    		if( self.collision( w.data.x, w.data.y, w.data.width, w.data.height + 200, ow.data.x, ow.data.y, ow.data.width, ow.data.height) ){
    			w.reset();
    		}
    	});

    	// reset the wall if needed
    	if( w.data.y > self.canvas.height + w.data.height ){
    		w.reset();
    	}

    	// update
    	w.update();
    	
    });
	}

  /*
  ------------------------------------------
  | collision:void (-)
  |
  | Check for a collision.
  | 
  | This takes two things, the primary obj &
  | the second is the target.
  |
  | 1 = Primary
  | 2 = Target
  ------------------------------------------ */
  collision( x1, y1, w1, h1, x2, y2, w2, h2 ) {
    w2 += x2;
    w1 += x1;
    if (x2 > w1 || x1 > w2) return false;
    h2 += y2;
    h1 += y1;
    if (y2 > h1 || y1 > h2) return false;
    return true;
  }
}

module.exports = Arena;