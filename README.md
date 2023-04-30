# pwix:cookie-manager

A cookie management package for Meteor which aims to conform to "Guidelines 05/2020 on consent under Regulation 2016/679" EU recomandations.

It provides:

- the methods to let the application (resp. another package) publish their respectives _cookies_ to respect the disclosure obligation

- a consentement dialog as a Blaze component

- the methods to let the application (resp. another package) get the _cookies_ status.

This has been written because `selaias:cookie-consent` seems to no more be maintained. So the need of a current package has arisen. Note that, contrarily to `selaias:cookie-consent`, this one doesn't requise `ostrio:cookies`. Instead, it relies on `localStorage` to store user consentement.

## The _cookie_ object

`pwix:cookie-manager` doesn't manage the cookies by themselves, I mean their value. So, whether the _cookie_ is really a cookie, i.e. a data file sent from the server to the client before HTTP headers, and so on, is entirey up to the application (resp. another package).

Instead, `pwix:cookie-manager` manages what can be called the cookie _semantic_, i.e. a name and a description, an originator, a category, a status, along with some other properties which are only lelevant for the aim of management. All that semantic, along wihh the user consentement, is stored in the `localStorage` of the browser.

`pwix:cookie-manager` distinguishes five type of cookies:

- `CM_CAT_TECHNICALS`
- `CM_CAT_FUNCTIONALS`
- `CM_CAT_STATISTICS`
- `CM_CAT_MARKETING`
- `CM_CAT_THIRD`

`pwix:cookie-manager` makes the cookie have three status:

- it may be enabled and not disableable: the cookie is operational, and the user cannot refuse it

- it may be enabled and disableable: the cookie defaults to be operational, but the user can refuse it

- it may be disabled: the cookie is not operational, has been previously refused by the user.

## Configuration

The package's behavior can be configured through a call to the `cookieManager.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `dumpUpdate`

    Whether to dump the localStorage when updating the user choices.

    Default to `false`.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `CM_VERBOSE_NONE`

        Do not display any trace log to the console

    - `CM_VERBOSE_COMPONENTS`

        Trace Blaze components life:

        - creation
        - rendering
        - destruction

    - `CM_VERBOSE_CONFIGURE`

        Trace `cookieManager.configure()` calls and their result

    - `CM_VERBOSE_DUMP`

        Dump the `cookieManager` global object at startup.

    - `CM_VERBOSE_STORAGE`

        Dump the localStorage at startup (client-side only).

Please note that `cookieManager.configure()` method should be called in the same terms both in client and server sides.

Also note, as an explicit reminder for the fools, that, because the Meteor packages are instanciated at application level, they can be configured once at most, and only once at most. Each addtionnal call to `cookieManager.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## Provides

### A global object

`cookieManager`

This object is allocated at package level: there is only one instance in your application. It gathers the available methods (see below).

`pwix:cookie-manager` attaches this global object to the global Meteor one, so that every willing-to packages is able to take advantage of the available methods to publish their own _cookies_ throught `Meteor.cookieManager`, without having to first `require` or `import` the package, or even make it a dependency.

### Constants

- `CM_VERBOSE_NONE`
- `CM_VERBOSE_COMPONENTS`
- `CM_VERBOSE_CONFIGURE`
- `CM_VERBOSE_DUMP`
- `CM_VERBOSE_STORAGE`

- `CM_CAT_TECHNICALS`
- `CM_CAT_FUNCTIONALS`
- `CM_CAT_STATISTICS`
- `CM_CAT_MARKETING`
- `CM_CAT_THIRD`

### References

#### `cookieManager.Categories`

The array of the known _cookies_ categories:

- `CM_CAT_TECHNICALS`
- `CM_CAT_FUNCTIONALS`
- `CM_CAT_STATISTICS`
- `CM_CAT_MARKETING`
- `CM_CAT_THIRD`

### Methods

#### `cookieManager.byCategory( category )`

Returns the array of published cookies for the specified category.

#### `cookieManager.configure( o )`

See above.

#### `cookieManager.isEnabled( name )`

Returns whether the named _cookie_ is authorized by the user.

#### `cookieManager.publish( o )`

This method let the application (resp. another package) publish the cookies it makes use of, so that the user is able to be informed of what he accepts or refuses.

In order to not rely on the initialization order, this method should be called from `Meteor.startup()`.

`o` here is either a javascript object which describes a cookie, or an array of such javascript objects. It may contains following datas:

- `name`

    The technical name of the cookie, as a string, so that, for example, this coud be checked by the user in his browser.

    This `name` is expected to be a unique identifier of the cookie, cannot be empty.

- `responsible`

    The application (resp. another package) name, as a string.

- `category`

    The category the cookie belong to.

    Must be referenced in `cookieManager.Categories`.

- `description`

    A brief description of the role of the cookie, as a string.

    Defaulting to none.

- `lifetime`

    The lifetime of the cookie, as a string, from just the navigation session life to illimited.

    Defaulting to english « Unknown ».

- `disableable`

    Whether the cookie can be refused by the user.

    Defaulting to `true`.

- `link`

    When we are describing a third-party cookie, the third-party main web site address.

    Defaulting to none.

### Blaze components

#### `cmConsent`

A modal dialog which let the user choose his privacy preferences.

The component is configurable with an object passed as an argument, which may contain:

- `dialogTitle`

    An optional string to be used as title in the dialog header, defaulting to english « Cookies preferences ».

- `acceptButton`

    An optional string to be used as the label of the `Accept all` button, defaulting to english « Accept all ».

- `chooseButton`

    An optional string to be used as the label of the `Set my choices` button, defaulting to english « Set my choices ».

- `functionalsAfter`

    An optional HTML string to be used after the content of the `functionals` tab, defaulting to nothing.

- `functionalsBefore`

    An optional HTML string to be used before the content of the `functionals` tab, defaulting to nothing.

- `functionalsContent`

    An optional HTML string to be used as the content of the `functionals` tab, defaulting to english

    « ...

- `functionalsLabel`

    An optional string to be used as the label of the `functionals` button, defaulting to english « Functional cookies ».

- `functionalsTitle`

    An optional HTML string to be used as the title of the `functionals` tab, defaulting to HTML '`<h5>Functional cookies</h5>`'..

- `marketingAfter`

    An optional HTML string to be used after the content of the `marketing` tab, defaulting to nothing.

- `marketingBefore`

    An optional HTML string to be used before the content of the `marketing` tab, defaulting to nothing.

- `marketingContent`

    An optional HTML string to be used as the content of the `marketing` tab, defaulting to english

    « ...

- `marketingLabel`

    An optional string to be used as the label of the `marketing` button, defaulting to english « Marketing cookies ».

- `marketingTitle`

    An optional HTML string to be used as the title of the `marketing` tab, defaulting to HTML '`<h5>Marketing cookies</h5>`'..

- `privacyAfter`

    An optional HTML string to be used after the content of the `privacy` tab, defaulting to nothing.

- `privacyBefore`

    An optional HTML string to be used before the content of the `privacy` tab, defaulting to nothing.

- `privacyContent`

    An optional HTML string to be used as the content of the `privacy` tab, defaulting to english

    « When you visit a web site, it may record some informations about you, your device, the previous web site you come from, or any other information it may find useful.<br />
    « These informations are stored as _cookies, or other comparable technologies, which are essentially small data files.<br />
    « Because your privacy is essential for us, we request your explicit consent to use and store these _cookies_.

- `privacyLabel`

    An optional string to be used as the label of the `privacy` button, defaulting to english « Your privacy ».

- `privacyTitle`

    An optional HTML string to be used as the title of the `privacy` tab, defaulting to HTML '`<h5>Your privacy</h5>`'.

- `rejectButton`

    An optional string to be used as the label of the `Reject all` button, defaulting to english « Reject all ».

- `statisticsAfter`

    An optional HTML string to be used after the content of the `statistics` tab, defaulting to nothing.

- `statisticsBefore`

    An optional HTML string to be used before the content of the `statistics` tab, defaulting to nothing.

- `statisticsContent`

    An optional HTML string to be used as the content of the `statistics` tab, defaulting to english

    « ...

- `statisticsLabel`

    An optional string to be used as the label of the `statistics` button, defaulting to english « Statistics cookies ».

- `statisticsTitle`

    An optional HTML string to be used as the title of the `statistics` tab, defaulting to HTML '`<h5>Statistics cookies</h5>`'..

- `technicalsAfter`

    An optional HTML string to be used after the content of the `technicals` tab, defaulting to nothing.

- `technicalsBefore`

    An optional HTML string to be used before the content of the `technicals` tab, defaulting to nothing.

- `technicalsContent`

    An optional HTML string to be used as the content of the `technicals` tab, defaulting to english

    « ...

- `technicalsLabel`

    An optional string to be used as the label of the `technicals` button, defaulting to english « Technicals cookies ».

- `technicalsTitle`

    An optional HTML string to be used as the title of the `technicals` tab, defaulting to HTML '`<h5>Technicals cookies</h5>`'..

- `thirdAfter`

    An optional HTML string to be used after the content of the `third` tab, defaulting to nothing.

- `thirdBefore`

    An optional HTML string to be used before the content of the `third` tab, defaulting to nothing.

- `thirdContent`

    An optional HTML string to be used as the content of the `third` tab, defaulting to english

    « ...

- `thirdLabel`

    An optional string to be used as the label of the `third` button, defaulting to english « Third-party cookies ».

- `thirdTitle`

    An optional HTML string to be used as the title of the `third` tab, defaulting to HTML '`<h5>Third-party cookies</h5>`'..

This dialog is modal, i.e. it blocks any user input other than clicking one the three buttons.

#### `cmSliding`

A sliding band displayed in the bottom of the screen, to let the user choose his preferences.

Contrarily to `cmConsent`, this component is not blocking. The user is able to just ignore it.

The component is configurable with an object passed as an argument, which may contain:

## NPM peer dependencies

Starting with v 0.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`. 

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 0.1.0:
```
    'merge': '^2.1.1'
```

Each of these dependencies should be installed at application level:
```
    meteor npm install <package> --save
```

---
P. Wieser
- Last updated on 2023, Apr. 29th
