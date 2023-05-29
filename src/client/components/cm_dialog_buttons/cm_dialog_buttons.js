/*
 * pwix:cookie-manager/src/client/components/cm_dialog_buttons/cm_dialog_buttons.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { uiLayout } from 'meteor/pwix:layout';
import { pwixModal } from 'meteor/pwix:modal';

import '../../stylesheets/cm_cookie_manager.less';

import './cm_dialog_buttons.html';

Template.cm_dialog_buttons.onCreated( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onCreated()' );
    }
});

Template.cm_dialog_buttons.onRendered( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onRendered()' );
    }
});

Template.cm_dialog_buttons.helpers({
    acceptLabel(){
        return Template.currentData().acceptButton || pwixI18n.label( cookieManager.i18n, 'buttons.accept' );
    },
    chooseLabel(){
        return Template.currentData().chooseButton || pwixI18n.label( cookieManager.i18n, 'buttons.choose' );
    },
    rejectLabel(){
        return Template.currentData().rejectButton || pwixI18n.label( cookieManager.i18n, 'buttons.reject' );
    },
    // have a small-btn class on small up to medium devices
    smallBtn(){
        return uiLayout.isMD() ? 'btn-sm': '';
    }
});

Template.cm_dialog_buttons.events({
    'click .cm-dialog-buttons button'( event, instance ){
        const name = instance.$( event.currentTarget ).data( 'cm-name' );
        pwixModal.target().trigger( 'cm-click', { name: name });
    }
});

Template.cm_dialog_buttons.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_buttons onDestroyed()' );
    }
});
