facebookPassportStrategy = require("passport-facebook").Strategy
githubPassportStrategy = require("passport-github2").Strategy
googlePassportStrategy = require("passport-google-oauth20").Strategy
twitterPassportStrategy = require("passport-twitter").Strategy
discordPassportStrategy = require("passport-discord").Strategy
functions = require("./../functions.js")

/**
 * Configure Passport.js strategies for various social login providers.
 * @param {object} app - The Express application.
 * @param {object} passport - The Passport.js instance.
 * @param {object} DB - The database instance.
 */
module.exports = function(app, passport, DB) {
    // Facebook Passport strategy
    passport.use(new facebookPassportStrategy({
            clientID: process.env.CLIENT_ID_FACEBOOK,
            clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
            callbackURL: "http://localhost:2000/auth/facebook/callback",
            // profileFields: ['id', 'photos', 'name', 'displayName', 'gender', 'profileUrl', 'email'],
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile)
            return done(null, profile)
        }
    ));

    // GitHub Passport strategy
    passport.use(new githubPassportStrategy({
        clientID: process.env.CLIENT_ID_GITHUB,
        clientSecret: process.env.CLIENT_SECRET_GITHUB,
        callbackURL: "http://localhost:2000/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          console.log(profile)
          return done(null, profile)
        }
    ));

    // Google Passport strategy
    passport.use(new googlePassportStrategy({
        clientID: process.env.CLIENT_ID_GOOGLE,
        clientSecret: process.env.CLIENT_SECRET_GOOGLE,
        callbackURL: "http://localhost:2000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
      }
    ));

    // Twitter Passport strategy
    passport.use(new twitterPassportStrategy({
        consumerKey: process.env.CLIENT_ID_TWITTER,
        consumerSecret: process.env.CLIENT_SECRET_TWITTER,
        callbackURL: "http://localhost:2000/auth/twitter/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile);
      }
    ));

    // Discord Passport strategy
    passport.use(new discordPassportStrategy({
        clientID: process.env.CLIENT_ID_DISCORD,
        clientSecret: process.env.CLIENT_SECRET_DISCORD,
        callbackURL: "http://localhost:2000/auth/discord/callback",
        scope: ['identify', 'email']
      },
      async function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        return done(null, profile)
      }
    ));
}
