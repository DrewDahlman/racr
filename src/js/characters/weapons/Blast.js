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
	| phase:void (-)
	|
	| Set phasers to stun.
	------------------------------------------ */


  phase() {
    this.data.multiplier = 20 * Math.sin( this.data.start * 2);
    this.data.start += (Math.random() * 1);
    return this.data.multiplier * Math.sin( this.data.start ) + 15;
  }

	/*
	------------------------------------------
	| update:void (-)
	|
	| Update!
	------------------------------------------ */
	update() {
		this.data.y -= this.data.speed;
		this.render();
	}

	/*
	------------------------------------------
	| render:void (-)
	|
	| Render things!
	------------------------------------------ */
	render() {

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

    //Gradient
    let gradient = this.ctx.createLinearGradient(
     (this.data.x - 35), // X1
     (this.data.x - 35) + (Math.random() * 5), // Y1
     (this.data.x - 35) + (Math.random() * 5), // X2
     ((this.data.x - 35) + (this.data.height + this.phase())) // Y2
    )

    gradient.addColorStop(0, this.color(1));
    gradient.addColorStop(1, 'rgba(25,28,32,0)');

    this.ctx.fillStyle = this.color(1);
    this.ctx.fill();
	}
}

module.exports = Blast;