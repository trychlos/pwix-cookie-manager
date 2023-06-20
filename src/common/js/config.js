/*
 * pwix:cookie-manager/src/common/js/config.js
 */

import _ from 'lodash';

const _checkInteger = function( name ){
    const val = cookieManager.conf[name];
    const ival = parseInt( val );
    if( val !== ival ){
        console.warn( 'pwix:cookie-manager expects', name, 'be an integer, found', val, 'reset to', cookieManager._defaults[name] );
        cookieManager.conf[name] = cookieManager._defaults[name];
    }
};

cookieManager = {

    // configuration
    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        _.merge( cookieManager.conf, cookieManager._defaults, o );
        // make sure we have integer where required
        _checkInteger( 'consentLifetime' );
        // be verbose if asked for
        if( cookieManager.conf.verbosity & CM_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:cookie-manager configure() with', o, 'building', cookieManager.conf );
        }
    }
};
// make the cookieManager available to each and every package
console.log( 'make the cookieManager available to each and every package' );
Meteor.cookieManager = cookieManager;
