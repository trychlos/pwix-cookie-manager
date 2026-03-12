/*
 * pwix:cookie-manager/src/client/components/cm_dialog_tabs/cm_dialog_tabs.js
 *
 * The body of a modal dialog run via Modal.run()
 * 
 * CAUTION: we manage actually three templates here:
 *  - cm_dialog_tabs
 *  - cm_dialog_tabs_button
 *  - cm_dialog_tabs_cookie
 */

import { Logger } from 'meteor/pwix:logger';
import { Modal } from 'meteor/pwix:modal';
import { pwixI18n } from 'meteor/pwix:i18n';
import { Random } from 'meteor/random';

import '../../../common/js/index.js';

import '../../stylesheets/cm_cookie_manager.less';

import './cm_dialog_tabs.html';

const logger = Logger.get();

Template.cm_dialog_tabs.onCreated( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_tabs onCreated()' );
    const self = this;

    self.CM = {
        // internal vars
        // the list of published cookies
        cookies: {},
        // the (default) chosen option
        chosen: CookieManager.C.Action.ACCEPT_ALL,

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
                cat: CookieManager.C.Category.TECHNICALS,
                content: 'tabs.technicals.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.technicals.label',
                nav_id: Random.id(),
                title: 'tabs.technicals.title'
            },
            {
                name: 'functionals',
                cat: CookieManager.C.Category.FUNCTIONALS,
                content: 'tabs.functionals.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.functionals.label',
                nav_id: Random.id(),
                title: 'tabs.functionals.title'
            },
            {
                name: 'marketing',
                cat: CookieManager.C.Category.MARKETING,
                content: 'tabs.marketing.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.marketing.label',
                nav_id: Random.id(),
                title: 'tabs.marketing.title'
            },
            {
                name: 'statistics',
                cat: CookieManager.C.Category.STATISTICS,
                content: 'tabs.statistics.content',
                content_id: Random.id(),
                cordion_id: Random.id(),
                label: 'tabs.statistics.label',
                nav_id: Random.id(),
                title: 'tabs.statistics.title'
            },
            {
                name: 'third',
                cat: CookieManager.C.Category.THIRD_PARTY,
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
                case CookieManager.C.Action.ACCEPT_ALL:
                    CookieManager._published.every(( ck ) => {
                        ck.enabled( true );
                        return true;
                    });
                    break;
                
                // disable all disableable cookies
                case CookieManager.C.Action.REJECT_ALL:
                    CookieManager._published.every(( ck ) => {
                        if( ck.disableable()){
                            ck.enabled( false );
                        }
                        return true;
                    });
                    break;
                
                // get the current state from dictionary
                case CookieManager.C.Action.CHOSEN:
                    CookieManager._published.every(( ck ) => {
                        ck.enabled( self.CM.cookies[ck.identifier()] );
                        return true;
                    });
                    break;
            }
            CookieManager.consentWrite( self.CM.chosen );
        },

        // whether the current list of tabs already has this category id
        tabsHaveCategory( id ){
            let found = false;
            self.CM.tabs.every(( tab ) => {
                if( tab.cat === id ){
                    found = true;
                    return false;
                }
                return true;
            });
            return found;
        }
    };

    // read the current allow state of the cookies as a hash indexed by cookies identifier
    self.autorun(() => {
        self.CM.cookies = CookieManager.cookiesRead();
    });

    // add to the predefined tabs those which may have been declared by the application
    CookieManager.Categories.every(( cat ) => {
        if( cat.id && !self.CM.tabsHaveCategory( cat.id )){
            let o = {
                name: cat.id,
                cat: cat.id,
                content_id: Random.id(),
                cordion_id: Random.id(),
                nav_id: Random.id()
            };
            o[o.name+'Label'] = cat.label_i18n ? pwixI18n.label( I18N, cat.label_i18n ) : ( cat.label || cat.id );
            o[o.name+'Title'] = cat.title_i18n ? pwixI18n.label( I18N, cat.title_i18n ) : ( '<h5>'+( cat.title || cat.id )+'</h5>' );
            o[o.name+'Content'] = cat.content_i18n ? pwixI18n.label( I18N, cat.content_i18n ) : ( cat.content || cat.id );
            self.CM.tabs.push( o );
        }
        return true;
    });
    //logger.debug( 'tabs', self.CM.tabs );
});

Template.cm_dialog_tabs.onRendered( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_tabs onRendered()' );
    const self = this;

    // set the modal target
    Modal.topmost().set({ target: self.$( '.cm-dialog-tabs' ) });

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

    // whether we have some cookie in this category
    haveList( it ){
        let a = [];
        if( it.cat ){
            a = CookieManager.byCategory( it.cat );
        }
        return a.length > 0;
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // a text to be set after the tab content
    navAfter( it ){
        return it[it.name+'After'] || '';
    },

    // a text to be set before the tab content
    navBefore( it ){
        return it[it.name+'Before'] || '';
    },

    // the tab content
    navContent( it ){
        return it[it.name+'Content'] || pwixI18n.label( I18N, it.content );
    },

    // the list of cookies published by the application and other packages
    navList( it ){
        let a = [];
        if( it.cat ){
            a = CookieManager.byCategory( it.cat );
        }
        return a;
    },

    // the tab content title
    navTitle( it ){
        return it[it.name+'Title'] || pwixI18n.label( I18N, it.title );
    },

    // initialize our internal hash for this cookie
    setDict( c ){
        Template.instance().CM.cookies[c.identifier()] = c.enabled();
    },

    // tabs list
    tabsList(){
        return Template.instance().CM.tabs;
    }
});

Template.cm_dialog_tabs.events({
    // display the tab according to the selected option (on small to medium devices)
    'change .form-select'( event, instance ){
        const target = instance.$( '.form-select option:selected button' ).attr( 'id' );
        instance.$( '.form-select option button.active' ).removeClass( 'active' );
        instance.$( '.tab-content .tab-pane.active' ).removeClass( 'active show' );
        instance.$( '.nav-link#'+target ).tab( 'show' );
    },

    // user accepts or refuses a cookie
    'ts-state .toggleSwitch'( event, instance, data ){
        instance.CM.cookies[data.name] = data.state;
    },

    // user clicks one of the three buttons, terminating the dialog
    'cm-click .cm-dialog-tabs'( event, instance, data ){
        instance.CM.chosen = data.name;
        Modal.topmost().close();
    },

    // dialog is closed, apply the choice
    'md-close .cm-dialog-tabs'( event, instance, data ){
        // apply user choices
        instance.CM.apply();
        // dump if asked for
        if( CookieManager.configure().verbosity & CookieManager.C.Verbose.STORAGE ){
            CookieManager._published.every(( ck ) => {
                logger.debug( ck.identifier(), ck.enabled());
                return true;
            });
        }
        // if the consent-manager-size cookie is disabled, remove what has been written by Modal
        // because Modal considers the key provided at instanciation time, which can have changed since
        const ck = CookieManager.get( CM_RESPONSIBLE, CM_DIALOG_SIZE_CK );
        if( ck && !ck.enabled()){
            ck.removeValue();
        }
    }
});

Template.cm_dialog_tabs.onDestroyed( function(){
    logger.verbose({ verbosity: CookieManager.configure().verbosity, against: CookieManager.C.Verbose.COMPONENTS }, 'cm_dialog_tabs onDestroyed()' );
});

Template.cm_dialog_tabs_button.helpers({
    // the button label
    navLabel( it ){
        return it[it.name+'Label'] || pwixI18n.label( I18N, it.label );
    }
});

Template.cm_dialog_tabs_cookie.helpers({

    // the description of the cookie
    ck_description( c ){
        return c.description() || '';
    },

    // Whether the cookie is disableable
    ck_disableable( c ){
        return pwixI18n.label( I18N, c.disableable() ? 'cookie.disableableTrue' : 'cookie.disableableFalse' );
    },

    // lifetime of the cookie
    ck_lifetime( c ){
        return c.lifetime() || pwixI18n.label( I18N, 'cookie.unknown' );
    },

    // the link associated to the cookie
    ck_link( c ){
        return c.link() || '';
    },

    // the originator of the cookie
    ck_responsible( c ){
        return c.responsible() || '';
    },

    // current value of the cookie
    ck_value( c ){
        return c.value() || pwixI18n.label( I18N, 'cookie.undef' );
    },

    // try to build a collapse identifier
    collapseId( it, c ){
        let id = 'id-' + it.cordion_id + '-' + c.name();
        return id.replace( /[/:]/g, '-' );
    },

    // string translation
    i18n( arg ){
        return pwixI18n.label( I18N, arg.hash.key );
    },

    // a toggle switch for this cookie
    parmsSwitch( c ){
        return {
            name: c.identifier(),
            title: c.name(),
            state: c.enabled(),
            enabled: c.disableable()
        }
    }
});
