# pwix:cookie-manager

A cookie management package for Meteor which aims to conform to "Guidelines 05/2020 on consent under Regulation 2016/679" EU recomandations.

It provides:

- the methods to let the application (resp. another package) publish their respectives _cookies_ to respect the disclosure obligation

- a consentement dialog as a Blaze component

- the methods to let the application (resp. another package) get the _cookies_ status.

This has been written because `selaias:cookie-consent` seems to no more be maintained. So the need of a current package has arisen. Note that, contrarily to `selaias:cookie-consent`, this one doesn't requise `ostrio:cookies`. Instead, it relies on `localStorage` to store user consentement.

## The _cookie_ object

`pwix:cookie-manager` doesn't manage the cookies by themselves, I mean their value. So, whether the _cookie_ is really a cookie, i.e. a data file sent from the server to the client before HTTP headers, and so on, is entirey up to the application (resp. another package).

Instead, `pwix:cookie-manager` manages what can be called the cookie _semantic_, i.e. a name and a description, an originator, a category, a status, along with some other properties which are only relevant for the aim of management. All that semantic, along with the user consentement, is stored in the `localStorage` of the browser.

`pwix:cookie-manager` distinguishes five type of cookies:

- `CookieManager.C.Category.TECHNICALS`
- `CookieManager.C.Category.FUNCTIONALS`
- `CookieManager.C.Category.STATISTICS`
- `CookieManager.C.Category.MARKETING`
- `CookieManager.C.Category.THIRD`

`pwix:cookie-manager` makes the cookie have three status:

- it may be enabled and not disableable: the cookie is operational, and the user cannot refuse it

- it may be enabled and disableable: the cookie defaults to be operational, but the user can refuse it

- it may be disabled: the cookie is not operational, has been previously refused by the user.

## Configuration

The package's behavior can be configured through a call to the `CookieManager.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `categories`

    An array of the categories the application wishes to add to the predefined ones.

    Each item of this array represents a category, must be an object with following keys:

    - `id`: a string which identifies the category

    - `label`: a (localized) string to be displayed as the tab label, defaulting to `id`

    - `title`: a (localized) HTML string to be displayed as the title of the corresponding tab in the Cookie Manager, defaulting to `<h5>id</h5>`

    - `content`: a (localized) HTML string to be displayed as the description of the category in the Cookie Manager, defaulting to `id`

    When defined, these new categories may be used by the application to better categorize its own cookies.

- `consentLifetime`

    Define the lifetime of the user consent, i.e. the time at the end of which an explicit consent should be re-asked to the user, as a `ms` integer.

    Defaults to 31536000000 ms, aka 365*24*60*60*1000, aka one year.

- `haveRejectAll`

    Let the application decides that it does not want present a 'Reject all' button to the user.

    Please note that this is a CNIL recommandation to have a 'Reject all' button same size and level than 'Accept all' (cf. 'CNIL_2020_092_Recommandation-cookies-et-autres-traceurs.pdf').

    Defaults to `true`.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `CookieManager.C.Verbose.NONE`

        Do not display any trace log to the console

    - `CookieManager.C.Verbose.COMPONENTS`

        Trace Blaze components life:

        - creation
        - rendering
        - destruction

    - `CookieManager.C.Verbose.CONFIGURE`

        Trace `CookieManager.configure()` calls and their result

    - `CookieManager.C.Verbose.DUMP`

        Dump the `CookieManager` global object at startup.

    - `CookieManager.C.Verbose.STORAGE`

        Dump the localStorage first at startup, and then on user choice (client-side only).

Please note that `CookieManager.configure()` method should be called in the same terms both in client and server sides.

Remind too that Meteor packages are instanciated at application level. They are so only configurable once, or, in other words, only one instance has to be or can be configured. Addtionnal calls to `SSR.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## Provides

### A global object

`CookieManager`

This object is allocated at package level: there is only one instance in your application. It gathers the available methods (see below).

`pwix:cookie-manager` attaches this global object to the global Meteor one, so that every willing-to packages is able to take advantage of the available methods to publish their own _cookies_ through `Meteor.CookieManager`, without having to first `require` or `import` the package, or even make it a dependency.

### Constants

- `CookieManager.C.Action.GOTIT`
- `CookieManager.C.Action.ACCEPT_ALL`
- `CookieManager.C.Action.REJECT_ALL`
- `CookieManager.C.Action.CHOSEN`

- `CookieManager.C.Verbose.NONE`
- `CookieManager.C.Verbose.COMPONENTS`
- `CookieManager.C.Verbose.CONFIGURE`
- `CookieManager.C.Verbose.DUMP`
- `CookieManager.C.Verbose.STORAGE`

- `CookieManager.C.Category.TECHNICALS`
- `CookieManager.C.Category.FUNCTIONALS`
- `CookieManager.C.Category.STATISTICS`
- `CookieManager.C.Category.MARKETING`
- `CookieManager.C.Category.THIRD`

### Methods

#### `CookieManager.byCategory( category )`

Returns the array of published cookies for the specified category.

#### `CookieManager.configure( o )`

See above.

#### `CookieManager.isEnabled( identifier )`

Returns whether the identified (responsible/name) _cookie_ is authorized by the user.

#### `CookieManager.publish( o )`

This method let the application (resp. another package) publish the cookies it makes use of, so that the user is able to be informed of what he accepts or refuses.

In order to not rely on the initialization order, this method should be called from `Meteor.startup()`.

`o` here is either a javascript object which describes a cookie, or an array of such javascript objects. It may contains following datas:

- `responsible`

    Mandatory.

    The application (resp. another package) name, as a string.

    The `responsible/name` concatenation is expected to be a unique identifier of the cookie.

    The `responsible` field is subject to restriction on reserved characters (#reserved-characters).

- `name`

    Mandatory.

    The technical name of the cookie, as a string, so that, for example, this coud be checked by the user in his browser.

    The `responsible/name` concatenation is expected to be a unique identifier of the cookie,.

    The `name` field is subject to restriction on reserved characters (#reserved-characters).

- `category`

    The category the cookie belong to.

    Must be referenced in `CookieManager.Categories`.

- `description`

    A brief localized description of the role of the cookie, as a string, defaulting to none.

- `lifetime`

    The lifetime of the cookie, as a string, from just the navigation session life to illimited.

    Once again, this is here a descriptive string, as we do not manage the cookies themselves. This is just a user indication.

    Defaults to english « Unknown ».

- `enabled`

    Whether the cookie is initially enabled (`true`) or disabled (`false`), defaulting to `true`.

    Defaults to `false` (disabled).

- `disableable`

    Whether the cookie can be refused by the user, defaulting to `true`.

- `link`

    When we are describing a third-party cookie, the third-party main web site address.

    Defaults to none.

#### `CookieManager.runManager( o )`

Run a modal dialog to let the user choose his privacy preferences, and collect his explicit consent.

This modal is a blocking one: the user MUST click on one the three proposed buttons to close it.

`runManager()` method runs the modal dialog whatever be the status of the presentation cookie. Even if the user has already seen this dialog on its first visite, calling this method will re-run the same dialog.

The method accepts a configuration object passed as an argument, which may contain:

- `dialogTitle`

    An optional string to be used as title in the dialog header, defaulting to language-dependent « Cookies Manager »

- `acceptButton`

    An optional string to be used as the label of the `Accept` button, defaulting to language-dependent « Accept all »

- `chooseButton`

    An optional string to be used as the label of the `Record` button, defaulting to language-dependent « Record my choices »

- `functionalsAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `functionals` pane, defaulting to nothing.

- `functionalsBefore`

    An optional HTML string to be displayed before the content in the `functionals` pane, defaulting to nothing.

- `functionalsContent`

    An optional HTML string to be displayed as the main text in the `functionals` pane, defaulting to language-dependent:

    « Functional _cookies_ are used by this web site to offer the user a greater, more comfortable, experience.<br />
    « They can often be disabled by the user, though he/she should take care that the navigation experience may be greatly degraded.<br />
    « They are expected to not be shared, nor available to any other party

- `functionalsLabel`

    An optional string to be used as the label of the `functionals` tab, defaulting to language-dependent « Functional cookies »

- `functionalsTitle`

    An optional HTML string to be displayed as the title in the `functionals` pane, defaulting to HTML language-dependent '`<h5>Functional cookies</h5>`'..

- `marketingAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `marketing` pane, defaulting to nothing.

- `marketingBefore`

    An optional HTML string to be displayed before the content in the `marketing` pane, defaulting to nothing.

- `marketingContent`

    An optional HTML string to be displayed as the main text in the `marketing` pane, defaulting to language-dependent:

    « Marketing _cookies_ are used to proposed targets ads. They can also be used to determine which web sites with the same object you have visited.<br />
    « Most often, these cookies are most often controlled by a third-party partner.

- `marketingLabel`

    An optional string to be used as the label of the `marketing` tab, defaulting to language-dependent « Marketing cookies ».

- `marketingTitle`

    An optional HTML string to be displayed as the title in the `marketing` pane, defaulting to HTML language-dependent '`<h5>Marketing cookies</h5>`'..

- `privacyAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `privacy` pane, defaulting to nothing.

- `privacyBefore`

    An optional HTML string to be displayed before the content in the `privacy` pane, defaulting to nothing.

- `privacyContent`

    An optional HTML string to be displayed as the main text in the `privacy` pane, defaulting to language-dependent:

    « When you visit a web site, it may record some informations about you, your device, the previous web site you come from, or any other information it may find useful.<br />
    « These informations are stored as _cookies, or other comparable technologies, which are essentially small data files.<br />
    « Because your privacy is essential for us, we request your explicit consent to use and store these _cookies_.

- `privacyLabel`

    An optional string to be used as the label of the `privacy` tab, defaulting to language-dependent « Your privacy ».

- `privacyTitle`

    An optional HTML string to be displayed as the title in the `privacy` pane, defaulting to HTML language-dependent '`<h5>Your privacy</h5>`'.

- `rejectButton`

    An optional string to be used as the label of the `Reject` button, defaulting to language-dependent « Reject all ».

- `statisticsAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `statistics` pane, defaulting to nothing.

- `statisticsBefore`

    An optional HTML string to be displayed before the content in the `statistics` pane, defaulting to nothing.

- `statisticsContent`

    An optional HTML string to be displayed as the main text in the `statistics` pane, defaulting to language-dependent:

    « Statistics _cookies_ are mainly used to be able to measure the frequentation of this web site.<br />
    « They can for example register the link you have followed to come here, or the count of pages you have visited, of the detail of your navigation inside of this web site.

- `statisticsLabel`

    An optional string to be used as the label of the `statistics` tab, defaulting to language-dependent « Statistics cookies ».

- `statisticsTitle`

    An optional HTML string to be displayed as the title in the `statistics` pane, defaulting to HTML language-dependent '`<h5>Statistics cookies</h5>`'..

- `technicalsAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `technicals` pane, defaulting to nothing.

- `technicalsBefore`

    An optional HTML string to be displayed before the content of the `technicals` pane, defaulting to nothing.

- `technicalsContent`

    An optional HTML string to be displayed as the main text in the `technicals` pane, defaulting to language-dependent:

    « Technical _cookies_ are those considered by the web site as essential and absolutely required for make it just work.<br />
    « These are generally just mandatory, cannot be disabled.

- `technicalsLabel`

    An optional string to be used as the label of the `technicals` tab, defaulting to language-dependent « Technicals cookies ».

- `technicalsTitle`

    An optional HTML string to be displayed as the title of the `technicals` pane, defaulting to HTML language-dependent '`<h5>Technicals cookies</h5>`'..

- `thirdAfter`

    An optional HTML string to be displayed after the list of cookies (if any) in the `third` pane, defaulting to nothing.

- `thirdBefore`

    An optional HTML string to be displayed before the content in the `third` pane, defaulting to nothing.

- `thirdContent`

    An optional HTML string to be displayed as the main text in the `third` pane, defaulting to language-dependent:

    « Third-party _cookies_ are installed by external third-party sites, partners or service providers.<br />
    « They are not controlled nor managed in any way by this web site.<br />
    « You should take care of carefully review the general terms of use, along with the cookies and personal data management policies these third-party sites should publish.

- `thirdLabel`

    An optional string to be used as the label of the `third` tab, defaulting to language-dependent « Third-party cookies ».

- `thirdTitle`

    An optional HTML string to be displayed as the title in the `third` pane, defaulting to HTML language-dependent '`<h5>Third-party cookies</h5>`'..

Please note that this method is only available on the client.

- English version

    ![English version](/maintainer/png/consent-privacy-en.png)
    ![English version](/maintainer/png/consent-technicals-en.png)
    ![English version](/maintainer/png/consent-functional-en.png)
    ![English version](/maintainer/png/consent-marketing-en.png)
    ![English version](/maintainer/png/consent-statistics-en.png)
    ![English version](/maintainer/png/consent-third-en.png)

- French version

    ![English version](/maintainer/png/consent-privacy-fr.png)
    ![English version](/maintainer/png/consent-technicals-fr.png)
    ![English version](/maintainer/png/consent-functional-fr.png)
    ![English version](/maintainer/png/consent-marketing-fr.png)
    ![English version](/maintainer/png/consent-statistics-fr.png)
    ![English version](/maintainer/png/consent-third-fr.png)

#### `CookieManager.i18n.namespace()`

This method returns the i18n namespace of this package.

With this namespace, one can easily extend the available translations.

#### Reserved characters

Please note that `CookieManager` internally uses some reserved characters. These reserved characters must not be used when naming a cookie. As of 1.3.0, these are:

- comma `,`
- slash `/`.

### Blaze components

#### `cmManagerLink`

A component which displays a link to run the Cookie Manager.

It may be run with following parms:

- `label`

The label.

Defaults to a (localized) « Cookies management ».

- `route`

The route to be set on the link.

Defaults to a '`#`', which run the Cookie Manager.

- `title`

The title of the link.

Defaults to a (localized) « Cookies management ».

#### `cmPolicyLink`

A component which displays a link to the Cookies Policy page.

It may be run with following parms:

- `label`

The label.

Defaults to a (localized) « Cookies policy ».

- `route`

The route to be set on the link.

Defaults to a '`#`', which sends a `cm-policy-click` event on the `cmSliding` component.

- `title`

The title of the link.

Defaults to a (localized) « Cookies policy ».

#### `cmSliding`

A sliding alert band displayed in the bottom of the screen, to let the user be informed or the existence of a cookies policy.

As this component provides a link to the cookies manager dialog, it may take the exact same parameters than `runManager()`, plus some specifics:

- `cookiesManager`

    Whether to display a link to run the cookies manager.

    On click, the cookies manager will be opened.

    Defaults to `false`.

- `cookiesPolicy`

    Whether to display a link to the site cookies policy.

    If provided, then the component will display a short sentence « Read our cookies policy ».

    On click, the `cm-policy-click` event will be triggered on `cmSliding` component.

    Defaults to `false`.

`cmSliding` is displayed the first time a user visits the site, as a bottom sliding band. It can be closed:

- when the user clicks on the 'Got it' button

    - no update is done on the current cookies choices
    - the component will not be displayed again on next visit

- when the user click on the link to open the cookie manager

    - the component will not be displayed again on next visit

- when a link to the cookies policy has been provided and the user clicks on it

    - no other action is taken than just close the component: neither any cookie choice update, nor any prevention against a new display on next visit

        Rationale is that reading, even very carefully, the cookies policy is not at all the same that explicitly consent to the cookies.

And there is an english version

![English version](/maintainer/png/sliding-en.png)

And a french version

![English version](/maintainer/png/sliding-fr.png)

### Informational messages

#### `cm-policy-click`

This event is triggered on the `.cmSliding` component class when the developer has requested the display of a link to the cookies policy, and the user has clicked on this link.

## NPM peer dependencies

Starting with v 1.0.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`. 

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.4.0:
```
    'lodash': '^4.17.0'
```

Each of these dependencies should be installed at application level:
```
    meteor npm install <package> --save
```

## Translations

New and updated translations are willingly accepted, and more than welcome. Just be kind enough to submit a PR on the [Github repository](https://github.com/trychlos/pwix-cookie-manager/pulls).

## Cookies and comparable technologies

`pwix:cookie-manager` makes use of `localStorage` to record its technical and functionals required informations. Some of these are considered as non disableable by the user, and are advertised as such.

## References

- [Loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000000886460)

- [Regulation (EU) 2016/679 of the European parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679)

- [Charter of fundamental rights of the European union (2012/C 326/02)](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A12012P%2FTXT)

- [Convention for the Protection of Individuals with regard to Automatic Processing of Personal Data (ETS No. 108)](https://www.coe.int/en/web/conventions/full-list/-/conventions/treaty/108)

- [Lignes_directrices_de_la_cnil_sur_les_cookies_et_autres_traceurs]()

- [Recommandation-cookies-et-autres-traceurs]()

- [Guidelines 05/2020 on consent under Regulation 2016/679](https://edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_en.pdf)

---
P. Wieser
- Last updated on 2023, Sep. 18th
