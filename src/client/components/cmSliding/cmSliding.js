/*
 * pwix:cookie-manager/src/client/components/cmSliding/cmSliding.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import '../cmConsent/cmConsent.js';

import '../../../common/js/index.js';

import './cmSliding.html';
import './cmSliding.less';

Template.cmSliding.onCreated( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onCreated()' );
    }
});

Template.cmSliding.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onRendered()' );
    }

    // display the alert if needed
    if( localStorage.getItem( STORED_CHOSEN ) !== 'true' ){
        self.$( '.cmSliding .cm-body' ).addClass( 'show' );
    }
});

Template.cmSliding.helpers({
    // string translation
    i18n( arg ){
        return pwixI18n.label( cookieManager.i18n, arg.hash.key );
    },
});

Template.cmSliding.events({
    // got it: close the box and do not redisplay
    'click .cm-gotit'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
        localStorage.setItem( STORED_CHOSEN , 'true' );
    },

    // open the cmConsent modal (also closing this alert)
    'click .cm-modal'( event, instance ){
        Blaze.renderWithData( Template.cmConsent, Template.currentData(), $( 'body' )[0] );
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
    },
/*
    'click .cm-policy'( event, instance ){
    }
    */
});

Template.cmSliding.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onDestroyed()' );
    }
});
