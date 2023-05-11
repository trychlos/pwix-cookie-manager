/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( cookieManager.conf.verbosity & CM_VERBOSE_STORAGE ){
        cookieManager.dump();
    }
});

Meteor.startup(() => {
    // a technical cookie which stores the user consent as a composite (date,chosen action,list of enabled cookies)
    cookieManager.publish({
        name: STORED_USER_CONSENT,
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( cookieManager.i18n, 'dialog.consent' ),
        category: CM_CAT_TECHNICALS,
        lifetime: cookieManager.conf.consentLifetime,
        disableable: false
    });
    // fonctional cookies of the manager dialog width and height
    cookieManager.publish({
        name: STORED_DIALOG_SIZE,
        responsible: 'pwix:cookie-manager',
        description: pwixI18n.label( cookieManager.i18n, 'dialog.size' ),
        category: CM_CAT_FUNCTIONALS,
        disableable: true
    });
});
