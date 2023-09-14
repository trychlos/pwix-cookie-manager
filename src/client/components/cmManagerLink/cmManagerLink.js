/*
 * /imports/client/components/cmManagerLink/cmManagerLink.js
 *
 * Parms:
 *  - route
 *  - label
 *  - title
 *  + options to be passed to CookiesManager dialog
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './cmManagerLink.html';

Template.cmManagerLink.helpers({
    label(){
        return this.label || pwixI18n.label( I18N, 'links.manager.label' );
    },
    route(){
        return this.route || '#';
    },
    title(){
        return this.title || pwixI18n.label( I18N, 'links.manager.title' );
    }
});

Template.cmManagerLink.events({
    'click .cmManagerLink'( event, instance ){
        CookieManager.runManager( this );
    }
});
