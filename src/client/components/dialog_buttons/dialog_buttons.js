/*
 * pwix:cookie-manager/src/client/components/dialog_buttons/dialog_buttons.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { pwixModal } from 'meteor/pwix:modal';

import './dialog_buttons.html';

Template.dialog_buttons.onCreated( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_buttons onCreated()' );
    }
});

Template.dialog_buttons.onRendered( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_buttons onRendered()' );
    }
});

Template.dialog_buttons.helpers({
    acceptLabel(){
        return Template.currentData().acceptButton || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: 'buttons.accept' });
    },
    chooseLabel(){
        return Template.currentData().chooseButton || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: 'buttons.choose' });
    },
    rejectLabel(){
        return Template.currentData().rejectButton || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: 'buttons.reject' });
    }
});

Template.dialog_buttons.events({
    'click .cm-dialog-buttons button'( event, instance ){
        const name = instance.$( event.currentTarget ).data( 'cm-name' );
        pwixModal.target().trigger( 'cm-click', { name: name });
    }
});

Template.dialog_buttons.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_buttons onDestroyed()' );
    }
});
