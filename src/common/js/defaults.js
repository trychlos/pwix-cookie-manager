/*
 * pwix:cookie-manager/src/common/js/defaults.js
 */

import _ from 'lodash';

cookieManager._defaults = {
    consentLifetime: 31536000000,   // one year
    verbosity: CM_VERBOSE_NONE
};

cookieManager.conf = merge.recursive( true, cookieManager.conf, cookieManager._defaults );
