/*
 * pwix:cookie-manager/src/common/js/global.js
 */

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

CookieManager = {
    // the published cookies
    _published: [],
    // the authorization status read from localStorage (null until reading)
    _cookies: null
};

// make the CookieManager available to each and every package
if( Meteor.CookieManager ){
    logger.warn( 'CookieManager is already attached' );
} else {
    logger.log( 'attaching \'CookieManager\' to Meteor global...' );
    Meteor.CookieManager = CookieManager;
}
