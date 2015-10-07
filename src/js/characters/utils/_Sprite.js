function Sprite( data ){
  this.ctx        = data.ctx;
  this.img        = data.img;
  this.width      = data.width;
  this.height     = data.height;
  this.positions  = data.positions;
  this.glow       = data.glow;
  this.opacity    = data.opacity || 1;
  this.raw_color  = data.color;
  this.position   = {
    x: 0,
    y: 0
  };
  this.color      = function( o ) {
    let opacity = o;
    return "rgba("+this.raw_color[0]+", "+this.raw_color[1]+", "+this.raw_color[2]+", "+opacity+")";
  }; 

  this.enemy      = data.enemy;

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
      let pos = this.positions[position],
          rad = 180 * Math.PI / 180,
          turn = 0,
          _x = x - 25,
          _y = y - 35;

      // Draw a hot trail
      // this.ctx.save();
      this.ctx.translate(_x, _y);

      if( x > this.position.x ){
        turn = 5 * Math.PI / 100;
      }

      if( x < this.position.x ){
        turn = (5 * Math.PI / 100) * (-1);
      }

      if( x == this.position.x ){
        turn = 0 * Math.PI / 100;
      }

      if( !this.enemy ){
        this.ctx.rotate(turn);
      }

      this.ctx.beginPath();
      this.ctx.rect(
        35.5, // X
        this.height - 30, // Y
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
       (this.height - 30), // X1
       (this.height - 30) + (Math.random() * 5), // Y1
       (this.height - 30) + (Math.random() * 5), // X2
       ((this.height -30) + (150 + this.phase())) // Y2
      )

      gradient.addColorStop(0, this.color(1));
      gradient.addColorStop(1, 'rgba(25,28,32,0)');

      // Fill
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Draw the sprite
      this.ctx.beginPath();
      this.ctx.drawImage(
        this.img,
        pos[0],
        pos[1],
        this.width,
        this.height,
        0, 
        0,
        this.width,
        this.height
      );

      // this.ctx.rect(
      //   15,
      //   25,
      //   this.width - 30,
      //   this.height - 50
      // );

      // this.ctx.strokeStyle = "red";
      // this.ctx.stroke();

      // this.ctx.restore();
      
      this.ctx.rotate((turn) * (-1));
      this.ctx.translate(_x * (-1), _y * (-1));

      this.position.x = x;
    },

    // Animate somewhere
    move_to: function(x, y) {

    }
};

module.exports = Sprite;