/*

Copyright (c) 2015 Fruit of the Loom. All Rights Reserved.

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
}

module.exports = Utils;