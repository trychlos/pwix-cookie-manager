/*
 * pwix:cookie-manager/src/client/components/cm_dialog_tabs/cm_dialog_tabs.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { Random } from 'meteor/random';

import '../../../common/js/index.js';

import './cm_dialog_tabs.html';

Template.cm_dialog_tabs.onCreated( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onCreated()' );
    }

    self.CM = {
        // the parms

        // internal vars
        activeTab: localStorage.getItem( STORED_TAB ) || 'privacy',

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

        // get/set the active item
        active( name ){
            if( name ){
                self.CM.activeTab = name;
            }
            return self.CM.activeTab;
        },
    };
});

Template.cm_dialog_tabs.onRendered( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onRendered()' );
    }
});

Template.cm_dialog_tabs.helpers({

    // try to build a collapse identifier
    collapseId( it, c ){
        let id = 'id-' + it.cordion_id + '-' + c.name;
        return id.replace( /[/:]/g, '-' );
    },

    // Whether the cookie is disableable
    disableable( c ){
        return pwixI18n.label( cookieManager.i18n, c.disableable ? 'cookie.disableableTrue' : 'cookie.disableableFalse' );
    },

    // whether we have some package in the list
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

    // whether the button is active ?
    itemActive( it ){
        return Template.instance().CM.active() === it.name ? 'active' : '';
    },

    // whether the current item is selected ?
    itemSelected( it ){
        return Template.instance().CM.active() === it.name ? 'true' : 'false';
    },

    // whether the current tab is shown ?
    itemShow( it ){
        return Template.instance().CM.active() === it.name ? 'show' : '';
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

    // initiaize the ReactiveDict for this cookie
    setDict( c ){
        dict = Template.currentData().cmState;
        dict.set( c.name, cookieManager.isEnabled( c.name ));
    },

    // tabs list
    tabsList(){
        return Template.instance().CM.tabs;
    }
});

Template.cm_dialog_tabs.events({
    'ts-state .toggleSwitch'( event, instance, data ){
        Template.currentData().cmState.set( data.name, data.state );
    }
});

Template.cm_dialog_tabs.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager cm_dialog_tabs onDestroyed()' );
    }
});
