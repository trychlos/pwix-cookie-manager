# pwix:cookie-manager

## ChangeLog

### 2.0.1

    Release date: 2024- 6- 8

    - Upgrade pwix:modal dependency
    - Fix the breakpoints constants inclusion in stylesheet

### 2.0.0

    Release date: 2024- 6- 8

    - Replace obsolete pwix:layout v1 dependency with pwix:ui-layout v2 bumping major candidate version number

### 1.4.1

    Release date: 2024- 5-25

    - Meteor 3.0 ready

### 1.4.0

    Release date: 2023- 9-18

    - Remove cookies from our storage when user no more allow them (todo #15, todo #25)
    - Bump pwix:modal requirement to v 1.8.0
    - Back to Meteor 2.9.0
    - Let the application define its own categories (todo #3)
    - Let the application decides if it displays a 'Reject All' button (todo #6)
    - Provide a configurable manager link (todo #28, todo #30)
    - Provide a configurable policy link (todo #27)

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
- Last updated on 2024, Jun. 8th
