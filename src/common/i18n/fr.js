/*
 * pwix:cookie-manager/src/common/js/i18n.js
 */

cookieManager.i18n = {
    ...cookieManager.i18n,
    ...{
        fr: {
            buttons: {
                accept: 'Tout accepter',
                choose: 'Configures choix',
                reject: 'Tout refuser'
            },
            cookie: {
                originator: 'Origine',
                description: 'Description',
                lifetime: 'Durée de vie',
                disableable: 'Désactivable',
                link: 'Lien',
                ilimited: 'Illimitée',
                disableableTrue: 'Oui',
                disableableFalse: 'Non'
            },
            dialog: {
                title: 'Gestion des cookies',
                none: 'Aucun cookie déclaré dans cette categorie',
                chosen: 'Empêche la boite de dialogue de gestion des cookies d\'être réaffichée quand une page est rechargée.',
                size: 'Enregistre la dernière taille de la boîte de dialogue pour améliorer l\'expérience utilisateur.'
            },
            sliding: {
                body: '<p>Ce site utilise des <em>cookies</em> ou d\'autres technologies comparables pour vous procurer une meilleure et plus confortable expérience de navigation.</p>',
                policy_link: 'Prenez connaissance de notre stratégie de gestion des cookies',
                modal_link: 'Managez vos cookies',
                gotit: 'Vu. Merci !'
            },
            tabs: {
                functionals: {
                    content: ''
                        +'<p>Les <em>cookies</em> fonctionnels sont utilisés par ce site web afin de procurer à l\'utilisateur une meilleure et plus confortable expérience de navigation.</p>'
                        +'<p>Ils sont le plus souvent désactivables par l\'utilisateur, au prix toutefois d\'une expérience probablement nettement dégradée.</p>'
                        +'<p>Ils sont supposés ne pas être partagés ni en aucune manière disponibles pour n\'importe quelle tierce partie.</p>',
                    label: 'Cookies fonctionnels',
                    title: '<h5>Cookies fonctionnels</h5>'
                },
                marketing: {
                    content: ''
                        +'<p>Les <em>cookies</em> marketing sont utilisés pour proposer des publicités ciblées. Ils peuvent également être utilisés pour déterminer et identifier les autres sites web ayant le même sujet que vous auriez pu visiter.</p>'
                        +'<p>Ces <em>cookies</em> sont le plus souvent contrôlés par des partenaires tiers.</p>',
                    label: 'Cookies marketing',
                    title: '<h5>Cookies marketing</h5>'
                },
                privacy: {
                    content: ''
                        +'<p>Quand vous visitez un site web, celui-ci peut enregistrer des informations à votre sujet, au sujet de votre appareil, ordinateur, téléphone ou tablette, le site précédent d\'où vous venez, et en général n\'importe quelle information il peut estimer intéressante.</p>'
                        +'<p>Ces informations sont enregistrées sous la forme de &laquo;<em>&nbsp;cookies&nbsp;</em>&raquo; ou de technologies comparables, qui sont de façon principale de petits fichiers de données.</p>'
                        +'<p>Parce que votre vie privée est essentielle pour nous, nous vous demandons explicitement votre autorisation pour enregistrer et utiliser ces <em>cookies</em>.</p>',
                    label: 'Votre vie privée',
                    title: '<h5>Votre vie privée</h5>'
                },
                statistics: {
                    content: ''
                        +'<p>Les <em>cookies</em> statistiques sont principalement utilisés pour mesurer la fréquentation d\'un site web.</p>'
                        +'<p>Ils peuvent par exemple enregistrer le lien que vous avez suivi pour arriver sur le site, ou le nombre de pages que vous avez visitées, ou le détail de la navigation au sein de ce site web.</p>',
                    label: 'Cookies statistiques',
                    title: '<h5>Cookies statistiques</h5>'
                },
                technicals: {
                    content: ''
                        +'<p>Les <em>cookies</em> techniques sont ceux considérés comme essentiels et absolument requis pour que le site web fonctionne.</p>'
                        +'<p>Ils sont en général obligatoires, ne peuvent pas être désactivés.</p>',
                    label: 'Cookies techniques',
                    title: '<h5>Cookies techniques</h5>'
                },
                third: {
                    content: ''
                        +'<p>Les <em>cookies</em> de tierce-partie sont ceux installés par des sites externes, partenaires ou fournisseurs de service.</p>'
                        +'<p>Ils ne sont pas contrôlés ni gérés en aucune façon par ce site web.</p>'
                        +'<p>Vous devriez prendre soin de lire soigneusement les conditions générales d\'utilisation ainsi que les stratégies de gestion des données personnelles et des cookies qui doivent être publiées par ces sites tiers.</p>',
                    label: 'Cookies d\'une tierce partie',
                    title: '<h5>Cookies d\'une tierce partie</h5>'
                }
            }
        }
    }
};
