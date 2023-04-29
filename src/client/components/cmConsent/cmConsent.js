/*
 * pwix:cookie-manager/src/client/components/cmConsent/cmConsent.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import '../dialog_buttons/dialog_buttons.js';
import '../dialog_tabs/dialog_tabs.js';

import '../../../common/js/index.js';

import './cmConsent.html';
import './cmConsent.less';

Template.cmConsent.onCreated( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onCreated()' );
    }
});

Template.cmConsent.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onRendered()' );
    }

    pwixModal.run({
        mdClasses: 'cm-cookie-manager',
        mdTitle: Template.currentData().dialogTitle || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: 'dialog.title' }),
        mdBody: 'dialog_tabs',
        mdFooter: 'dialog_buttons',
        mdTarget: self.$( '.cmConsent' ),
        mdSizeKey: STORED_DIALOG_SIZE
    });
});

Template.cmConsent.events({
    'cm-click .cmConsent'( event, instance, data ){
        console.log( event, instance, data );
    },
    'md-close .cmConsent'( event, instance, data ){
        console.log( event, instance, data );
    }
});

Template.cmConsent.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onDestroyed()' );
    }
});
