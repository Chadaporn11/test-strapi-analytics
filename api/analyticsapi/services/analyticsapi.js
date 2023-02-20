'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const { google } = require("googleapis");

module.exports = {
    async testGoogleAuth() {
        const view_id = 284498222;
        const reporting = google.analyticsreporting("v4");

        const service_account = {
            type: process.env.type,
            project_id: process.env.project_id,
            private_key_id: process.env.private_key_id,
            private_key: process.env.private_key
            ,
            client_email: process.env.client_email,
            client_id: process.env.client_id,
            auth_uri: process.env.auth_uri,
            token_uri: process.env.token_uri,
            auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
            client_x509_cert_url: process.env.client_x509_cert_url
            ,
        };

        let scopes = [process.env.scopes];

        let jwt = new google.auth.JWT(
            service_account.client_email,
            null,
            service_account.private_key,
            scopes
        );

        const token = await jwt.authorize();
        const data = {
            token: token,
            api_key: process.env.API_KEYV4,
            view_id: process.env.VIEW_IDV4
        }

        return data;
    },
};
