/*
 * pwix:cookie-manager/src/common/js/defaults.js
 */

import merge from 'merge';

cookieManager._defaults = {
    dumpUpdate: false,
    verbosity: CM_VERBOSE_NONE
};

cookieManager.conf = merge.recursive( true, cookieManager.conf, cookieManager._defaults );
