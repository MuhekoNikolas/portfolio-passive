const crypto = require("crypto")
apiGetRoutes = require("./apiRoutesGet.js")
tinymceRoutes = require("./tinymceRoutes.js")
passportAuthRoutes = require("../passport/passportAuthRoutes.js")
functions = require("./../functions.js")

/**
 * Configure routes for the Express application.
 * @param {object} app - The Express application.
 * @param {object} passport - The Passport.js instance.
 * @param {object} DB - The database instance.
 */
module.exports = async function(app, passport = null, DB) {

    /**
     * Route for the home page.
     */
    app.get("/", (req, resp) => {
        if (resp.headersSent == false) {
            req.session["user"] = "Mio"
            resp.render("portfolio.ejs")
        }
    })

    /**
     * Route for the blogs page.
     */
    app.get("/blogs", await functions.getLoggedInUserMiddleware(DB), (req, resp, next) => {
        if (resp.headersSent == false) {
            if (req.query.login != undefined) {
                req.query.login = "1"
                if (req.session?.userLoggedIn != true) {
                    resp.render("blogs.ejs", { loginParam: req.query.login, req })
                    return
                }
            }

            if (req.query.signup != undefined) {
                req.query.signup = "1"
                if (req.session?.userLoggedIn != true) {
                    resp.render("blogs.ejs", { signupParam: req.query.signup, req })
                    return
                }
            }

            resp.render("blogs.ejs", { req })
            return
        }
    })

    /**
     * Route for the blog search page.
     */
    app.get("/blogs/search", await functions.getLoggedInUserMiddleware(DB), (req, resp) => {
        resp.render("search.ejs", { req })
    })

    /**
     * Route for a user's profile page.
     */
    app.get("/blogs/users/:userId", await functions.getLoggedInUserMiddleware(DB), (req, resp) => {
        profileOwnerId = req.params.userId
        resp.render("profile.ejs", { req })
    })

    /**
     * Route for an article page.
     */
    app.get("/blogs/article/:articleUrlId", await functions.getLoggedInUserMiddleware(DB), (req, resp) => {
        pageBlogUrlId = req.params.articleUrlId
        splittedUrl = pageBlogUrlId.split("_")
        splittedUrlId = splittedUrl[splittedUrl.length - 1]

        pageBlog = functions.getBlogById(DB, splittedUrlId)

        if (pageBlog == null) {
            resp.send("404")
            return
        }

        _DB = DB.DBPool.getRandomDB()
        pageBlogAuthor = functions.findUser(_DB, 'id=?', pageBlog.author_id)

        if (pageBlogAuthor.success == false) {
            resp.send("404")
            return
        }

        pageBlog.author = pageBlogAuthor.foundUser

        resp.render("articlePage.ejs", { req: req, pageBlog: pageBlog })
    })

    /**
     * Route to create a new blog draft.
     */
    app.get("/blogs/new/", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req, resp) => {
        newDraftId = crypto.randomUUID()
        this.functions.createDraft(DB, newDraftId, req.loggedInUser.id, "")
        resp.redirect(`/blogs/drafts/edit/${newDraftId}`)
    })

    /**
     * Route to edit a blog draft.
     */
    app.get("/blogs/drafts/edit/:draftId", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req, resp) => {
        thisPageDraft = functions.getDraftById(DB, req.params.draftId)

        if (thisPageDraft == null) {
            resp.send("404.ejs")
        } else {
            if (thisPageDraft.author_id != req.loggedInUser.id) {
                obj = {
                    success: false,
                    message: "Not authorized to edit this Blog"
                }
                resp.json(obj)
                return
            }

            req.pageBlog = thisPageDraft
            resp.render("newBlog.ejs", { req })
        }
    })

    /**
     * Route to log in to the blog.
     */
    app.get("/blogs/login", functions.userMustNotBeLoggedIn, (req, resp) => {
        resp.redirect("/blogs/?login")
    })

    /**
     * Route to sign up for the blog.
     */
    app.get("/blogs/signup", functions.userMustNotBeLoggedIn, (req, resp) => {
        resp.redirect("/blogs/?signup")
    })

    /**
     * Route to log out of the blog.
     */
    app.get("/blogs/logout", functions.userMustBeLoggedIn, (req, resp) => {
        req.logout((err) => {
            if (err) {
                // Show error
                resp.send("An error occurred")
                return
            }
            resp.redirect("/blogs")
        })
    })

    // Initialize passport authentication routes
    passportAuthRoutes(functions, passport)

    // Initialize API get routes
    apiGetRoutes(app, DB)

    // Initialize TinyMCE routes
    tinymceRoutes(app, DB)
}
