/*
 * pwix:cookie-manager/src/common/js/i18n.js
 */

cookieManager.i18n = {
    en: {
        buttons: {
            accept: 'Accept all',
            choose: 'Configure my choices',
            reject: 'Reject all'
        },
        cookie: {
            originator: 'Originator',
            description: 'Description',
            lifetime: 'Lifetime',
            disableable: 'Disableable',
            link: 'Link'
        },
        dialog: {
            title: 'Cookies Management',
            none: 'No declared cookie in this category'
        },
        tabs: {
            functionals: {
                content: ''
                    +'<p>Functional <em>cookies</em> are used by this web site to offer the user a greater, more comfortable, experience.</p>'
                    +'<p>They can often be disabled by the user, but he/she should take care that the navigation experience may be greatly degraded.</p>'
                    +'<p>They are expected to not be shared, nor available to any other party.</p>',
                label: 'Functional cookies',
                title: '<h5>Functional cookies</h5>'
            },
            marketing: {
                content: ''
                    +'<p>Marketing <em>cookies</em> are used to proposed targets ads. They can also be used to determine which web sites with the same object you have visited.</p>'
                    +'<p>Most often, these cookies are controlled by a third-party partner.</p>',
                label: 'Marketing cookies',
                title: '<h5>Marketing cookies</h5>'
            },
            privacy: {
                content: ''
                    +'<p>When you visit a web site, it may record some informations about you, your device, the previous web site you come from, or any other information it may find useful.</p>'
                    +'<p>These informations are stored as &laquo;<em>&nbsp;cookies&nbsp;</em>&raquo;, or other comparable technologies, which are essentially small data files.</p>'
                    +'<p>Because your privacy is essential for us, we request your explicit consent to use and store these <em>cookies</em>.</p>',
                label: 'Your privacy',
                title: '<h5>Your privacy</h5>'
            },
            statistics: {
                content: ''
                    +'<p>Statistics <em>cookies</em> are mainly used to be able to measure the frequentation of this web site.</p>'
                    +'<p>They can, for example, register the link you have followed to come here, if any, or the count of pages you have visited, of the detail of your navigation in this web site.</p>',
                label: 'Statistics cookies',
                title: '<h5>Statistics cookies</h5>'
            },
            technicals: {
                content: ''
                    +'<p>Technical <em>cookies</em> are those considered by the web site as absolutely required for make it just work.</p>'
                    +'<p>These are generally just mandatory.</p>',
                label: 'Technicals cookies',
                title: '<h5>Technicals cookies</h5>'
            },
            third: {
                content: ''
                    +'<p>Third-party <em>cookies</em> are installed by third-party web sites.</p>'
                    +'<p>They are not controlled by this web site.</p>'
                    +'<p>You should carefully review their own cookies and personal data policies.</p>',
                label: 'Third-party cookies',
                title: '<h5>Third-party cookies</h5>'
            }
        }
    }
};
