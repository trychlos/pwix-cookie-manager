/*
 * pwix:cookie-manager/src/common/js/i18n.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import '../i18n/en.js';
import '../i18n/fr.js';

pwixI18n.namespace( I18N, 'en', CookieManager.i18n.en );
pwixI18n.namespace( I18N, 'fr', CookieManager.i18n.fr );

/**
 * @returns {String} the i18n namspace of this package
 */
CookieManager.i18n.namespace = function(){
    return I18N;
};
