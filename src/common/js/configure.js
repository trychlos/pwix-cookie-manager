/*
 * pwix:cookie-manager/src/common/js/configure.js
 */

import _ from 'lodash';

import { Logger } from 'meteor/pwix:logger';
import { ReactiveVar } from 'meteor/reactive-var';

const logger = Logger.get();

let _conf = {};
CookieManager._conf = new ReactiveVar( _conf );

const _checkInteger = function( name ){
    const val = CookieManager._conf.get()[name];
    const ival = parseInt( val );
    if( val !== ival ){
        logger.warn( 'checkInteger() expects', name, 'be an integer, found', val, 'reset to', CookieManager._defaults[name] );
        CookieManager._conf.get()[name] = CookieManager._defaults[name];
    }
};

CookieManager._defaults = {
    consentLifetime: 31536000000,   // one year
    haveRejectAll: true,
    verbosity: CookieManager.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both in client and in server
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
CookieManager.configure = function( o ){
    if( o && _.isObject( o )){
        // check that keys exist
        let built_conf = {};
        Object.keys( o ).forEach(( it ) => {
            if( Object.keys( CookieManager._defaults ).includes( it )){
                built_conf[it] = o[it];
            } else {
                logger.warn( 'configure() ignore unmanaged key \''+it+'\'' );
            }
        });
        if( Object.keys( built_conf ).length ){
            _conf = _.merge( CookieManager._defaults, _conf, built_conf );
            CookieManager._conf.set( _conf );
            // make sure we have integer where required
            _checkInteger( 'consentLifetime' );
            logger.verbose({ verbosity: _conf.verbosity, against: CookieManager.C.Verbose.CONFIGURE }, 'configure() with', built_conf );
        }
    }
    // also acts as a getter
    return CookieManager._conf.get();
};

_conf = _.merge( {}, CookieManager._defaults );
CookieManager._conf.set( _conf );
