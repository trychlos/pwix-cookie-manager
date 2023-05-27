# pwix:cookie-manager - TODO

## Summary

1. [Todo](#todo)
2. [Done](#done)

---
## Todo

|   Id | Date       | Description and comment(s) |
| ---: | :---       | :---                       |
|    1 | 2023- 4-30 | cmConsent: have a configuration option to display a logo |
|    2 | 2023- 4-30 | cmConsent: have configuration options to provide a template for every category |
|    3 | 2023- 4-30 | be able to configure the categories |
|    4 | 2023- 4-30 | have a dialog to see/update/delete all localStorage items |
|    6 | 2023- 5- 1 | having a reject all button should be configurable |
|      | 2023- 5- 2 | please note that this is a CNIL recommandation to have a 'Reject all' button same size and level than 'Accept all' |
|      |            | cf. '/maintainer/docs/CNIL_2020_092_Recommandation-cookies-et-autres-traceurs.pdf' |
|    7 | 2023- 5- 1 | configure sliding background color |
|   12 | 2023- 5-18 | review display on small devices |
|   13 | 2023( 6-26 | Change 'make the cookieManager available to each and every package' to '...available to all' |
|   14 |  |  |

---
## Done

|   Id | Date       | Description and comment(s) |
| ---: | :---       | :---                       |
|    5 | 2023- 5- 1 | rather than having a dump configuration option, have a verbosity level which triggers on updates |
|      | 2023- 5- 1 | done |
|    8 | 2023- 5- 1 | cmConsent: record ip, timestamp when, and choice (button) as we have to prove that the user has consented |
|      | 2023- 5- 2 | define a single consent trace with all these data as stringified json |
|      | 2023- 5- 2 | consent should be forgotten after one year |
|      | 2023- 5- 2 | done without ip address (needed here) |
|    9 | 2023- 5- 1 | functional cookies should be disableable |
|      | 2023- 5- 2 | this will be done after pwixModal writes width and height in one single data |
|      | 2023- 5- 2 | done with 1.1.0 |
|   10 | 2023- 5- 1 | Provide a link/a button to re-open the cookie manager |
|      | 2023- 5- 2 | cmConsent being replaced with runManager(), this can be seen as done |
|   11 | 2023- 5- 2 | the lifetime of the consent should be configurable |
|      | 2023- 5- 2 | done |

---
P. Wieser
- Last updated on 2023, May 2nd
