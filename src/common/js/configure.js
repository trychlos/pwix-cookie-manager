/*
 * pwix:cookie-manager/src/common/js/configure.js
 */

import _ from 'lodash';

CookieManager._conf = {};

const _checkInteger = function( name ){
    const val = CookieManager._conf[name];
    const ival = parseInt( val );
    if( val !== ival ){
        console.warn( 'pwix:cookie-manager expects', name, 'be an integer, found', val, 'reset to', CookieManager._defaults[name] );
        CookieManager._conf[name] = CookieManager._defaults[name];
    }
};

CookieManager._defaults = {
    consentLifetime: 31536000000,   // one year
    verbosity: CM_VERBOSE_NONE
};

_.merge( CookieManager._conf, CookieManager._defaults );

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both in client and in server
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
CookieManager.configure = function( o ){
    if( o && _.isObject( o )){
        _.merge( CookieManager._conf, CookieManager._defaults, o );
        // make sure we have integer where required
        _checkInteger( 'consentLifetime' );
        // be verbose if asked for
        if( CookieManager._conf.verbosity & CM_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:cookie-manager configure() with', o, 'building', CookieManager._conf );
        }
    }
    // also acts as a getter
    return CookieManager._conf;
};
