/*
 * pwix:cookie-manager/src/common/js/global.js
 */

cookieManager = {
};

// make the cookieManager available to each and every package
console.log( 'Attaching \'cookieManager\' to Meteor global...' );
Meteor.cookieManager = cookieManager;
