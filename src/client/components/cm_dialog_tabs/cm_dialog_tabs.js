/*
 * pwix:cookie-manager/src/client/components/cm_dialog_tabs/cm_dialog_tabs.js
 *
 * The body of a modal dialog run via pwixModal.run()
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { Random } from 'meteor/random';

import '../../../common/js/index.js';

import '../../stylesheets/cm_cookie_manager.less';

import './cm_dialog_tabs.html';

Template.cm_dialog_tabs.onCreated( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onCreated()' );
    }

    self.CM = {
        // internal vars
        // the list of published cookies
        cookies: {},
        // the chosen option
        chosen: 'accept',

        tabs: [
            {
                name: 'privacy',
                content: 'tabs.privacy.content',
                content_id: Random.id(),
                label: 'tabs.privacy.label',
                nav_id: Random.id(),
                title: 'tabs.privacy.title'
            },
            {
                name: 'technicals',
                cat: CM_CAT_TECHNICALS,
                content: 'tabs.technicals.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.technicals.label',
                nav_id: Random.id(),
                title: 'tabs.technicals.title'
            },
            {
                name: 'functionals',
                cat: CM_CAT_FUNCTIONALS,
                content: 'tabs.functionals.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.functionals.label',
                nav_id: Random.id(),
                title: 'tabs.functionals.title'
            },
            {
                name: 'marketing',
                cat: CM_CAT_MARKETING,
                content: 'tabs.marketing.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.marketing.label',
                nav_id: Random.id(),
                title: 'tabs.marketing.title'
            },
            {
                name: 'statistics',
                cat: CM_CAT_STATISTICS,
                content: 'tabs.statistics.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.statistics.label',
                nav_id: Random.id(),
                title: 'tabs.statistics.title'
            },
            {
                name: 'third',
                cat: CM_CAT_THIRD,
                content: 'tabs.third.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.third.label',
                nav_id: Random.id(),
                title: 'tabs.third.title'
            }
        ],

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
                        cookieManager.enable( c.name, self.CM.cookies[c.name]);
                        return true;
                    });
                    break;
            }
            cookieManager.consentWrite( self.CM.chosen );
        }
    };
});

Template.cm_dialog_tabs.onRendered( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onRendered()' );
    }

    // set the modal target
    pwixModal.target({ target: self.$( '.cm-dialog-tabs' ) });

    // activates the first tab
    self.CM.tabs.every(( it ) => {
        if( it.name === 'privacy' ){
            self.$( '.nav-link#nav-'+it.nav_id ).tab( 'show' );
            return false;
        }
        return true;
    });
});

Template.cm_dialog_tabs.helpers({

    // Whether the cookie is disableable
    ck_disableable( c ){
        return pwixI18n.label( cookieManager.i18n, c.disableable ? 'cookie.disableableTrue' : 'cookie.disableableFalse' );
    },

    // lifetime of the cookie
    ck_lifetime( c ){
        return c.lifetime ? c.lifetime : pwixI18n.label( cookieManager.i18n, 'cookie.illimited' );
    },

    // current value of the cookie
    ck_value( c ){
        return localStorage.getItem( c.name ) || pwixI18n.label( cookieManager.i18n, 'cookie.undef' );
    },

    // try to build a collapse identifier
    collapseId( it, c ){
        let id = 'id-' + it.cordion_id + '-' + c.name;
        return id.replace( /[/:]/g, '-' );
    },

    // whether we have some cookie in this category
    haveList( it ){
        let a = [];
        if( it.cat ){
            a = cookieManager.byCategory( it.cat );
        }
        return a.length > 0;
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( cookieManager.i18n, arg.hash.key );
    },

    // a text to be set after the tab content
    navAfter( it ){
        return Template.currentData()[it.name+'After'] || '';
    },

    // a text to be set before the tab content
    navBefore( it ){
        return Template.currentData()[it.name+'Before'] || '';
    },

    // the tab content
    navContent( it ){
        return Template.currentData()[it.name+'Content'] || pwixI18n.label( cookieManager.i18n, it.content );
    },

    // the button label
    navLabel( it ){
        return Template.currentData()[it.name+'Label'] || pwixI18n.label( cookieManager.i18n, it.label );
    },

    // the list of cookies published by the application and other packages
    navList( it ){
        let a = [];
        if( it.cat ){
            a = cookieManager.byCategory( it.cat );
        }
        return a;
    },

    // the tab content title
    navTitle( it ){
        return Template.currentData()[it.name+'Title'] || pwixI18n.label( cookieManager.i18n, it.title );
    },

    // a toggle switch for this cookie
    parmsSwitch( c ){
        return {
            name: c.name,
            title: c.name,
            state: cookieManager.isEnabled( c.name ),
            enabled: c.disableable
        }
    },

    // initiaize our internal hash for this cookie
    setDict( c ){
        Template.instance().CM.cookies[c.name] = cookieManager.isEnabled( c.name );
    },

    // tabs list
    tabsList(){
        return Template.instance().CM.tabs;
    }
});

Template.cm_dialog_tabs.events({
    // user accepts or refuses a cookie
    'ts-state .toggleSwitch'( event, instance, data ){
        instance.CM.cookies[data.name] = data.state;
    },

    // user clicks one of the three buttons, terminating the dialog
    'cm-click .cm-dialog-tabs'( event, instance, data ){
        instance.CM.chosen = data.name;
        pwixModal.close();
    },

    // dialog is closed, apply the choice
    'md-close .cm-dialog-tabs'( event, instance, data ){
        // apply user choices
        instance.CM.apply();
        // dump if asked for
        if( cookieManager.conf.verbosity & CM_VERBOSE_STORAGE ){
            cookieManager._published.every(( c ) => {
                console.debug( 'pwix:cookieManager', c.name, cookieManager.isEnabled( c.name ));
                return true;
            });
        }
    }
});

Template.cm_dialog_tabs.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onDestroyed()' );
    }
});
