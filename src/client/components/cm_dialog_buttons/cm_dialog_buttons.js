/*
 * pwix:cookie-manager/src/client/components/cm_dialog_buttons/cm_dialog_buttons.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { UILayout } from 'meteor/pwix:ui-layout';
import { Modal } from 'meteor/pwix:modal';

import '../../stylesheets/cm_cookie_manager.less';

import './cm_dialog_buttons.html';

Template.cm_dialog_buttons.onCreated( function(){
    // be verbose
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onCreated()' );
    }
});

Template.cm_dialog_buttons.onRendered( function(){
    // be verbose
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onRendered()' );
    }
});

Template.cm_dialog_buttons.helpers({
    acceptLabel(){
        return this.acceptButton || pwixI18n.label( I18N, 'buttons.accept' );
    },
    chooseLabel(){
        return this.chooseButton || pwixI18n.label( I18N, 'buttons.choose' );
    },

    // whether we have a 'Reject All' button (that we should have)
    haveRejectAll(){
        return CookieManager._conf.haveRejectAll;
    },

    rejectLabel(){
        return this.rejectButton || pwixI18n.label( I18N, 'buttons.reject' );
    },
    // have a small-btn class on small up to medium devices
    smallBtn(){
        return UILayout.isMD() ? 'btn-sm': '';
    }
});

Template.cm_dialog_buttons.events({
    'click .cm-dialog-buttons button'( event, instance ){
        const name = instance.$( event.currentTarget ).data( 'cm-name' );
        Modal.target().trigger( 'cm-click', { name: name });
    }
});

Template.cm_dialog_buttons.onDestroyed( function(){
    // be verbose
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onDestroyed()' );
    }
});
