/*
 * pwix:cookie-manager/src/common/js/global.js
 */

CookieManager = {
};

// make the CookieManager available to each and every package
console.log( 'Attaching \'CookieManager\' to Meteor global...' );
Meteor.CookieManager = CookieManager;
