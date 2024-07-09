require("dotenv").config() // Load environment variables from .env file

express = require("express")
path = require("path")

util = require('node:util');
exec = util.promisify(require('node:child_process').exec)

expressSession = require("express-session")

config = require("./backendResources/config.js")
passportJS = require("./backendResources/passport/passport.js")
getRoutes = require("./backendResources/routes/get.js")
postRoutes = require("./backendResources/routes/post.js")

DB = require("./backendResources/databases/DB.js")

app = express()

// Middleware to parse JSON and URL-encoded data with specified limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the specified directory
app.use(express.static(__dirname + "/frontendResources/public"))

// Configure session middleware
app.use(expressSession({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', './frontendResources/private/html');

// Initialize Passport.js with the app and database
passportJS(app, DB)

// Setup route handlers for GET and POST requests
getRoutes(app, passport, DB)
postRoutes(app, passport, DB)

// Command to run Iframely server
iframelyCode = "node server"

/**
 * Asynchronously runs the Express and Iframely servers.
 */
async function runServers() {
    // Get the path to the Iframely application
    expressIframelyAppPath = path.join(__dirname, '/iframely');

    console.log(expressIframelyAppPath)
    
    // Start the Express server
    app.listen(config.port, () => {
        console.log(`Portfolio is running on ${config.host}:${2000}`)
    })

    // Execute the Iframely server
    // const { stdout, stderr } = await exec('node server', { cwd: expressIframelyAppPath });
    // if (stderr) {
    //     console.log("An error occurred while loading Iframely.")
    //     process.exit()
    // }
}

// Run the servers
runServers()