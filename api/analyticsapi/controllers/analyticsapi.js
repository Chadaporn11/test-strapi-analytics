'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    token() {
        // console.log('strapi::', strapi.services.analyticsapi.testGoogleAuth)
        return strapi.services.analyticsapi.testGoogleAuth()
    }
};
