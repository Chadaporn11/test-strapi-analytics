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
            type: "service_account",
            project_id: "test-getanalysicv4",
            private_key_id: "2cdbf05a19ed3ab227e1179ab18b6c378ab221d2",
            private_key:
                "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEHaCRAjOIrueA\nIky0as7aTqLkilsdU9fcOzPQeWG5jUzSUoyjVIKCdyib97wJnFmx1q+vc9LRG26N\nIcOEfp/UqVQgL9QYqOy4HkiQA/ru0fWg01MWrbJA28OumI8WojG/0FIzN/7LKJ5p\nFFvYnS4sXnmrnW57PcyaFsLaGu8TdavssNtTll3KwcBbYnXAUEFvqoI9Oi/aQ+JF\nIEjtmcAtcJDwefzZBxe5uzU4RY8glH99eoQvi6JbTaW48WUuOp0bf+tEXx997Erw\nJr6zPMYi/dLOeL6DUEx7p6sGGs4TKh9bVzVm0oQ0324riC3KZpHY9MVO9MQsXr+s\nvqVY7zChAgMBAAECggEAPjBe8FzQVrGP+5Pk2vlbquJwySQOjJg/xTiIz70N/jcO\ne0tuCYUM9a4vlHXUjP+leb1obKy/10tpnRtt0qAMsvUXFjXUfhVjK2d+/xwkAINX\n7q3UlUZzVhnaTY1XIohAWmEHD/LbuzSgNxYboe8F60/yKTd9B1ure9ln5J3R3ktO\nGSXvmW6PagbpyvVkTlyH1TDg9Jz24pRtJ2O8t0M63i5IErwbOPGL5ukmkypPsNL7\nkoZjFUA0RN9682uyfvaiTisHcsG0ug9pV+HIkhvVGmnZTvAIQL64Mr6ghXbsUGzf\n6yXII5L+Pd9/TskOfUAc8iN0nM624Dtz3+3r8qDeOQKBgQDlqybkzMs9WNVvmysZ\no7FqIYqAE0SplWBTzfazKFMKCjzNyZuahb2qysfvAXLHWJfGASO9oySlY52c5hha\nSlSpAfCdQRx+7bMbElpm2nDstrNdJKCiFb3JnwjKic3pxcTlVdTfoOQyAXnYFhK8\nORsGp4z+UQQW4I09/BW0DTpwfwKBgQDambBJ2wyNKNi7QcQeTST8Sc4KUy1hz/i5\nA+zz63a6D99zzyKaiIq6HVQHaUsFiAvx9YcE4j7PxUJnPrlWDHYDaftwoUQP/4F0\nKwU5RidVyTvBQ4k7+mI8ezi3r6AeCL4vgFn22xrEmltY9OjAmSviFWN05jLa4xVt\nvfEOQv/O3wKBgQCEdMowqOAKWIJ4JJCd7+dxYzjCltpBx9HPY3kFaJtDrhXVRZIF\nc16o8tyOPlKZH8IgwyV+yGlpLWOISrf+0uGyu1ivCQ9LMQHb+iDDMvZvvwsBDA/M\niydy8dKbJRDp41KkRXVJKDyTjoBcHJbfkTvCAb3yKn1mSEmNVyaZOgvbNwKBgQDN\nob8caosvClp+JAppeqYtEPxZ6A6LsUhGOnQeq8PemOnZFeN2PLVLCCWwZxLkXCro\na8+b/3uYlPW3C2DqmgQ1h++37muJJQ/QiFt8mgqMfyTP00j3+7uHK16aJAJZ3l2R\nb4qxVUCj6pO9ZXzBGBUYsogBQj5aez0AI6nrgYkDPwKBgQCunPitZtSQHJHaEXMk\nlSMYY4G1SvoSFw/2TJbtUUMtX+YIMGEphbkgFJM/Btk5EvTWSdmmycfJW7F7XJsh\nVapjVOIRywIa+Wf5Z+617fqYKqi/4mJOs99c1FFcDUEt06pbb2XBB5k28LYnlth7\nHwnoQT24B7BGle0Yt1G3oxGzxQ==\n-----END PRIVATE KEY-----\n",
            client_email: "test-getanalytics4@test-getanalysicv4.iam.gserviceaccount.com",
            client_id: "116415325320486271627",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url:
                "https://www.googleapis.com/robot/v1/metadata/x509/blog-135%40myprojectapi-288519.iam.gserviceaccount.com",
        };

        let scopes = ["https://www.googleapis.com/auth/analytics.readonly"];

        let jwt = new google.auth.JWT(
            service_account.client_email,
            null,
            service_account.private_key,
            scopes
        );

        const token = await jwt.authorize();

        return token;
    },
};
