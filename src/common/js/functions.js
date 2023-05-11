/*
 * pwix:cookie-manager/src/common/js/functions.js
 */

cookieManager._published = [];

// returns the named cookie, or null
const _findCookie = function( name ){
    let _cookie = null;
    cookieManager._published.every(( c ) => {
        if( c.name === name ){
            _cookie = c;
            return false;
        }
        return true;
    });
    return _cookie;
};

// validate the cookie declaration
const _validDeclaration = function( ck ){
    let _valid = false;
    if( ck ){
        _valid = _validName( ck );
    } else {
        console.warn( 'pwix:cookie-manager expects a cookie declaration, got null' );
    }
    return _valid;
}

// validate the name of the cookie
const _validName = function( ck ){
    let _valid = false;
    if( !ck.name ){
        console.warn( 'pwix:cookie-manager expects cookie declaration have a name, found null' );
    } else if( typeof ck.name !== 'string' && !( ck.name instanceof String )){
        console.warn( 'pwix:cookie-manager expects cookie name be a string, found', ck.name );
    } else {
        _valid = true;
        CM_RESERVED_CHARS.every(( ch ) => {
            if( ck.name.indexOf( ch ) >= 0 ){
                console.warn( 'pwix:cookie-manager found \''+ch+'\' reserved char in name', ck.name );
                _valid = false;
                return false;
            }
            return true;
        })
    }
    return _valid;
}

/**
 * @summary Get the cookie for a given category
 * @locus Anywhere
 * @param {String} category the requested category
 * @returns {Array} the array of cookies declared in this category
 *  Returns at least an empty array.
 */
cookieManager.byCategory = function( category ){
    let res = [];
    if( !category ){
        console.warn( 'pwix:cookie-manager byCategory() expects a category, found none' );
    } else if( !cookieManager.Categories.includes( category )){
        console.warn( 'pwix:cookie-manager byCategory() expects a known category, found', category );
    } else {
        cookieManager._published.every(( c ) => {
            if( c.category === category ){
                res.push( c );
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
cookieManager.dump = function(){
    if( Meteor.isClient ){
        for( let i=0; i < localStorage.length; ++i ){
            console.debug( 'cookieManager.dump() localStorage['+i+']', localStorage.key( i ), '"'+localStorage.getItem( localStorage.key( i ))+'"' );
        }
    }
};

/**
 * @summary Set the user authorization of the named cookie
 * @locus Anywhere
 * @param {String} name the name of the cookie
 * @param {Boolean} allowed whether the cookie is allowed or not
 */
cookieManager.enable = function( name, allowed ){
    if( Meteor.isClient ){
        const _ckname = STORED_COOKIE_PREFIX + name;
        localStorage.setItem( _ckname, allowed ? 'true' : 'false' );
    }
};

/**
 * @summary Get the list of enabled cookies
 * @locus Anywhere
 * @returns {Array} the list of enabled cookies
 */
cookieManager.getEnabled = function(){
    let res = [];
    cookieManager._published.every(( c ) => {
        if( cookieManager.isEnabled( c.name )){
            res.push( c );
        }
        return true;
    });
    return res;
};

/**
 * @summary Says if the named cookie is enabled (i.e. authorized) by the user
 * @locus Anywhere
 * @param {String} name the name of the cookie
 * @returns {Boolean} whether the cookie has been authorized, defaulting to true
 */
cookieManager.isEnabled = function( name ){
    let _enabled = true;
    if( Meteor.isClient ){
        const _ckname = STORED_COOKIE_PREFIX + name;
        const _stored = localStorage.getItem( _ckname );
        _enabled = ( _stored === null ) ? true : ( _stored === 'true' );
    }
    return _enabled;
};

/**
 * @summary Cookie publication
 * @locus Anywhere
 * @param {Object} cookies the cookie object, or an array of cookies objects
 */
cookieManager.publish = function( cookie ){
    if( Array.isArray( cookie )){
        cookie.every(( o ) => {
            if( _validDeclaration( o )){
                cookieManager._published.push( o );
            }
            return true;
        })
    } else if( _validDeclaration( cookie )){
        cookieManager._published.push( cookie );
    }
};

/**
 * @summary Reset the user preferences for the named cookie
 * @locus Anywhere
 * @param {String} name the name of the cookie
 */
cookieManager.reset = function( name ){
    if( Meteor.isClient ){
        const _ckname = STORED_COOKIE_PREFIX + name;
        localStorage.removeItem( _ckname );
    }
};

/**
 * @summary Empty the whole localStorage space
 * @locus Anywhere
 */
cookieManager.removeAll = function(){
    if( Meteor.isClient ){
        let names = [];
        for( let i=0; i < localStorage.length; ++i ){
            names.push( localStorage.key( i ));
        }
        names.every(( n ) => {
            console.debug( 'removing', n );
            localStorage.removeItem( n );
            return true;
        });
    }
};
