Package.describe({
    name: 'pwix:cookie-manager',
    version: '1.4.0-rc',
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
    api.versionsFrom( '2.9.0' );
    api.use( 'blaze-html-templates@2.0.0', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.use( 'pwix:i18n@1.5.2' );
    api.use( 'pwix:layout@1.3.0' );
    api.use( 'pwix:modal@1.8.0' );
    api.use( 'pwix:toggle-switch@0.3.0' );
    api.use( 'tmeasday:check-npm-versions@1.0.2', 'server' );
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
// See also https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies
