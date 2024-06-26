Package.describe({
    name: 'pwix:cookie-manager',
    version: '2.0.1',
    summary: 'Cookies management for Meteor',
    git: 'https://github.com/trychlos/pwix-cookie-manager',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'CookieManager'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:cookie-manager' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    api.use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.use( 'pwix:i18n@1.5.7' );
    api.use( 'pwix:modal@1.10.0 || 2.0.0' );
    api.use( 'pwix:toggle-switch@0.3.3' );
    api.use( 'pwix:ui-layout@2.0.0' );
    api.use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    api.addFiles( 'src/client/components/cmSliding/cmSliding.js', 'client' );
    api.addFiles( 'src/client/components/cmManagerLink/cmManagerLink.js', 'client' );
    api.addFiles( 'src/client/components/cmPolicyLink/cmPolicyLink.js', 'client' );
    api.addAssets([
        'resources/png/info-blue.png',
        'resources/png/info-orange.png',
        'resources/png/info-primary.png',
    ],
        'client'
    );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
