/*
 * pwix:cookie-manager/src/common/js/categories.js
 */

CookieManager.Categories = [
    {
        id: 'TECHNICALS',
        label_i18n: 'tabs.technicals.label',
        title_i18n: 'tabs.technicals.title',
        content_i18n: 'tabs.technicals.title'
    },
    {
        id: 'FUNCTIONALS',
        label_i18n: 'tabs.functionals.label',
        title_i18n: 'tabs.functionals.title',
        content_i18n: 'tabs.technicals.title'
    },
    {
        id: 'STATISTICS',
        label_i18n: 'tabs.statistics.label',
        title_i18n: 'tabs.statistics.title',
        content_i18n: 'tabs.technicals.title'
    },
    {
        id: 'MARKETING',
        label_i18n: 'tabs.marketing.label',
        title_i18n: 'tabs.marketing.title',
        content_i18n: 'tabs.technicals.title'
    },
    {
        id: 'THIRD_PARTY',
        label_i18n: 'tabs.third.label',
        title_i18n: 'tabs.third.title',
        content_i18n: 'tabs.technicals.title'
    }
];

/**
 * @summary find a category by its id
 * @param {String} id 
 * @returns {Object} the category
 */
CookieManager.Categories.byId = function( id ){
    let found = null;
    CookieManager.Categories.every(( it ) => {
        if( it.id === id ){
            found = it;
            return false;
        }
        return true;
    });
    return found;
}
