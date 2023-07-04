/*
 * pwix:cookie-manager/src/common/js/constants.js
 */

CookieManager.C = {

    // verbosity levels
    Verbose: {
        NONE: 0,
        CONFIGURE:  0x01 <<  0,
        COMPONENTS: 0x01 <<  1,
        DUMP:       0x01 <<  2,
        STORAGE:    0x01 <<  3
    }
};

// exported
//
// verbosity level
CookieManager.C.Verbose.NONE        = 0;
CookieManager.C.Verbose.CONFIGURE   = 0x01 <<  0;
CookieManager.C.Verbose.COMPONENTS  = 0x01 <<  1;
CookieManager.C.Verbose.DUMP        = 0x01 <<  2;
CookieManager.C.Verbose.STORAGE     = 0x01 <<  3;

// categories of cookies
CM_CAT_FUNCTIONALS = 'CM_CAT_FUNCTIONALS';
CM_CAT_MARKETING = 'CM_CAT_MARKETING';
CM_CAT_STATISTICS = 'CM_CAT_STATISTICS';
CM_CAT_TECHNICALS = 'CM_CAT_TECHNICALS';
CM_CAT_THIRD = 'CM_CAT_THIRD';

CookieManager.Categories = [
    CM_CAT_FUNCTIONALS,
    CM_CAT_MARKETING,
    CM_CAT_STATISTICS,
    CM_CAT_TECHNICALS,
    CM_CAT_THIRD
];

// non exported
//
// localStorage data
STORED_USER_CONSENT = 'pwix:cookie-manager/user-consent';
STORED_DIALOG_SIZE = 'pwix:cookie-manager/consent-manager-size'
STORED_COOKIE_PREFIX = 'pwix:cookie-manager/enabled/';

// reserved chars
CM_COMMA = ',';
CM_PIPE = '|';

CM_RESERVED_CHARS = [
    CM_COMMA,
    CM_PIPE
];

I18N = 'pwix:cookie-manager:i18n-namespace';
