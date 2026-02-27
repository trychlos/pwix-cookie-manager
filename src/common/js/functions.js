/*
 * pwix:cookie-manager/src/common/js/functions.js
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Logger } from 'meteor/pwix:logger';

import { Cookie } from '../classes/cookie.class.js';

const logger = Logger.get();

/**
 * @summary Get the cookie for a given category
 * @locus Anywhere
 * @param {String} category the requested category
 * @returns {Array} the array of Cookies declared in this category
 *  Returns at least an empty array.
 */
CookieManager.byCategory = function( category ){
    let res = [];
    assert.ok( category && _.isString( category ), 'pwix:cookie-manager byCategory() expects a category, got', category );
    CookieManager._published.every(( ck ) => {
        const cat = ck.category();
        if( cat.id === category ){
            res.push( ck );
        }
        return true;
    });
    return res;
};

/**
 * @summary Dump the localStorage space
 * @locus Anywhere
 */
CookieManager.dumpStorage = function(){
    if( Meteor.isClient ){
        for( let i=0; i < localStorage.length; ++i ){
            logger.debug( 'CookieManager.dumpStorage['+i+']', localStorage.key( i ), '"'+localStorage.getItem( localStorage.key( i ))+'"' );
        }
    }
};

/**
 * @summary Find a cookie
 * @locus Anywhere
 * @param {String} responsible
 * @param {String} name
 * @returns {Cookie} the cookie
 */
CookieManager.get = function( responsible, name ){
    let found = null;
    CookieManager._published.every(( c ) => {
        if( c.responsible() === responsible && c.name() === name ){
            found = c;
            return false;
        }
        return true;
    });
    return found;
};

/**
 * @summary Get the list of enabled cookies
 * @locus Anywhere
 * @returns {Array} the list of enabled cookies
 */
CookieManager.getEnabled = function(){
    let res = [];
    CookieManager._published.every(( c ) => {
        if( c.enabled()){
            res.push( c );
        }
        return true;
    });
    return res;
};

/**
 * @summary Cookie publication
 * @description This should be called by each application or service which uses a cookie and wants the user accepts (or refuses) it.
 *  Note that this behavior is supposed to be mandatory, and SHOULD be followed by all.
 *  If a default value if provided, it is honored if the cookie is enabled.
 * @locus Anywhere
 * @param {Objec|Array<Object>} cookies the cookie description as a javascript object, or an array of cookie descriptions
 * @returns {Cookie|Array<Cookie>} the instanciated cookies
 */
CookieManager.publish = function( cookies ){
    // an array
    if( Array.isArray( cookies )){
        let res = [];
        let ck;
        cookies.every(( o ) => {
            if( ck = Cookie.Validate( o )){
                CookieManager._published.push( ck );
                res.push( ck );
            }
            return true;
        });
        return res;
    }
    // a single object
    let ck = null;
    if( ck = Cookie.Validate( cookies )){
        CookieManager._published.push( ck );
    }
    return ck;
};
