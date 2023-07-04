/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( CookieManager._conf.verbosity & CM_VERBOSE_STORAGE ){
        CookieManager.dump();
    }
});

Meteor.startup(() => {
    // a technical cookie which stores the user consent as a composite (date,chosen action,list of enabled cookies)
    CookieManager.publish({
        name: STORED_USER_CONSENT,
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( I18N, 'dialog.consent' ),
        category: CM_CAT_TECHNICALS,
        lifetime: CookieManager._conf.consentLifetime,
        disableable: false
    });
    // fonctional cookies of the manager dialog width and height
    CookieManager.publish({
        name: STORED_DIALOG_SIZE,
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( I18N, 'dialog.size' ),
        category: CM_CAT_FUNCTIONALS,
        disableable: true
    });
});
