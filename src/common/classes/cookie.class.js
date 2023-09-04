/*
 * /imports/common/classes/cookie.class.js
 *
 * This class manages the Cookie object.
 */

import _ from 'lodash';

export class Cookie {

    // static data

    // private data
    _vars = {
        responsible: null,
        name: null,
        category: null,
        description: null,
        lifetime: null,
        enabled: null,
        disableable: null,
        link: null
    };

    // static methods

    /**
     * @summary Whether the passed javascript object is a valid cookie declaration
     * @param o a javascript object which describes the cookie
     *  See the full description in package README.md#cookiemanager-publish
     * @returns {Cookie} a new Cookie object, or null
     *  As this is rather a programmer issue, we only send console.warn()s rather than fully user-compliant error messages
     */
    static Validate( o ){
        const valid = Cookie._isObject( o )
            && Cookie._isNameValid( o ) && Cookie._isResponsibleValid( o ) && Cookie._isCategoryValid( o ) && Cookie._isDescriptionValid( o )
            && Cookie._isLifetimeValid( o ) && Cookie._isEnabledValid( o ) && Cookie._isDisableableValid( o ) && Cookie._isLinkValid( o );
        return valid ? new Cookie( o ) : null;
    }

    // static private methods

    // whether the string has a reserved char
    static _hasReservedChar( str ){
        let has = false;
        CM_RESERVED_CHARS.every(( ch ) => {
            if( str.indexOf( ch ) >= 0 ){
                console.warn( 'pwix:cookie-manager found \''+ch+'\' reserved char in \''+str+'\'' );
                has = true;
            }
            return true;
        });
        return has;
    }

    // validate the category of the cookie
    static _isCategoryValid( o ){
        let valid = true;
        if( !o.category ){
            console.warn( 'pwix:cookie-manager expects cookie declaration have a category, found null or undefined' );
            valid = false;
        } else if( !Object.keys( CookieManager.C.Category ).includes( o.category )){
            console.warn( 'pwix:cookie-manager expects cookie category be declared as one of a CookieManager.Category, found', o.category );
            valid = false;
        }
        return valid;
    }

    // validate the description of the cookie
    static _isDescriptionValid( o ){
        let valid = true;
        if( o.description ){
            if( !_.isString( o.description )){
                console.warn( 'pwix:cookie-manager expects cookie description be a string, found', o.description );
                valid = false;
            }
        }
        return valid;
    }

    // validate the disableable-ity of the cookie
    static _isDisableableValid( o ){
        let valid = true;
        if( Object.keys( o ).includes( 'disableable' )){
            if( !_.isBoolean( o.disableable )){
                console.warn( 'pwix:cookie-manager expects cookie disableablity to be a boolean, found', o.disableable );
                valid = false;
            }
        } else {
            o.disableable = true;
        }
        return valid;
    }

    // validate the initial status of the cookie
    static _isEnabledValid( o ){
        let valid = true;
        if( Object.keys( o ).includes( 'enabled' )){
            if( !_.isBoolean( o.enabled )){
                console.warn( 'pwix:cookie-manager expects cookie initial status to be a boolean, found', o.enabled );
                valid = false;
            }
        } else {
            o.enabled = false;
        }
        return valid;
    }

    // validate the lifetime of the cookie
    static _isLifetimeValid( o ){
        let valid = true;
        if( !o.lifetime ){
            o.lifetime = pwixI18n.label( I18N, 'cookie.unknown' );
        }
        return valid;
    }

    // validate the external link of the cookie
    static _isLinkValid( o ){
        let valid = true;
        if( o.link ){
            if( !_.isString( o.lifetime )){
                console.warn( 'pwix:cookie-manager expects cookie link be a string, found', o.link );
                valid = false;
            }
        }
        return valid;
    }

    // validate the name of the cookie
    static _isNameValid( o ){
        return Cookie._isValidAsIdentifierPart( o, 'name' );
    }

    // whether we have a javascript object
    static _isObject( o ){
        const valid = o && _.isObject( o );
        if( !valid ){
            console.warn( 'pwix:cookie-manager expects a cookie declaration, got null or undefined' );
        }
        return valid;
    }

    // validate the responsible of the cookie
    static _isResponsibleValid( o ){
        return Cookie._isValidAsIdentifierPart( o, 'responsible' );
    }

    // is this string valid as part of the cookie identifier
    //  this is about 'responsible' and 'name'
    static _isValidAsIdentifierPart( o, name ){
        let valid = true;
        if( !o[name] ){
            console.warn( 'pwix:cookie-manager expects cookie declaration have a '+name+', found null or undefined' );
            valid = false;
        } else if( !_.isString( o[name] )){
            console.warn( 'pwix:cookie-manager expects cookie '+name+' be a string, found', o[name] );
            valid = false;
        } else if( Cookie._hasReservedChar( o[name] )){
            valid = false;
        }
        return valid;
    }

    // public data

    /**
     * Constructor
     * @param o a javascript object which describes the cookie
     * @returns {Cookie} the Cookie object instance
     */
    constructor( o ){
        this._vars.responsible = o.responsible;
        this._vars.name = o.name;
        this._vars.category = o.category;
        if( o.description ){
            this._vars.description = o.description;
        }
        this._vars.lifetime = o.lifetime;
        this._vars.enabled = o.enabled;
        this._vars.disableable = o.disableable;
        if( o.link ){
            this._vars.link = o.link;
        }
    }

    /**
     * Getter
     * @returns {String} the category of the cookie
     */
    category(){
        return this._vars.category;
    }

    /**
     * Getter
     * @returns {Boolean} whether the cookie can be disabled by the user
     */
    disableable(){
        return this._vars.disableable;
    }

    /**
     * Getter/Setter
     * @param {Boolean} enabled whether the user allows this cookie
     * @returns {Boolean} whether the cookie is enabled (either as a default, or because it is not disableable, of because the user has accepted it)
     */
    enable( enabled ){
        if( arguments.length > 0 && ( enabled === true || enabled === false )){
            this._vars.enabled = enabled;
            console.debug( this._vars.responsible, this._vars.name, 'enable', enabled );
        }
        return this._vars.enabled;
    }

    /**
     * Getter
     * @returns {String} the unique identifier of the cookie
     */
    identifier(){
        return this._vars.responsible + CM_SLASH + this._vars.name;
    }

    /**
     * Getter
     * @returns {String} the name of the cookie
     */
    name(){
        return this._vars.name;
    }

    /**
     * Getter
     * @returns {String} the responsible of the cookie
     */
    responsible(){
        return this._vars.responsible;
    }
}
