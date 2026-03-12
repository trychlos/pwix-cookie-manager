/*
 * pwix:cookie-manager/src/client/components/cm_dialog_buttons/cm_dialog_buttons.js
 *
 * Datacontext:
 * - haveCookiesManagerLink: whether we must have a button to open the Cookies Manager, defaulting to false
 */

import { Logger } from 'meteor/pwix:logger';
import { Modal } from 'meteor/pwix:modal';
import { pwixI18n } from 'meteor/pwix:i18n';
import { ReactiveVar } from 'meteor/reactive-var';
import { UILayout } from 'meteor/pwix:ui-layout';

import '../../stylesheets/cm_cookie_manager.less';

import './cm_dialog_buttons.html';

const logger = Logger.get();

Template.cm_dialog_buttons.onCreated( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_buttons onCreated()' );
    const self = this;

    self.CM = {
        fromSliding: new ReactiveVar( false )
    };
});

Template.cm_dialog_buttons.onRendered( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_buttons onRendered()' );
    const self = this;

    // are we inside of the cmSliding component, or of the CookiesManager modal dialog ?
    self.autorun(() => {
        const $parent = self.$( '.cm-dialog-buttons' ).closest( '.cmSliding' );
        self.CM.fromSliding.set( $parent.length > 0 );
    });
});

Template.cm_dialog_buttons.helpers({
    // the 'Accept all' button is either a primary if there is no 'Choose' button, else a secondary
    acceptClass(){
        return ( this.haveCookiesManagerLink === true ) ? 'btn-secondary' : 'btn-primary';
    },

    acceptLabel(){
        return this.acceptButton || ( Template.instance().CM.fromSliding.get() ? pwixI18n.label( I18N, 'buttons.accept' ) : pwixI18n.label( I18N, 'buttons.record' ));
    },

    acceptName(){
        return Template.instance().CM.fromSliding.get() ? 'AcceptAll' : 'Choose';
    },

    // the 'Accept all' button is either a primary if there is no 'Choose' button, else a secondary
    acceptType(){
        return ( this.haveCookiesManagerLink === true ) ? 'button' : 'submit';
    },

    chooseLabel(){
        return this.chooseButton || pwixI18n.label( I18N, 'buttons.choose' );
    },

    // whether we have a 'Let me choose' button
    // only honored inside of the cmSliding as the modal has only a 'record' button
    haveChoose(){
        return Template.instance().CM.fromSliding.get() && this.haveCookiesManagerLink === true;
    },

    // whether we have a 'Only essentials' button (that we should have)
    // only honored inside of the cmSliding as the modal has only a 'record' button
    haveRejectAll(){
        return Template.instance().CM.fromSliding.get() && CookieManager.configure().haveRejectAll;
    },

    rejectLabel(){
        return this.rejectButton || pwixI18n.label( I18N, 'buttons.reject' );
    },
    // have a small-btn class on small up to medium devices
    // be always small when inside cmSliding
    smallBtn(){
        return Template.instance().CM.fromSliding.get() ? 'btn-sm' : ( UILayout.isMD() ? 'btn-sm': '' );
    }
});

Template.cm_dialog_buttons.events({
    // buttons are not treated when inside the cmSliding
    'click .cm-dialog-buttons button'( event, instance ){
        if( !instance.CM.fromSliding.get()){
            const name = instance.$( event.currentTarget ).data( 'cm-name' );
            Modal.topmost().target().trigger( 'cm-click', { name: name });
        }
    }
});

Template.cm_dialog_buttons.onDestroyed( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_buttons onDestroyed()' );
});
