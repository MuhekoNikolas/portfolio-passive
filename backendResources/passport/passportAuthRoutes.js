/**
 * Setup authentication routes for the Express application.
 * @param {object} functions - An object containing helper functions.
 * @param {object} passport - The Passport.js instance.
 */
module.exports = function(functions, passport) {
    // Facebook authentication route
    app.get("/auth/facebook", functions.userMustNotBeLoggedIn, passport.authenticate("facebook" /* { scope: ["email", "user_link"] } */));
    
    // Facebook authentication callback route
    app.get("/auth/facebook/callback", functions.userMustNotBeLoggedIn, passport.authenticate("facebook", { failureRedirect: "/blogs/?login=1" }), async (req, resp) => {
        await functions.manageSuccessSocialLogin(req, resp);
    });

    // GitHub authentication route
    app.get("/auth/github", functions.userMustNotBeLoggedIn, passport.authenticate("github"));
    
    // GitHub authentication callback route
    app.get("/auth/github/callback", functions.userMustNotBeLoggedIn, passport.authenticate("github", { failureRedirect: "/blogs/?login=1" }), async (req, resp) => {
        await functions.manageSuccessSocialLogin(req, resp);
    });

    // Google authentication route
    app.get("/auth/google", functions.userMustNotBeLoggedIn, passport.authenticate("google", { scope: ['profile', 'email'] }));
    
    // Google authentication callback route
    app.get("/auth/google/callback", functions.userMustNotBeLoggedIn, passport.authenticate("google", { scope: ['profile', 'email'], failureRedirect: "/blogs/?login=1" }), async (req, resp) => {
        await functions.manageSuccessSocialLogin(req, resp);
    });

    // Twitter authentication route
    app.get("/auth/twitter", functions.userMustNotBeLoggedIn, passport.authenticate("twitter", { scope: ['tweet.read', 'users.read', 'offline.access'] }));
    
    // Twitter authentication callback route
    app.get("/auth/twitter/callback", functions.userMustNotBeLoggedIn, passport.authenticate("twitter", { scope: ['tweet.read', 'users.read', 'offline.access'], failureRedirect: "/blogs/?login=1" }), async (req, resp) => {
        await functions.manageSuccessSocialLogin(req, resp);
    });

    // Discord authentication route
    app.get("/auth/discord", functions.userMustNotBeLoggedIn, passport.authenticate("discord"));
    
    // Discord authentication callback route
    app.get("/auth/discord/callback", functions.userMustNotBeLoggedIn, passport.authenticate("discord", { failureRedirect: "/blogs/?login=1" }), async (req, resp) => {
        await functions.manageSuccessSocialLogin(req, resp);
    });
}
