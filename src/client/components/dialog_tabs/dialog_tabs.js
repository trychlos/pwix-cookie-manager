/*
 * pwix:cookie-manager/src/client/components/dialog_tabs/dialog_tabs.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';
import { Random } from 'meteor/random';

import '../../../common/js/index.js';

import './dialog_tabs.html';

Template.dialog_tabs.onCreated( function(){
    const self = this;

    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_tabs onCreated()' );
    }
    
    self.CK = {
        // the parms

        // internal vars
        activeTab: localStorage.getItem( STORED_TAB ) || 'privacy',

        tabs: [
            {
                name: 'privacy',
                nav_id: Random.id(),
                content: 'tabs.privacy.content',
                content_id: Random.id(),
                label: 'tabs.privacy.label',
                title: 'tabs.privacy.title'
            },
            {
                name: 'technicals',
                cat: CM_CAT_TECHNICALS,
                nav_id: Random.id(),
                content: 'tabs.technicals.content',
                content_id: Random.id(),
                label: 'tabs.technicals.label',
                title: 'tabs.technicals.title'
            },
            {
                name: 'functionals',
                cat: CM_CAT_FUNCTIONALS,
                nav_id: Random.id(),
                content: 'tabs.functionals.content',
                content_id: Random.id(),
                label: 'tabs.functionals.label',
                title: 'tabs.functionals.title'
            },
            {
                name: 'marketing',
                cat: CM_CAT_MARKETING,
                nav_id: Random.id(),
                content: 'tabs.marketing.content',
                content_id: Random.id(),
                label: 'tabs.marketing.label',
                title: 'tabs.marketing.title'
            },
            {
                name: 'statistics',
                cat: CM_CAT_STATISTICS,
                nav_id: Random.id(),
                content: 'tabs.statistics.content',
                content_id: Random.id(),
                label: 'tabs.statistics.label',
                title: 'tabs.statistics.title'
            },
            {
                name: 'third',
                cat: CM_CAT_THIRD,
                nav_id: Random.id(),
                content: 'tabs.third.content',
                content_id: Random.id(),
                label: 'tabs.third.label',
                title: 'tabs.third.title'
            }
        ],

        // get/set the active item
        active( name ){
            if( name ){
                self.CK.activeTab = name;
            }
            return self.CK.activeTab;
        },
    };
});

Template.dialog_tabs.onRendered( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_tabs onRendered()' );
    }
});

Template.dialog_tabs.helpers({

    // whether the button is active ?
    itemActive( it ){
        return Template.instance().CK.active() === it.name ? 'active' : '';
    },

    // whether the current item is selected ?
    itemSelected( it ){
        return Template.instance().CK.active() === it.name ? 'true' : 'false';
    },

    // whether the current tab is shown ?
    itemShow( it ){
        return Template.instance().CK.active() === it.name ? 'show' : '';
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
        return Template.currentData()[it.name+'Content'] || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: it.content });
    },

    // the button label
    navLabel( it ){
        return Template.currentData()[it.name+'Label'] || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: it.label });
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
        return Template.currentData()[it.name+'Title'] || pwixI18n.labelEx({ name: cookieManager.i18n, language: 'en', key: it.title });
    },

    // a toggle switch for this cookie
    parmsSwitch( c ){
        return {
            title: c.name,
            initialState: cookieManager.isEnabled( c.name )
        }
    },

    // tabs list
    tabsList(){
        return Template.instance().CK.tabs;
    }
});

Template.dialog_tabs.onDestroyed( function(){
    // be verbose
    if( cookieManager.conf.verbosity & CM_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:cookie-manager dialog_tabs onDestroyed()' );
    }
});
