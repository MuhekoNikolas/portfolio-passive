axios = require("axios")

/**
 * Configure API routes for the Express application.
 * @param {object} app - The Express application.
 * @param {object} DB - The database instance.
 */
module.exports = function(app, DB) {

    /**
     * Route to serve skills.json file.
     */
    app.get("/api/skills.json", (req, resp) => {
        resp.sendFile("skills.json", {
            root: __dirname + "/../apiResources"
        })
    })

    /**
     * Route to serve projects.json file.
     */
    app.get("/api/projects.json", (req, resp) => {
        resp.sendFile("projects.json", {
            root: __dirname + "/../apiResources"
        })
    })

    /**
     * Route to serve contacts.json file.
     */
    app.get("/api/contacts.json", (req, resp) => {
        resp.sendFile("contacts.json", {
            root: __dirname + "/../apiResources"
        })
    })

    /**
     * Route to serve portfolioOwner.json file.
     */
    app.get("/api/portfolioOwner.json", (req, resp) => {
        resp.sendFile("portfolioOwner.json", {
            root: __dirname + "/../apiResources"
        })
    })

    /**
     * Route to get lorem ipsum text from an external API.
     */
    app.get("/api/loremipsum", async (req, resp) => {
        try {
            const _resp = await axios.get("https://loripsum.net/api")
            const data = _resp.data         
            resp.json({ success: true, text: data })
        } catch (err) {
            resp.json({ success: false, message: "An error occurred" })
        }
    })
}
