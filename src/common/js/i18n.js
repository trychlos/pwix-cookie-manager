/*
 * pwix:cookie-manager/src/common/js/i18n.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import '../i18n/en.js';
import '../i18n/fr.js';

pwixI18n.namespace( I18N, 'en', cookieManager.i18n.en );
pwixI18n.namespace( I18N, 'fr', cookieManager.i18n.fr );

/**
 * @returns {String} the i18n namspace of this package
 */
cookieManager.i18n.namespace = function(){
    return I18N;
};
