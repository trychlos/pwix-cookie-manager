/*
 * pwix:cookie-manager/src/common/js/defaults.js
 */

import merge from 'merge';

defaults = {
    conf: {
        allowUnpublished: false,
        verbosity: CM_VERBOSE_NONE
    }
};

cookieManager.conf = merge.recursive( true, cookieManager.conf, defaults.conf );
