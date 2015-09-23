/*

Copyright (c) 2015 Drew Dahlman

*/

class Utils {

  /*
  ------------------------------------------
  | transform:string
  |
  | Get a browser specific transform.
  ------------------------------------------ */
  static transform() {
    return Modernizr.prefixed('transform').replace(/([A-Z])/g, function(str, m1) {
      return '-' + m1.toLowerCase();
    }).replace(/^ms-/,'-ms-');
  }

  /*
  ------------------------------------------
  | translate:string
  |
  | Get a browser specific translate.
  ------------------------------------------ */
  static translate(x, y, z = 0) {
    let tran = Modernizr.csstransforms3d === true ? 'translate3d' : 'translate';
    let vals = Modernizr.csstransforms3d === true ? '(' + x + ', ' + y + ', ' + z + ')' : '(' + x + ', ' + y + ')';
    return tran + vals;
  }

  /*
  ------------------------------------------
  | transitionend:string
  |
  | Get a browser specific transitionend.
  ------------------------------------------ */
  static transitionend() {
    let t = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd otransitionend',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    };

    return t[Modernizr.prefixed('transition')];
  }

  /*
  ------------------------------------------
  | stats:void (-)
  |
  | Show stats meter.
  ------------------------------------------ */
  stats( context ) {
    context.stats = new Stats();
    context.stats.setMode(0);
    context.stats.domElement.style.position = 'absolute';
    context.stats.domElement.style.right = '0px';
    context.stats.domElement.style.top = '0px';
    document.body.appendChild( context.stats.domElement );
  }
}

module.exports = Utils;