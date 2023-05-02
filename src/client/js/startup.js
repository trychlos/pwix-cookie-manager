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
