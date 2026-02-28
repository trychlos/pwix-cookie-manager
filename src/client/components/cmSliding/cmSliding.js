/*
 * pwix:cookie-manager/src/client/components/cmSliding/cmSliding.js
 */

import _ from 'lodash';

import { Logger } from 'meteor/pwix:logger';
import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

import '../../../common/js/index.js';

import '../cmManagerLink/cmManagerLink.js';
import '../cmPolicyLink/cmPolicyLink.js';

import './cmSliding.html';
import './cmSliding.less';

const logger = Logger.get();

Template.cmSliding.onCreated( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cmSliding onCreated()' );
    const self = this;

    self.CM = {
        // parms
        fontSize: '90%',
        haveCookiesManagerLink: new ReactiveVar( true ),
        haveCookiesPolicyLink: new ReactiveVar( false ),

        // these functions here because we need them twice
        haveBool( name, def ){
            const context = Template.currentData();
            return Object.keys( context ).includes( name ) && _.isBoolean( context[name] ) ? context[name] : def;
        }
    };

    // setup reactive vars
    self.autorun(() => {
        self.CM.haveCookiesManagerLink.set( self.CM.haveBool( 'cookiesManager', true ));
        self.CM.haveCookiesPolicyLink.set( self.CM.haveBool( 'cookiesPolicy', false ));
    });
});

Template.cmSliding.onRendered( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cmSliding onRendered()' );
    const self = this;

    // set the font-size
    self.$( '.cmSliding .cm-body' ).css({ fontSize: self.CM.fontSize });

    // display the adertising cookie message if we have no user consent, or too old
    const consent = CookieManager.consentRead();
    const show = ( consent === null ) || ( Date.now() - consent.date > CookieManager.configure().consentLifetime );
    //logger.debug( 'consent=', consent, 'show=', show );
    if( show ){
        self.$( '.cmSliding .cm-body' ).addClass( 'show' );
    }
});

Template.cmSliding.helpers({
    // have a button to open the CookiesManager dialog
    cookiesManager(){
        return Template.instance().CM.haveCookiesManagerLink.get();
    },

    // have a cookies policy link ?
    cookiesPolicy(){
        return Template.instance().CM.haveCookiesPolicyLink.get();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // image height
    //  depends of the count of displayed lines and of the font size
    imageHeight(){
        const CM = Template.instance().CM;
        const count = 2 + ( CM.haveCookiesPolicyLink.get() ? 1 : 0 ) + ( CM.haveCookiesManagerLink.get() ? 1 : 0 );
        const height = count * 16; // * parseFloat( CM.fontSize ) / 100;
        return height + 'px';
    },

    // parms for cm_dialog_buttons
    parmsButtons(){
        return {
            haveCookiesManagerLink: Template.instance().CM.haveCookiesManagerLink.get()
        }
    },

    // whether this sliding has to be shown
    //  rationale: do not show it when the page is being prerendered after having been requested by a bot crawler
    show(){
        const isPrerender = Package['pwix:ssr'] ? Package['pwix:ssr'].SSR.isPrerender() : false;
        return !isPrerender;
    }
});

Template.cmSliding.events({
    'click .cm-dialog-buttons button'( event, instance ){
        const name = instance.$( event.currentTarget ).data( 'cm-name' );
        if( name === 'RejectAll' ){
            instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
            CookieManager.consentWrite( CookieManager.C.Action.REJECT_ALL );

        } else if( name === 'AcceptAll' ){
            instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
            CookieManager.consentWrite( CookieManager.C.Action.ACCEPT_ALL );

        } else if( name === 'Choose' ){
            instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
            CookieManager.runManager({});

        } else {
            logger.warning( 'name=\''+name+'\' is not handled' );
        }
    },

    // user asks for display of the cookies policy (and close the box)
    //  as user has not 'got it' and not run the cookie manager, it will be redisplayed this cmSliding
    'click .cm-policy-link'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
    }
});

Template.cmSliding.onDestroyed( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cmSliding onDestroyed()' );
});
