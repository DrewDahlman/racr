function Sprite( data ){
  this.ctx        = data.ctx;
  this.img        = data.img;
  this.width      = data.width;
  this.height     = data.height;
  this.positions  = data.positions;
  this.glow       = data.glow;
  this.opacity    = data.opacity || 1;
  this.raw_color  = data.color;
  this.color      = function( o ) {
    let opacity = o;
    return "rgba("+this.raw_color[0]+", "+this.raw_color[1]+", "+this.raw_color[2]+", "+opacity+")";
  };

  this.multiplier = 0;
  this.start = 0;

  this.phase = function(){
    this.multiplier = 20 * Math.sin( this.start * 2);
    this.start += (Math.random() * 1);
    return this.multiplier * Math.sin( this.start ) + 15;
  }
}
Sprite.prototype = {
  draw: function(position, x, y){

      // Position is is an index in an array for the sprite
      let pos = this.positions[position];

      // Draw a hot trail
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.rect(
        x + 37.5, // X
        y + (this.height - 30), // Y
        this.width - 70, // Width
        250 // Height
      );

      // Glow
      this.ctx.shadowOffsetX  = 0;
      this.ctx.shadowOffsetY  = 0;
      this.ctx.shadowBlur     = this.glow;
      this.ctx.shadowColor    = this.color(1);
      this.ctx.stroke();

      //Gradient
      let gradient = this.ctx.createLinearGradient(
        y + (this.height - 30), // X1
        y + (this.height - 30) + (Math.random() * 5), // Y1
        y + (this.height - 30) + (Math.random() * 5), // X2
        y + ((this.height -30) + (230 + this.phase())) // Y2
      )

      gradient.addColorStop(0, this.color(1));
      gradient.addColorStop(1, 'rgba(25,28,32,0)');

      // Fill
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.restore();

      this.ctx.beginPath();
      // Draw the sprite
      this.ctx.drawImage(
        this.img,
        pos[0],
        pos[1],
        this.width,
        this.height,
        x, 
        y,
        this.width,
        this.height
      );

    },

    // Animate somewhere
    move_to: function(x, y) {

    }
};

module.exports = Sprite;