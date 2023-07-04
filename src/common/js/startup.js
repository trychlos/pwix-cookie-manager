/*
 * pwix:cookie-manager/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( CookieManager._conf.verbosity & CM_VERBOSE_DUMP ){
        console.debug( 'CookieManager', CookieManager );
    }
});
