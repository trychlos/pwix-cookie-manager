/*
 * pwix:cookie-manager/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
CookieManager._conf = new ReactiveVar( _conf );

const _checkCategories = function( name ){
    const val = CookieManager._conf[name];
    let errs = 0;
    let newvals = [];
    let newcats = {};
    if( !_.isArray( val )){
        console.warn( 'pwix:cookie-manager expects', name, 'be an array, found', val, 'reset to', CookieManager._defaults[name] );
    } else {
        val.every(( it ) => {
            if( !it.id || !_.isString( it.id )){
                console.warn( 'pwix:cookie-manager expects eacnh category have its own identifier, found', it.id, 'removing it' );
            } else {
                newvals.push( it );
                newcats[it.id] = it;
            }
            return true;
        });
        CookieManager._conf[name] = newvals;
        _.merge( CookieManager.Cdyn.Category, CookieManager.C.Category, newcats );
    }
};

const _checkInteger = function( name ){
    const val = CookieManager._conf[name];
    const ival = parseInt( val );
    if( val !== ival ){
        console.warn( 'pwix:cookie-manager expects', name, 'be an integer, found', val, 'reset to', CookieManager._defaults[name] );
        CookieManager._conf[name] = CookieManager._defaults[name];
    }
};

CookieManager._defaults = {
    categories: [],
    consentLifetime: 31536000000,   // one year
    haveRejectAll: true,
    verbosity: CookieManager.C.Verbose.NONE
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
                console.warn( 'pwix:cookie-manager configure() ignore unmanaged key \''+it+'\'' );
            }
        });
        if( Object.keys( built_conf ).length ){
            _conf = _.merge( CookieManager._defaults, _conf, built_conf );
            CookieManager._conf.set( _conf );
            // make sure we have integer where required
            _checkCategories( 'categories' );
            _checkInteger( 'consentLifetime' );
            // be verbose if asked for
            if( _conf.verbosity & CookieManager.C.Verbose.CONFIGURE ){
                console.debug( 'pwix:cookie-manager configure() with', built_conf );
            }
        }
    }
    // also acts as a getter
    return CookieManager._conf.get();
};

_conf = _.merge( {}, CookieManager._defaults );
CookieManager._conf.set( _conf );
