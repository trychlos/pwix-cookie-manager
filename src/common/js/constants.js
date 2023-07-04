/*
 * pwix:cookie-manager/src/common/js/constants.js
 */

CookieManager.C = {

    // our categories of cookies
    Category: {
        FUNCTIONALS: 'FUNCTIONALS',
        MARKETING: 'MARKETING',
        STATISTICS: 'STATISTICS',
        TECHNICALS: 'TECHNICALS',
        THIRD: 'THIRD'
    },

    // verbosity levels
    Verbose: {
        NONE: 0,
        CONFIGURE:  0x01 <<  0,
        COMPONENTS: 0x01 <<  1,
        DUMP:       0x01 <<  2,
        STORAGE:    0x01 <<  3
    }
};

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
