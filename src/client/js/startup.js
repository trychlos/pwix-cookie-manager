/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( cookieManager.conf.verbosity & CM_VERBOSE_STORAGE ){
        cookieManager.dump();
    }
});
