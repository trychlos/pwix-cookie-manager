/*
 * pwix:cookie-manager/src/common/js/config.js
 */

import merge from 'merge';

cookieManager = {

    // configuration
    conf: {},

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        cookieManager.conf = merge.recursive( true, cookieManager.conf, o );
        if( cookieManager.conf.verbosity & CM_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:cookie-manager configure() with', o, 'building', cookieManager.conf );
        }
    }
};
