/*
 * pwix:cookie-manager/src/client/js/functions.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { Modal } from 'meteor/pwix:modal';

import '../components/cm_dialog_buttons/cm_dialog_buttons.js';
import '../components/cm_dialog_tabs/cm_dialog_tabs.js';

/**
 * @summary reads the current allowed state of the published cookies
 *  eventually completes with new published cookies
 * @locus Client
 * @returns {Object} the CookieManager._cookies hash, indexed by cookies identifier, with true|false value
 *  may be empty
 */
CookieManager.cookiesRead = function(){
    CookieManager._cookies = {};
    CookieManager._published.every(( ck ) => {
        const ident = ck.identifier();
        CookieManager._cookies[ident] = ck.enabled();
    });
    return CookieManager._cookies;
};

/**
 * @summary reads the previous user consent
 * @locus Client
 * @returns {Object} with following keys:
 *  - date: the timestamp of the recorded user consent
 *  - action: the chosen action at date
 * or
 *  null if no valid previous consent found
 */
CookieManager.consentRead = function(){
    let res = null;
    const ck = CookieManager.get( CM_RESPONSIBLE, CM_USER_CONSENT_CK );
    if( ck ){
        const str = ck.value();
        if( str ){
            const parts = str.split( CM_COMMA );
            if( parts.length >= 2 ){
                res = {
                    date: parts[0],
                    action: parts[1]
                };
            }
        }
    }
    return res;
};

/**
 * @summary records the user consent
 * @description Records all types of user consent, either just 'Got it!' or a Reject all, Accept all or choosing of the cookies.
 *  Each time, we also record the status of the known cookies.
 * @locus Client
 * @param {String} action the chosen action
 */
CookieManager.consentWrite = function( action ){
    const ck = CookieManager.get( CM_RESPONSIBLE, CM_USER_CONSENT_CK );
    if( ck ){
        const now = Date.now();
        ck.value( now + CM_COMMA + action );
    }
    // be verbose if asked for
    if( CookieManager.configure().verbosity & CookieManager.C.Verbose.STORAGE ){
        CookieManager.dumpStorage();
    }
};

/**
 * @summary runs the cookie manager to let the user accept or refuse cookies
 * @locus Client
 */
CookieManager.runManager = function( o ){
    const title = pwixI18n.label( I18N, 'dialog.title' );
    Modal.run({
        mdClasses: 'cm-cookie-manager',
        mdTitle: ( o ? o.dialogTitle : title ) || title,
        mdBody: 'cm_dialog_tabs',
        mdFooter: 'cm_dialog_buttons',
        mdSizeKey: CookieManager._owns[CM_DIALOG_SIZE_CK].valueKey(),
        mdCloseByBackdrop: false,
        mdCloseByHeader: false,
        mdCloseByKeyboard: false,
        ...o
    });
};

// at import time (i.e. before any publication), make sure we migrate old versions of the storage schema
const version = localStorage.getItem( CM_RESPONSIBLE+CM_SLASH+CM_RESPONSIBLE+CM_SLASH+CM_SCHEMA_VERSION_CK+'/value' );
if( version === null || version === undefined ){
    for( let i=0; i < localStorage.length; ++i ){
        const key = localStorage.key( i );
        if( key.startsWith( CM_RESPONSIBLE )){
            if( key.endsWith( '/set' ) || key.endsWith( '/value' )){
                // a new version - leave as is
            } else {
                if( key === CM_RESPONSIBLE+CM_SLASH+CM_USER_CONSENT_CK ){
                    const newkey = CM_RESPONSIBLE+CM_SLASH+CM_RESPONSIBLE+CM_SLASH+CM_USER_CONSENT_CK;
                    const value = localStorage.getItem( key );
                    localStorage.setItem( newkey+'/set', 'enabled' );
                    localStorage.setItem( newkey+'/value', value );
                    localStorage.removeItem( key );
                }
                else if( key.startsWith( CM_RESPONSIBLE+CM_SLASH+'enabled'+CM_SLASH )){
                    const value = localStorage.getItem( key );
                    const newkey = key.replace( '/enabled', '' )+'/set';
                    localStorage.setItem( newkey, value === 'true' ? 'enabled' : 'disabled' );
                    localStorage.removeItem( key );
                }
                else {
                    console.debug( 'pwix:cookie-manager unmigrated key', key );
                }
            }
        } else {
            // not one of our own cookies - just ignore and leave as is
        }
    }
}
// this is the future, should be found at the moment
else if( version < CM_SCHEMA_VERSION ){
    console.warn( 'pwix:cookie-manager found a future version', version );
}
