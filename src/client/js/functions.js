/*
 * pwix:cookie-manager/src/client/js/functions.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { pwixModal } from 'meteor/pwix:modal';

import '../components/cm_dialog_buttons/cm_dialog_buttons.js';
import '../components/cm_dialog_tabs/cm_dialog_tabs.js';

/**
 * @summary runs the cookie manager to let the user accept or refuse cookies
 * @locus Client
 * @param {*} o the configuration object - see README
 */
cookieManager.runManager = function( o ){
    pwixModal.run({
        mdClasses: 'cm-cookie-manager',
        mdTitle: ( o ? o.dialogTitle : '' ) || pwixI18n.label( cookieManager.i18n, 'dialog.title' ),
        mdBody: 'cm_dialog_tabs',
        mdFooter: 'cm_dialog_buttons',
        //mdTarget: self.$( '.cmConsent' ),
        mdSizeKey: STORED_DIALOG_SIZE,
        mdOutsideClose: false,
        //cmState: self.CM.dict
        ...o
    });
};
