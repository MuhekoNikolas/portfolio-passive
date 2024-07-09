passport = require("passport")
passportStrategies = require("./passportStrategies.js")

/**
 * Configure Passport.js middleware for the Express application.
 * @param {object} app - The Express application.
 * @param {object} DB - The database instance.
 */
module.exports = function(app, DB) {
    // Initialize Passport.js middleware
    app.use(passport.initialize());
    app.use(passport.session());

    /**
     * Serialize user information into the session.
     * @param {object} user - The user object.
     * @param {function} cb - The callback function.
     */
    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
            let serializedUser;

            // Serialize user based on the provider
            if (user.provider == "facebook") {
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user.profileUrl || "http://localhost:2000/images/pfp.jpg",
                    provider: "facebook"
                }
            } else if (user.provider == "github") {
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user.avatar_url || "http://localhost:2000/images/pfp.jpg",
                    provider: "github"
                }
            } else if (user.provider == "google") {
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user._json.picture || "http://localhost:2000/images/pfp.jpg",
                    provider: "google"
                }
            } else if (user.provider == "twitter") {
                serializedUser = {
                    id: user.id,
                    displayName: user.displayName,
                    profilePicture: user._json.profile_image_url_https || "http://localhost:2000/images/pfp.jpg",
                    provider: "twitter"
                }
            } else if (user.provider == "discord") {
                serializedUser = {
                    id: user.id,
                    displayName: user.global_name || user.username,
                    profilePicture: "http://localhost:2000/images/pfp.jpg",
                    provider: "discord"
                }
            }
    
            return cb(null, serializedUser);
        });
    });

    /**
     * Deserialize user information from the session.
     * @param {object} user - The serialized user object.
     * @param {function} cb - The callback function.
     */
    passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
            return cb(null, user);
        });
    });

    // Initialize Passport strategies
    passportStrategies(app, passport, DB)
}
