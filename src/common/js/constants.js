/*
 * pwix:cookie-manager/src/common/js/constants.js
 */

// exported
//
// verbosity level
CM_VERBOSE_NONE        = 0;
CM_VERBOSE_CONFIGURE   = 0x01 <<  0;
CM_VERBOSE_COMPONENTS  = 0x01 <<  1;
CM_VERBOSE_DUMP        = 0x01 <<  2;
CM_VERBOSE_STORAGE     = 0x01 <<  3;

// categories of cookies
CM_CAT_FUNCTIONALS = 'CM_CAT_FUNCTIONALS';
CM_CAT_MARKETING = 'CM_CAT_MARKETING';
CM_CAT_STATISTICS = 'CM_CAT_STATISTICS';
CM_CAT_TECHNICALS = 'CM_CAT_TECHNICALS';
CM_CAT_THIRD = 'CM_CAT_THIRD';

cookieManager.Categories = [
    CM_CAT_FUNCTIONALS,
    CM_CAT_MARKETING,
    CM_CAT_STATISTICS,
    CM_CAT_TECHNICALS,
    CM_CAT_THIRD
];

// non exported
//
// localStorage data
STORED_PRESENTED = 'pwix:cookie-manager/presented';
STORED_TAB = 'pwix:cookie-manager/active-tab';
STORED_DIALOG_SIZE = 'pwix:cookie-manager/dialog-size'
STORED_COOKIE_PREFIX = 'pwix:cookie-manager/published.cookies/enabled/';
