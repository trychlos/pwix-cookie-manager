/*
 * pwix:cookie-manager/src/client/js/functions.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { Modal } from 'meteor/pwix:modal';

import '../components/cm_dialog_buttons/cm_dialog_buttons.js';
import '../components/cm_dialog_tabs/cm_dialog_tabs.js';

/**
 * @summary reads the current allowed state of the cookies
 *  eventually completes with new published cookies
 * @locus Client
 * @returns {Object} the CookieManager._cookies hash, indexed by cookies identifier, with true|false value
 *  may be empty
 */
CookieManager.cookiesRead = function(){
    CookieManager._cookies = {};
    // read from localStorage
    const prefix = CM_RESPONSIBLE + CM_SLASH + CM_ENABLED_CK + CM_SLASH;
    for( let i=0 ; i<localStorage.length ; ++i ){
        const key = localStorage.key( i );
        if( key.startsWith( prefix )){
            const value = localStorage.getItem( key );
            CookieManager._cookies[key.substring( prefix.length )] = ( value === 'true' );
        }
    }
    // complete with unknown/new published cookies
    CookieManager._published.every(( ck ) => {
        const id = ck.identifier();
        if( !Object.keys( CookieManager._cookies ).includes( id )){
            CookieManager._cookies[id] = ck.enable();
        }
        return true;
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
    const str = localStorage.getItem( CM_RESPONSIBLE + CM_SLASH + CM_USER_CONSENT_CK );
    if( str ){
        const parts = str.split( CM_COMMA );
        if( parts.length >= 2 ){
            res = {
                date: parts[0],
                action: parts[1]
            };
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
    const now = Date.now();
    localStorage.setItem( CM_RESPONSIBLE + CM_SLASH + CM_USER_CONSENT_CK, now + CM_COMMA + action );
    CookieManager._published.every(( ck ) => {
        //console.log( ck );
        CookieManager.writeEnabled( ck );
        return true;
    });
    CookieManager.cookiesRead();
    // be verbose if asked for
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.STORAGE ){
        CookieManager.dumpStorage();
    }
};

/**
 * @summary Reset the user preferences for the named cookie
 * @locus Client
 * @param {String} identifier the identifier 'responsible/name' of the cookie
 */
CookieManager.reset = function( identifier ){
    localStorage.removeItem( CM_RESPONSIBLE + CM_SLASH + CM_ENABLED_CK + CM_SLASH + identifier );
};

/**
 * @summary Empty the whole localStorage space
 * @locus Client
 */
CookieManager.removeAll = function(){
    let names = [];
    for( let i=0; i < localStorage.length; ++i ){
        names.push( localStorage.key( i ));
    }
    names.every(( n ) => {
        console.debug( 'removing', n );
        localStorage.removeItem( n );
        return true;
    });
};

/**
 * @summary runs the cookie manager to let the user accept or refuse cookies
 * @locus Client
 * @param {*} o the configuration object - see README
 */
CookieManager.runManager = function( o ){
    Modal.run({
        mdClasses: 'cm-cookie-manager',
        mdTitle: ( o ? o.dialogTitle : '' ) || pwixI18n.label( I18N, 'dialog.title' ),
        mdBody: 'cm_dialog_tabs',
        mdFooter: 'cm_dialog_buttons',
        mdSizeKey: CM_RESPONSIBLE + CM_SLASH + CM_DIALOG_SIZE_CK,
        mdCloseByBackdrop: false,
        mdCloseByHeader: false,
        mdCloseByKeyboard: false,
        ...o
    });
};

/**
 * @summary Writes whether the given cookie is allowed or not
 *  A not-allowed (or no more allowed) cookie is deleted from the storage
 * @locus Client
 * @param {Cookie} cookie
 */
CookieManager.writeEnabled = function( cookie ){
    const identifier = cookie.identifier();
    const enabled = cookie.enable();
    localStorage.setItem( CM_RESPONSIBLE + CM_SLASH + CM_ENABLED_CK + CM_SLASH + identifier, enabled ? 'true' : 'false' );
    if( !enabled ){
        localStorage.removeItem( identifier );
    }
};
