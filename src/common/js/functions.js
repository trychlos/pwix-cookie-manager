/*
 * pwix:cookie-manager/src/common/js/functions.js
 */

import { Cookie } from '../classes/cookie.class.js';

/**
 * @summary Get the cookie for a given category
 * @locus Anywhere
 * @param {String} category the requested category
 * @returns {Array} the array of Cookies declared in this category
 *  Returns at least an empty array.
 */
CookieManager.byCategory = function( category ){
    let res = [];
    if( !category ){
        console.warn( 'pwix:cookie-manager byCategory() expects a category, found none' );
    } else if( !Object.keys( CookieManager.Cdyn.Category ).includes( category )){
        console.warn( 'pwix:cookie-manager byCategory() expects a known category, found', category );
    } else {
        CookieManager._published.every(( ck ) => {
            if( ck.category() === category ){
                res.push( ck );
            }
            return true;
        });
        return res;
    }
};

/**
 * @summary Dump the localStorage space
 * @locus Anywhere
 */
CookieManager.dumpStorage = function(){
    if( Meteor.isClient ){
        for( let i=0; i < localStorage.length; ++i ){
            console.debug( 'CookieManager.dumpStorage['+i+']', localStorage.key( i ), '"'+localStorage.getItem( localStorage.key( i ))+'"' );
        }
    }
};

/**
 * @summary Set the user authorization of the named cookie
 * @locus Anywhere
 * @param {String} identifier the identifier (responsible/name) of the cookie
 * @param {Boolean} allowed whether the cookie is allowed or not
 */
CookieManager.enable = function( identifier, allowed ){
    if( Meteor.isClient ){
        localStorage.setItem( CM_RESPONSIBLE + CM_SLASH + CM_ENABLED_CK + CM_SLASH + identifier, allowed ? 'true' : 'false' );
    }
};

/**
 * @summary Get the list of enabled cookies
 * @locus Anywhere
 * @returns {Array} the list of enabled cookies
 */
CookieManager.getEnabled = function(){
    let res = [];
    CookieManager._published.every(( c ) => {
        if( c.enable()){
            res.push( c );
        }
        return true;
    });
    return res;
};

/**
 * @summary Says if the identified (responsible/name) cookie is enabled (i.e. authorized) by the user
 * @locus Anywhere
 * @param {String} identifier the identifier (responsible/name) of the cookie
 * @returns {Boolean} whether the cookie has been authorized by the user
 */
CookieManager.isEnabled = function( identifier ){
    let _enabled = true;
    if( Meteor.isClient ){
        const _ckname = STORED_COOKIE_PREFIX + identifier;
        const _stored = localStorage.getItem( _ckname );
        _enabled = ( _stored === null ) ? true : ( _stored === 'true' );
    }
    return _enabled;
};

/**
 * @summary Cookie publication
 * @description This should be called by each application or service which uses a cookie and wants the user accepts it.
 *  Note that this behavior is supposed to be mandatory, and SHOULD be followed by all.
 * @locus Anywhere
 * @param {Object} cookies the cookie description as a javascript object, or an array of cookie descriptions
 */
CookieManager.publish = function( cookies ){
    let ck;
    if( Array.isArray( cookies )){
        cookies.every(( o ) => {
            if( ck = Cookie.Validate( o )){
                //console.debug( 'pushing', ck );
                CookieManager._published.push( ck );
            }
            return true;
        });
    } else if( ck = Cookie.Validate( cookies )){
        //console.debug( 'pushing', ck );
        CookieManager._published.push( ck );
    }
};
