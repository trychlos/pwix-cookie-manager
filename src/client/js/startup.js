/*
 * pwix:cookie-manager/src/client/js/startup.js
 */

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

Meteor.startup(() => {
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.DUMP }, 'CookieManager', CookieManager );
    if( CookieManager.configure().verbosity & CookieManager.C.Verbose.STORAGE ){
        CookieManager.dumpStorage();
    }
});

CookieManager._owns = {
};

Meteor.startup(() => {
    // a technical cookie which stores the user consent as a composite (date,chosen action,list of enabled cookies)
    CookieManager._owns[CM_USER_CONSENT_CK] = CookieManager.publish({
        responsible: CM_RESPONSIBLE,
        name: CM_USER_CONSENT_CK,
        description: pwixI18n.label( I18N, 'dialog.consent' ),
        category: CookieManager.C.Category.TECHNICALS,
        lifetime: pwixI18n.label( I18N, 'cookie.one_year' ),
        lifetime_ms: CookieManager.configure().consentLifetime,
        enabled: true,
        disableable: false
    });
    // technical cookie to be able to move the schema from previous versions
    CookieManager._owns[CM_SCHEMA_VERSION_CK] = CookieManager.publish({
        responsible: CM_RESPONSIBLE,
        name: CM_SCHEMA_VERSION_CK,
        description: pwixI18n.label( I18N, 'dialog.schema' ),
        category: CookieManager.C.Category.TECHNICALS,
        lifetime: pwixI18n.label( I18N, 'cookie.illimited' ),
        enabled: true,
        disableable: false,
        value: CM_SCHEMA_VERSION
    });
    // fonctional cookie of the manager dialog width and height
    CookieManager._owns[CM_DIALOG_SIZE_CK] = CookieManager.publish({
        responsible: CM_RESPONSIBLE,
        name: CM_DIALOG_SIZE_CK,
        description: pwixI18n.label( I18N, 'dialog.size' ),
        lifetime: pwixI18n.label( I18N, 'cookie.illimited' ),
        category: CookieManager.C.Category.FUNCTIONALS,
        enabled: true,
        disableable: true
    });
});
