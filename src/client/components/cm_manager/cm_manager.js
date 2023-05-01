/*
 * pwix:cookie-manager/src/client/components/cmConsent/cmConsent.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../cm_dialog_buttons/cm_dialog_buttons.js';
import '../cm_dialog_tabs/cm_dialog_tabs.js';

import '../../../common/js/index.js';

import './cmConsent.html';
import './cmConsent.less';

Template.cmConsent.onCreated( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onCreated()' );
    }

    self.CM = {
        // the chosen option
        chosen: 'accept',
        // enable state of the published cookies
        dict: new ReactiveDict(),

        // at the end, apply the chosen option
        apply(){
            switch( self.CM.chosen ){
                // whatever be the current state of the cookie, set all true
                case 'accept':
                    cookieManager._published.every(( c ) => {
                        cookieManager.enable( c.name, true );
                        return true;
                    });
                    break;
                
                // disable all disableable cookies
                case 'reject':
                    cookieManager._published.every(( c ) => {
                        if( c.disableable ){
                            cookieManager.enable( c.name, false );
                        }
                        return true;
                    });
                    break;
                
                // get the current state from dictionary
                case 'chosen':
                    cookieManager._published.every(( c ) => {
                        cookieManager.enable( c.name, self.CM.dict.get( c.name ));
                        return true;
                    });
                    break;
            }
        }
    };
});

Template.cmConsent.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onRendered()' );
    }

    if( localStorage.getItem( STORED_CHOSEN ) !== 'true' ){
        pwixModal.run({
            mdClasses: 'cm-cookie-manager',
            mdTitle: Template.currentData().dialogTitle || pwixI18n.label( cookieManager.i18n, 'dialog.title' ),
            mdBody: 'cm_dialog_tabs',
            mdFooter: 'cm_dialog_buttons',
            mdTarget: self.$( '.cmConsent' ),
            mdSizeKey: STORED_DIALOG_SIZE,
            mdOutsideClose: false,
            cmState: self.CM.dict
        });
    }
});

Template.cmConsent.events({
    'cm-click .cmConsent'( event, instance, data ){
        instance.CM.chosen = data.name;
        pwixModal.close();
    },
    'md-close .cmConsent'( event, instance, data ){
        // apply user choices
        instance.CM.apply();
        // dump if asked for
        if( cookieManager.conf.verbosity & CM_VERBOSE_STORAGE ){
            cookieManager._published.every(( c ) => {
                console.debug( 'pwix:cookieManager cmConsent', c.name, cookieManager.isEnabled( c.name ));
                return true;
            });
        }
        // do not re-display
        localStorage.setItem( STORED_CHOSEN , 'true' );
    }
});

Template.cmConsent.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmConsent onDestroyed()' );
    }
});
