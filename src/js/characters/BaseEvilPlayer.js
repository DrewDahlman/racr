/*

Copyright (c) 2015 Drew Dahlman

*/
const Eventful 			= require('../utils/eventful'),
			Sprite 				= require('./utils/EvilSprite'),
			SoundManager 	= require('../components/SoundManager');

class BaseEvilPlayer extends Eventful {

	/*
	------------------------------------------
	| constructor:void (-)
	|
	| Construct.
	------------------------------------------ */
	constructor( options ) {
		super();
		
		// Default Props
		this.raw_data 	= options.data;
		this.canvas 		= options.game.canvas;
		this.ctx 				= options.game.ctx;
		this.model 			= options.game.model;

		// data
		this.data = {
			height: options.data.height,
			width: options.data.width,
			x: ((Math.random() * options.game.canvas.width)),
			y: ((Math.random() * options.game.canvas.height) + 290) * (-1),
			target_x: ((Math.random() * options.game.canvas.width)),
			target: options.target,
			speed: options.data.speed(),
			points: options.data.points
		}

		// hit area
		this.hit_area = {
			x: this.data.x,
			y: this.data.y,
			width: options.data.hit_area.width,
			height: options.data.hit_area.height
		}

		// sprite info
		this.sprite = new Sprite({
			ctx: this.ctx,
			img: options.game.model.assets.graphics.vehicles.img, 
			width: options.data.width, 
			height: options.data.height,
			positions: options.data.positions,
			color: options.data.color,
			glow: options.data.glow
		})

		return;
	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update stuff dawg.
	------------------------------------------ */
	update() {
		this.data.x = this.data.target_x;
		this.hit_area.x = this.data.x;
		this.hit_area.y = this.data.y;
		
		// Render it
		this.render();
	}

	/*
	------------------------------------------
	| draw:void (-)
	|
	| Draw stuff.
	------------------------------------------ */
	render() {
		let self = this;

		this.data.y += this.data.speed;
		this.sprite.draw(1, this.data.x, this.data.y);

		if( this.data.y > this.canvas.height + 144 ){
			this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
			this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
			this.data.speed = (Math.random() * 15) + 10;
		}

		// Debug
    if( window.debug ){
      self.ctx.rect(
        this.hit_area.x,
        this.hit_area.y,
        this.hit_area.width,
        this.hit_area.height
      );

      self.ctx.strokeStyle = "red";
      self.ctx.stroke();
    }

		return;
	}

	/*
	------------------------------------------
	| dead:void (-)
	|
	| You dead homie.
	------------------------------------------ */
	dead() {
		let death = new SoundManager({
      sound: this.model.assets.sounds.death
    }).play();

		this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
		this.data.target_x = ((Math.random() * (this.canvas.width - 144)));
		this.data.speed = this.raw_data.speed();

		return;
	}

	/*
	------------------------------------------
	| reset:void (-)
	|
	| Sometimes we just need to reset things
	| before it gets wild.
	------------------------------------------ */
	reset() {
		this.data.y = ((Math.random() * this.canvas.height) + 90) * (-1);
		this.data.target_x = Math.random() * this.canvas.width;
		this.data.speed = this.raw_data.speed();

		return
	}

}

module.exports = BaseEvilPlayer;