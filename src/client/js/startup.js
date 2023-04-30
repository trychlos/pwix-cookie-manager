/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( cookieManager.conf.verbosity & CM_VERBOSE_STORAGE ){
        cookieManager.dump();
    }
});

Meteor.startup(() => {
    // a technical cookie which prevent the cmConsent to be re-displayed each time the page reload
    cookieManager.publish({
        name: STORED_CHOSEN,
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( cookieManager.i18n, 'dialog.chosen' ),
        category: CM_CAT_TECHNICALS,
        lifetime: pwixI18n.label( cookieManager.i18n, 'cookie.illimited' ),
        disableable: false
    });
    // fonctional cookies for cmConsent width and height
    cookieManager.publish({
        name: STORED_DIALOG_SIZE+'-width',
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( cookieManager.i18n, 'dialog.size' ),
        category: CM_CAT_FUNCTIONALS,
        lifetime: pwixI18n.label( cookieManager.i18n, 'cookie.illimited' ),
        disableable: false
    });
    cookieManager.publish({
        name: STORED_DIALOG_SIZE+'-height',
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( cookieManager.i18n, 'dialog.size' ),
        category: CM_CAT_FUNCTIONALS,
        lifetime: pwixI18n.label( cookieManager.i18n, 'cookie.illimited' ),
        disableable: false
    });
});
