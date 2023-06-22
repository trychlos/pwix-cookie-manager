/*
 * pwix:cookie-manager/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( cookieManager._conf.verbosity & CM_VERBOSE_DUMP ){
        console.debug( 'cookieManager', cookieManager );
    }
});
