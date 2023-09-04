/*
 * pwix:cookie-manager/src/common/js/constants.js
 */

CookieManager.C = {

    // the user's consent actins
    Action: {
        GOTIT: 'GotIt',
        ACCEPT_ALL: 'AcceptAll',
        REJECT_ALL: 'RejectAll',
        CHOSEN: 'Choose'
    },

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
CM_RESPONSIBLE = 'pwix:cookie-manager';
CM_USER_CONSENT_CK = 'user-consent';
CM_DIALOG_SIZE_CK = 'consent-manager-size';
CM_ENABLED_CK = 'enabled';

// reserved chars
CM_COMMA = ',';
CM_SLASH = '/';

CM_RESERVED_CHARS = [
    CM_COMMA,
    CM_SLASH
];

I18N = 'pwix:cookie-manager:i18n-namespace';
