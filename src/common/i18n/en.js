/*
 * pwix:cookie-manager/src/common/js/i18n.js
 */

cookieManager.i18n = {
    ...cookieManager.i18n,
    ...{
        en: {
            buttons: {
                accept: 'Accept all',
                choose: 'Record my choices',
                reject: 'Reject all'
            },
            cookie: {
                originator: 'Originator',
                description: 'Description',
                lifetime: 'Lifetime',
                disableable: 'Disableable',
                link: 'Link',
                illimited: 'Illimited',
                disableableTrue: 'Yes',
                disableableFalse: 'No',
                value: 'Current value',
                undef: '<undefined>'
            },
            dialog: {
                title: 'Cookies Manager',
                none: 'No declared cookie in this category',
                chosen: 'Prevent the cookieManager preferences dialog to be re-displayed each time a page is reloaded.',
                size: 'Keep the last dialog size to improve user experience.'
            },
            sliding: {
                body: '<p>This site use <em>cookies</em> or other comparable technologies to offer you a better and more comfortable experience.</p>',
                policy_link: 'Read our cookies policy',
                manager_link: 'Open the cookies manager',
                gotit: 'Got it. Thanks!'
            },
            tabs: {
                functionals: {
                    content: ''
                        +'<p>Functional <em>cookies</em> are used by this web site to offer the user a greater, more comfortable, experience.</p>'
                        +'<p>They can often be disabled by the user, though he/she should take care that the navigation experience may be greatly degraded.</p>'
                        +'<p>They are expected to not be shared, nor available to any other party.</p>',
                    label: 'Functional cookies',
                    title: '<h5>Functional cookies</h5>'
                },
                marketing: {
                    content: ''
                        +'<p>Marketing <em>cookies</em> are used to proposed targets ads. They can also be used to determine which web sites with the same object you have visited.</p>'
                        +'<p>Most often, these cookies are most often controlled by a third-party partner.</p>',
                    label: 'Marketing cookies',
                    title: '<h5>Marketing cookies</h5>'
                },
                privacy: {
                    content: ''
                        +'<p>When you visit a web site, it may record some informations about you, your device, computer, mobile or tablet, the previous web site you come from, or any other information it may find useful.</p>'
                        +'<p>These informations are stored as &laquo;<em>&nbsp;cookies&nbsp;</em>&raquo;, or other comparable technologies, which are essentially small data files.</p>'
                        +'<p>Because your privacy is essential for us, we request your explicit consent to use and store these <em>cookies</em>.</p>',
                    label: 'Your privacy',
                    title: '<h5>Your privacy</h5>'
                },
                statistics: {
                    content: ''
                        +'<p>Statistics <em>cookies</em> are mainly used to be able to measure the frequentation of this web site.</p>'
                        +'<p>They can for example register the link you have followed to come here, or the count of pages you have visited, of the detail of your navigation inside of this web site.</p>',
                    label: 'Statistics cookies',
                    title: '<h5>Statistics cookies</h5>'
                },
                technicals: {
                    content: ''
                        +'<p>Technical <em>cookies</em> are those considered by the web site as essential and absolutely required for make it just work.</p>'
                        +'<p>These are generally just mandatory, cannot be disabled.</p>',
                    label: 'Technicals cookies',
                    title: '<h5>Technicals cookies</h5>'
                },
                third: {
                    content: ''
                        +'<p>Third-party <em>cookies</em> are installed by external third-party sites, partners or service providers.</p>'
                        +'<p>They are not controlled nor managed in any way by this web site.</p>'
                        +'<p>You should take care of carefully review the general terms of use, along with the cookies and personal data management policies these third-party sites should publish.</p>',
                    label: 'Third-party cookies',
                    title: '<h5>Third-party cookies</h5>'
                }
            }
        }
    }
};
