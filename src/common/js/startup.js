/*
 * pwix:cookie-manager/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.DUMP ){
        console.debug( 'CookieManager', CookieManager );
    }
});
