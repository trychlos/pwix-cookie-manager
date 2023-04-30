/*
 * pwix:cookie-manager/src/client/components/cmSliding/cmSliding.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../dialog_buttons/dialog_buttons.js';
import '../dialog_tabs/dialog_tabs.js';

import '../../../common/js/index.js';

import './cmSliding.html';
import './cmSliding.less';

Template.cmSliding.onCreated( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onCreated()' );
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

Template.cmSliding.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onRendered()' );
    }

    // display the alert if needed
    if( localStorage.getItem( STORED_CHOSEN ) !== 'true' ){
        self.$( '.cmSliding .body' ).addClass( 'show' );
    }
});

Template.cmSliding.helpers({
    // whether we have to display the alert ?
    display(){
        return localStorage.getItem( STORED_CHOSEN ) !== 'true';
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( cookieManager.i18n, arg.hash.key );
    },
});

Template.cmSliding.events({
    'cm-click .cmSliding'( event, instance, data ){
        instance.CM.chosen = data.name;
        pwixModal.close();
    },
    'md-close .cmSliding'( event, instance, data ){
        // apply user choices
        instance.CM.apply();
        // dump if asked for
        if( cookieManager.conf.dumpUpdate ){
            cookieManager._published.every(( c ) => {
                console.debug( 'pwix:cookieManager cmSliding', c.name, cookieManager.isEnabled( c.name ));
                return true;
            });
        }
        // do not re-display
        localStorage.setItem( STORED_CHOSEN , 'true' );
    }
});

Template.cmSliding.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onDestroyed()' );
    }
});
