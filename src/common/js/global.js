/*
 * pwix:cookie-manager/src/common/js/global.js
 */

cookieManager = {
    _conf: {}
};

// make the cookieManager available to each and every package
console.log( 'attaching cookieManager to Meteor global...' );
Meteor.cookieManager = cookieManager;
