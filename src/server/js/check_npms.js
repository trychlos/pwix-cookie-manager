/*
 * pwix:cookie-manager/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if( false ){
    // whitelist packages which are included via a subfolder
}

checkNpmVersions({
    'lodash': '^4.17.0'
},
    'pwix:cookie-manager'
);
