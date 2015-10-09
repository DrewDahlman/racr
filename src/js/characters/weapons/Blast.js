const BaseProjectile = require('./BaseProjectile');

class Blast extends BaseProjectile {

	constructor( options ) {
		super( options );

		// Some data
		this.data = {
			x: options.x,
			y: options.y,
			height: 45,
			width: 2,
			speed: 20,
			radius: 0,
			glow: 15,
			color: [ 129, 251, 252 ],
			multiplier: 0,
			start: 0
		}

		this.hit_area = {
			x: options.x,
			y: options.y,
			width: 14,
			height: 45
		}

	}

	/*
	------------------------------------------
	| color:void (-)
	|
	| Returns RGBA.
	------------------------------------------ */
	color(o) {
		let opacity = o;
    return "rgba("+this.data.color[0]+", "+this.data.color[1]+", "+this.data.color[2]+", "+opacity+")";
	}

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update!
	------------------------------------------ */
	update() {
		this.data.y -= this.data.speed;
		this.hit_area.y = this.data.y;
		this.hit_area.x = this.data.x - 5;

		this.render();
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render things!
	------------------------------------------ */
	render() {
		let self = this;

		this.ctx.beginPath();

		// Draw rect
		this.ctx.rect(
			this.data.x,
			this.data.y,
			this.data.width,
			this.data.height
		);

		// Add some glow
		this.ctx.shadowOffsetX = 0;
		this.ctx.shadowOffsetY = 0;
		this.ctx.shadowBlur = this.data.glow;
		this.ctx.shadowColor = this.color(1);
		this.ctx.stroke();

		// Fill
    this.ctx.fillStyle = this.color(1);
    this.ctx.fill();

		// Debug
		if( window.debug ){
	    self.ctx.rect(
	      self.hit_area.x,
	      self.hit_area.y,
	      self.hit_area.width,
	      self.hit_area.height
	    );

	    self.ctx.strokeStyle = "red";
	    self.ctx.stroke();
		}
	}
}

module.exports = Blast;