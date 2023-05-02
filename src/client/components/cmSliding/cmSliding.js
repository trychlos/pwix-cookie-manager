/*
 * pwix:cookie-manager/src/client/components/cmSliding/cmSliding.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';

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
        // args
        cookiePolicy: new ReactiveVar( false ),

        // parms
        fontSize: '90%',

        argBool( name ){
            const b = Template.currentData()[name];
            if( b === true || b === false ){
                self.CM[name].set( b );
            }
        }
    }

    // get the args
    self.autorun(() => {
        self.CM.argBool( 'cookiePolicy' );
    })
});

Template.cmSliding.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onRendered()' );
    }

    // set the font-size
    self.$( '.cmSliding .cm-body' ).css({ fontSize: self.CM.fontSize });

    // display the alert if needed
    if( localStorage.getItem( STORED_CHOSEN ) !== 'true' ){
        self.$( '.cmSliding .cm-body' ).addClass( 'show' );
    }
});

Template.cmSliding.helpers({
    // have ac ookie policy url ?
    cookiePolicy(){
        return Template.instance().CM.cookiePolicy.get();
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( cookieManager.i18n, arg.hash.key );
    },

    // image height
    //  depends of the count of displayed lines and of the font size
    imageHeight(){
        const CM = Template.instance().CM;
        const count = 2 + ( CM.cookiePolicy.get() ? 1 : 0 );
        const height = count * 16; // * parseFloat( CM.fontSize ) / 100;
        return height + 'px';
    }
});

Template.cmSliding.events({
    // got it: close the box and do not redisplay
    'click .cm-gotit'( event, instance ){
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
        localStorage.setItem( STORED_CHOSEN , 'true' );
    },

    // open the cookies manager (also closing this box)
    'click .cm-modal'( event, instance ){
        cookieManager.runManager( Template.currentData());
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
        localStorage.setItem( STORED_CHOSEN , 'true' );
    },

    // user asks for display of the cookies policy (and close the box)
    //  as user has not 'got it' and not run the cookie manager, it will be redisplayed this cmSliding
    'click .cm-policy'( event, instance ){
        instance.$( '.cmSliding' ).trigger( 'cm-policy-click' );
        instance.$( '.cmSliding .cm-body' ).removeClass( 'show' );
    }
});

Template.cmSliding.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cmSliding onDestroyed()' );
    }
});
