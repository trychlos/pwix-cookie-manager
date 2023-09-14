/*
 * /imports/client/components/cmPolicyLink/cmPolicyLink.js
 *
 * Parms:
 *  - route
 *  - label
 *  - title
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './cmPolicyLink.html';

Template.cmPolicyLink.helpers({
    label(){
        return this.label || pwixI18n.label( I18N, ('links.policy.label') );
    },
    route(){
        return this.route || '#';
    },
    title(){
        return this.title || pwixI18n.label( I18N, 'links.policy.title' );
    }
});

Template.cmPolicyLink.events({
    'click .cmPolicyLink'( event, instance ){
        instance.$( event.currentTarget ).trigger( 'cm-policy-click' );
        return false;
    }
});
