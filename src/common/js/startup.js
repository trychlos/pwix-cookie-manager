/*
 * pwix:cookie-manager/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( CookieManager.configure().verbosity & CookieManager.C.Verbose.DUMP ){
        console.debug( 'CookieManager', CookieManager );
    }
});
