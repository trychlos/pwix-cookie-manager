/*
 * /imports/common/classes/cookie.class.js
 *
 * This class manages the Cookie object.
 */

import _ from 'lodash';
import { strict as assert } from 'node:assert';

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

export class Cookie {

    // static data

    // private data
    _vars = {
        responsible: null,  // a mandatory string identifier
        name: null,         // a mandatory string identifier
        category: null,     // the full Category object
        description: null,
        lifetime: null,
        disableable: null,
        link: null
    };

    // static methods

    /**
     * @summary Whether the passed javascript object is a valid cookie declaration
     * @param {Object} o a javascript object which describes the cookie
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
                logger.warn( 'Cookie._hasReservedChar() found \''+ch+'\' reserved char in \''+str+'\'' );
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
            logger.warn( 'Cookie._isCategoryValid() expects cookie declaration have a category, found', o.category );
            valid = false;
        } else {
            const cat = CookieManager.Categories.byId( o.category );
            if( cat ){
                o.category = cat;
            } else {
                logger.warn( 'Cookie._isCategoryValid() expects cookie category be declared as one of a CookieManager.Category, found', o.category );
                valid = false;
            }
        }
        return valid;
    }

    // validate the description of the cookie
    static _isDescriptionValid( o ){
        let valid = true;
        if( o.description ){
            if( !_.isString( o.description )){
                logger.warn( 'Cookie._isDescriptionValid() expects cookie description be a string, found', o.description );
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
                logger.warn( 'Cookie._isDisableableValid() expects cookie disableablity to be a boolean, found', o.disableable );
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
                logger.warn( 'Cookie._isEnabledValid() expects cookie initial status to be a boolean, found', o.enabled );
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
                logger.warn( 'Cookie._isLinkValid expects cookie link be a string, found', o.link );
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
            logger.warn( 'Cookie._isObject() expects a cookie declaration, got null or undefined' );
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
            logger.warn( 'Cookie._isValidAsIdentifier() expects cookie declaration have a '+name+', found null or undefined' );
            valid = false;
        } else if( !_.isString( o[name] )){
            logger.warn( 'Cookie._isValidAsIdentifier() expects cookie '+name+' be a string, found', o[name] );
            valid = false;
        } else if( Cookie._hasReservedChar( o[name] )){
            valid = false;
        }
        return valid;
    }

    // private methods

    /*
     * @returns {String} whether the cookie is enabled or disabled, or undefined if doesn't exist
     */
    _storeReadSet(){
        const value = localStorage.getItem( this.enabledKey());
        return value;
    }

    /*
     * Getter
     * @returns {String} the value of the cookie in localStorage, or undefined if doesn't exist
     */
    _storeReadValue(){
        const value = localStorage.getItem( this.valueKey());
        return value;
    }

    /*
     * @param {Boolean} enabled whether the cookie is allowed by the user
     */
    _storeWriteSet( enabled ){
        assert.ok( enabled === true || enabled === false, 'pwix:cookie-manager Cookie._storeWriteSet() expect a boolean, got', enabled );
        localStorage.setItem( this.enabledKey(), enabled ? 'enabled' : 'disabled' );
    }

    /*
     * @param {String} value
     */
    _storeWriteValue( value ){
        localStorage.setItem( this.valueKey(), value );
    }

    // public data

    /**
     * Constructor
     * @param o a javascript object which describes the cookie
     * @returns {Cookie} the Cookie object instance
     *  'enabled' and 'value' are runtime properties, and so not kept - they are always read from/written to the localStorage
     */
    constructor( o ){
        this._vars.responsible = o.responsible;
        this._vars.name = o.name;
        this._vars.category = o.category;
        this._vars.description = o.description || '';
        this._vars.lifetime = o.lifetime || pwixI18n.label( I18N, 'cookie.unknown' );
        if( o.disableable === 'true' || o.disableable === false ){
            this._vars.disableable = o.disableable;
        } else {
            this._vars.disableable = true;
        }
        this._vars.link = o.link || '';

        // at construction time, make sure the cookie exists on local storage and synchronize with the instance
        let string = this._storeReadSet();
        // if the cookie already exists, we do not care of the provided 'enabled' property, and rely on the stored one
        if( string === 'enabled' || string === 'disabled' ){
            // if enabled, we set a value if it doesn't exist yet
            if( string === 'enabled' && o.value ){
                const value = this._storeReadValue();
                if( value === null || value === undefined ){
                    this._storeWriteValue( o.value );
                }
            }
            // if disabled, make sure the value is removed
            if( string === 'disabled' ){
                this.removeValue();
            }
        } else {
            // if the cookie didn't yet exist, it is created as enabled / disabled if the property is specified as this instanciation time
            // else default to false (cookie not allowed) as specified in the README
            let enabled;
            if( o.enabled === true || o.enabled === false ){
                enabled = o.enabled;
            } else {
                enabled = false;
            }
            this._storeWriteSet( enabled );
            // if the cookie is enabled, and we have a value, sync it in local storage
            // if the cookie is disabled, then make sure we do not persist any value
            if( enabled ){
                if( o.value !== undefined ){
                    this._storeWriteValue( o.value );
                }
            } else {
                this.removeValue();
            }
        }
    }

    /**
     * Getter
     * @returns {Object} the category of the cookie
     *  See CookieManager.Categories for a description of the returned object
     */
    category(){
        return this._vars.category;
    }

    /**
     * Getter
     * @returns {String} the description of the cookie
     */
    description(){
        return this._vars.description;
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
    enabled( enabled ){
        if( arguments.length > 0 && ( enabled === true || enabled === false )){
            this._storeWriteSet( enabled );
        }
        return this._storeReadSet() === 'enabled';
    }

    /**
     * Getter
     * @returns {String} the full key which records the enabled|disabled status
     */
    enabledKey(){
        return CM_RESPONSIBLE + CM_SLASH + this.identifier() + '/set';
    }

    /**
     * Getter
     * @returns {String} the unique identifier of the cookie
     */
    identifier(){
        return this.responsible() + CM_SLASH + this.name();
    }

    /**
     * Getter
     * @returns {String} the lifetime as a user indication (e.g. 'illimited', 'session', ...)
     */
    lifetime(){
        return this._vars.lifetime;
    }

    /**
     * Getter
     * @returns {String} an optional link to the site which has declared this cookie
     */
    link(){
        return this._vars.link;
    }

    /**
     * Getter
     * @returns {String} the name of the cookie
     */
    name(){
        return this._vars.name;
    }

    /**
     * @summary remove the value key from local storage
     */
    removeValue(){
        const key = CM_RESPONSIBLE + CM_SLASH + this.identifier() + '/value';
        localStorage.removeItem( key );
    }

    /**
     * Getter
     * @returns {String} the responsible of the cookie
     */
    responsible(){
        return this._vars.responsible;
    }

    /**
     * Getter/Setter
     * @param {String} value the value to be written
     * @returns {String} the stored value, can be undefined
     *  Is always undefined if cookie is not enabled
     */
    value( value ){
        const enabled = this.enabled();
        if( value !== undefined ){
            if( enabled ){
                this._storeWriteValue( value );
            } else {
                logger.warn( 'Cookie.value() refusing to write the value of a disabled cookie' );
                return undefined;
            }
        }
        if( enabled ){
            return this._storeReadValue(); // which may be undefined
        }
        return undefined;
    }

    /**
     * Getter
     * @returns {String} the full key which records the value
     */
    valueKey(){
        return CM_RESPONSIBLE + CM_SLASH + this.identifier() + '/value';
    }
}
