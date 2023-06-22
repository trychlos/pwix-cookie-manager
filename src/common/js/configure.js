/*
 * pwix:cookie-manager/src/common/js/configure.js
 */

import _ from 'lodash';

const _checkInteger = function( name ){
    const val = cookieManager._conf[name];
    const ival = parseInt( val );
    if( val !== ival ){
        console.warn( 'pwix:cookie-manager expects', name, 'be an integer, found', val, 'reset to', cookieManager._defaults[name] );
        cookieManager._conf[name] = cookieManager._defaults[name];
    }
};

cookieManager._defaults = {
    consentLifetime: 31536000000,   // one year
    verbosity: CM_VERBOSE_NONE
};

cookieManager._conf = merge.recursive( true, cookieManager._conf, cookieManager._defaults );

cookieManager.configure = function( o ){
    _.merge( cookieManager._conf, cookieManager._defaults, o );
    // make sure we have integer where required
    _checkInteger( 'consentLifetime' );
    // be verbose if asked for
    if( cookieManager._conf.verbosity & CM_VERBOSE_CONFIGURE ){
        console.debug( 'pwix:cookie-manager configure() with', o, 'building', cookieManager._conf );
    }
};

// make the cookieManager available to each and every package
console.log( 'make the cookieManager available to each and every package' );
Meteor.cookieManager = cookieManager;
