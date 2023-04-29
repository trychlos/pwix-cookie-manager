/*
 * pwix:cookie-manager/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if( false ){
    // whitelist packages which are included via a subfolder
}

checkNpmVersions({
    'merge': '^2.1.1'
    }, 'pwix:cookie-manager' );
