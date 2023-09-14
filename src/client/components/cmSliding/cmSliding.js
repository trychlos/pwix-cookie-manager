/*
 * pwix:cookie-manager/src/client/components/cmSliding/cmSliding.js
 */

import _ from 'lodash';

import { pwixI18n } from 'meteor/pwix:i18n';

import '../../../common/js/index.js';

import '../cmManagerLink/cmManagerLink.js';
import '../cmManagerLink/cmPolicyLink.js';

import './cmSliding.html';
import './cmSliding.less';

Template.cmSliding.onCreated( function(){
    const self = this;

    // be verbose if asked for
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onCreated()' );
    }

    self.CM = {
        // parms
        fontSize: '90%',

        // these functions here because we need them twice
        haveBool( name, def ){
            const context = Template.currentData();
            return Object.keys( context ).includes( name ) && _.isBoolean( context[name] ) ? context[name] : def;
        },
        haveManager(){
            return self.CM.haveBool( 'cookiesManager', false );
        },
        havePolicy(){
            return self.CM.haveBool( 'cookiesPolicy', false );
        }
    };
});

Template.cmSliding.onRendered( function(){
    const self = this;

    // be verbose if asked for
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onRendered()' );
    }

    // set the font-size
    self.$( '.cmSliding .cm-body' ).css({ fontSize: self.CM.fontSize });

    // display the adertising cookie message if we have no user consent, or too old
    const consent = CookieManager.consentRead();
    const show = ( consent === null ) || ( Date.now() - consent.date > CookieManager._conf.consentLifetime );
    //console.debug( 'consent=', consent, 'show=', show );
    if( show ){
        self.$( '.cmSliding .cm-body' ).addClass( 'show' );
    }
});

Template.cmSliding.helpers({
    // have a link to CookieManager dialog
    cookiesManager(){
        return Template.instance().CM.haveManager();
    },

    // have a cookie policy url ?
    cookiesPolicy(){cookiesPolicy
        return Template.instance().CM.havePolicy();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // image height
    //  depends of the count of displayed lines and of the font size
    imageHeight(){
        const CM = Template.instance().CM;
        const count = 2 + ( CM.haveManager() ? 1 : 0 ) + ( CM.havePolicy() ? 1 : 0 );
        const height = count * 16; // * parseFloat( CM.fontSize ) / 100;
        return height + 'px';
    },

    // whether this sliding has to be shown
    //  rationale: do not show it when the page is being prerendered after having been requested by a bot crawler
    show(){
        const isPrerender = Package['pwix:ssr'] ? Package['pwix:ssr'].SSR.isPrerender() : false;
        //console.debug( 'cookie-manager isPrerender', isPrerender );
        //const isBot = Package['pwix:ssr'] ? Package['pwix:ssr'].SSR.isBot() : false;
        //console.debug( 'cookie-manager isBot', isBot );
        return !isPrerender;
    }
});

Template.cmSliding.events({
    // got it: close the box and do not redisplay
    'click .cm-gotit'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
        CookieManager.consentWrite( CookieManager.C.Action.GOTIT );
    },

    // open the cookies manager (also closing this box)
    //  will write itself the user consent
    'click .cm-manager-link'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
    },

    // user asks for display of the cookies policy (and close the box)
    //  as user has not 'got it' and not run the cookie manager, it will be redisplayed this cmSliding
    'click .cm-policy-link'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
    }
});

Template.cmSliding.onDestroyed( function(){
    // be verbose if asked for
    if( CookieManager._conf.verbosity & CookieManager.C.Verbose.COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onDestroyed()' );
    }
});
