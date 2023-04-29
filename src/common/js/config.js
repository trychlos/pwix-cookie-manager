/*
 * pwix:cookie-manager/src/common/js/config.js
 */

import merge from 'merge';

cookieManager = {

    // configuration
    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        cookieManager.conf = merge.recursive( true, cookieManager._defaults, o );
        if( cookieManager.conf.verbosity & CM_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:cookie-manager configure() with', o, 'building', cookieManager.conf );
        }
    }
};
// make the cookieManager available to each and every package
console.log( 'make the cookieManager available to each and every package' );
Meteor.cookieManager = cookieManager;
