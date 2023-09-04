/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.DUMP ){
        console.debug( 'CookieManager', CookieManager );
    }
    console.debug( 'CookieManager', CookieManager );
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.STORAGE ){
        CookieManager.dumpStorage();
    }
    CookieManager.dumpStorage();
});

Meteor.startup(() => {
    // a technical cookie which stores the user consent as a composite (date,chosen action,list of enabled cookies)
    CookieManager.publish({
        responsible: CM_RESPONSIBLE,
        name: CM_USER_CONSENT_CK,
        description: pwixI18n.label( I18N, 'dialog.consent' ),
        category: CookieManager.C.Category.TECHNICALS,
        lifetime: CookieManager._conf.consentLifetime,
        enabled: true,
        disableable: false
    });
    // fonctional cookies of the manager dialog width and height
    CookieManager.publish({
        responsible: CM_RESPONSIBLE,
        name: CM_DIALOG_SIZE_CK,
        description: pwixI18n.label( I18N, 'dialog.size' ),
        category: CookieManager.C.Category.FUNCTIONALS,
        enabled: true,
        disableable: true
    });
});
