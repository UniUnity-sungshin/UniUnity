require('dotenv').config();

module.exports={
    web={
        client_id:process.env.MAIL_CREDENTIAL_CLIENTID,
        project_id:process.env.MAIL_CREDENTIAL_PROJECTID,
        auth_uri:"https://accounts.google.com/o/oauth2/auth",
        token_uri:"https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
        client_secret:process.env.MAIL_CREDENTIAL_CLIENTSECRETKEY,
        redirect_uris:["https://developers.google.com/oauthplayground"]
    };
}
