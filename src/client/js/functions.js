/*
 * pwix:cookie-manager/src/client/js/functions.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { pwixModal } from 'meteor/pwix:modal';

import '../components/cm_dialog_buttons/cm_dialog_buttons.js';
import '../components/cm_dialog_tabs/cm_dialog_tabs.js';

/**
 * @summary reads the previous user consent
 * @locus Client
 * @returns {Object} with following keys:
 *  - date: the timestamp of the recorded user consent
 *  - action: the chosen action at date
 *  - enabled: an array of enabled cookies name
 * or
 *  null if no valid previous consent found
 */
cookieManager.consentRead = function(){
    let res = null;
    const str = localStorage.getItem( STORED_USER_CONSENT );
    if( str ){
        const parts = str.split( CM_COMMA );
        if( parts.length === 3 ){
            const enabled = parts[2].split( CM_PIPE );
            // we have at the time at least one mandatory technical cookie (the user consent)
            if( enabled.length > 0 ){
                res = {
                    date: parts[0],
                    action: parts[1],
                    enabled: enabled
                };
            }
        }
    }
    return res;
};

/**
 * @summary records the user consent
 * @locus Client
 * @param {String} action the chosen action
 */
cookieManager.consentWrite = function( action ){
    let enabled = '';
    cookieManager.getEnabled().every(( c ) => {
        if( enabled ){
            enabled += CM_PIPE;
        }
        enabled += c.name;
        return true;
    });
    const now = Date.now();
    localStorage.setItem( STORED_USER_CONSENT, now + CM_COMMA + action + CM_COMMA + enabled );
};

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
        mdSizeKey: STORED_DIALOG_SIZE,
        mdCloseByBackdrop: false,
        mdCloseByHeader: false,
        mdCloseByKeyboard: false,
        ...o
    });
};
