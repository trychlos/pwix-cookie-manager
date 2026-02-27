/*
 * pwix:cookie-manager/src/common/js/startup.js
 */

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

Meteor.startup(() => {
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.DUMP }, 'CookieManager', CookieManager );
});
