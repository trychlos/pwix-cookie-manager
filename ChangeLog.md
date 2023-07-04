# pwix:cookie-manager

## ChangeLog

## ChangeLog

### 1.3.1-rc

    Release date: 

    - 

### 1.3.0

    Release date: 2023- 7- 4

    - Change CookieManager attachement message
    - Upgrade pwix:layout version requirement to get layout.less constants
    - Upgrade pwix:modal version requirement to get Modal object
    - Rename globally exported cookieManager to CookieManager (bumping candidate version number)
    - Reorganize constants to not pollute the global space

### 1.2.0

    Release date: 2023- 6-22

    - Add references from EU and CNIL to maintainers/docs
    - Define consentLifetime configuration parameter (todo #11)
    - Forgot the user consent after this configured lifetime (todo #8)
    - Do not display the cmSliding component when being rendered after having been requested by a bot crawler (requires pwix:ssr)
    - Add a dependency on pwix:layout to better manage small devices
    - Increment the minimal pwix:modal version
    - Replace merge depency with lodash
    - Rename conf to _conf making clearer this is a private variable (todo #21)
    - Merge config.js + defaults.js into configure.js (todo #22)
    - configure() now acts both as a getter and a setter (todo #23)
    - Review the CookieManager attachement message (todo #13)
    - Have CookieManager.i18n.namespace() (todo #20)
    - Add a dependency on pwix:toggle-switch package

### 1.1.1

    Release date: 2023- 5- 2

    - Remove reactive-dict dependency
    - Fix 1.1.0 release date

### 1.1.0

    Release date: 2023- 5- 2

    - Obsoletes cmConsent, replacing it with an internal cm_manager, trigerred by runManager() public method
    - Bump pwix:modal required version to v 1.3.0 to make the cookie manager actually blocking
    - Clarify README on when the cmSliding component is shown, and when not shown again

### 1.0.1

    Release date: 2023- 5- 1

    - Fix Meteor packaging

### 1.0.0

    Release date: 2023- 5- 1

    - Initial release

---
P. Wieser
- Last updated on 2023, July 4th
