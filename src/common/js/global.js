/*
 * pwix:cookie-manager/src/common/js/global.js
 */

CookieManager = {
    // the published cookies
    _published: [],
    // the authorization status read from localStorage (null until reading)
    _cookies: null
};

// make the CookieManager available to each and every package
console.log( 'Attaching \'CookieManager\' to Meteor global...' );
Meteor.CookieManager = CookieManager;
