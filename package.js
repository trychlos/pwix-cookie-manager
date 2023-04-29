Package.describe({
    name: 'pwix:cookie-manager',
    version: '0.1.0',
    summary: 'Cookies management for Meteor',
    git: 'https://github.com/trychlos/pwix-cookie-manager',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'cookieManager',
        'CM_CAT_FUNCTIONALS',
        'CM_CAT_MARKETING',
        'CM_CAT_STATISTICS',
        'CM_CAT_TECHNICALS',
        'CM_CAT_THIRD',
        'CM_VERBOSE_NONE',
        'CM_VERBOSE_CONFIGURE',
        'CM_VERBOSE_COMPONENTS',
        'CM_VERBOSE_DUMP',
        'CM_VERBOSE_STORAGE'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:cookie-consent' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom( '2.9.0' );
    api.use( 'blaze-html-templates', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.use( 'pwix:i18n@1.0.0' );
    api.use( 'pwix:modal@1.1.0' );
    api.use( 'tmeasday:check-npm-versions@1.0.2', 'server' );
    api.addFiles( 'src/client/components/cmConsent/cmConsent.js', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies