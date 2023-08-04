

require("dotenv").config()

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

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(express.static(__dirname+"/frontendResources/public"))
app.use(expressSession({ secret: 'my-secret-key', resave: false, saveUninitialized: false }));

app.set('view engine', 'ejs');
app.set('views','./frontendResources/private/html');

passportJS(app, DB)

getRoutes(app, passport, DB )
postRoutes(app, passport, DB)

//cd ./iframely; node ./server;


iframelyCode = "node server"


async function runServers(){
    expressIframelyAppPath = path.join(__dirname, '/iframely');

    console.log(expressIframelyAppPath)
    app.listen(config.port, ()=>{
        console.log(`Portfolio is running on ${config.host}:${2000}`)
    })

    const { stdout, stderr } = await exec('node server', {cwd:expressIframelyAppPath});
    if(stderr){
        console.log("An error occuring while loading iframely.")
        process.exit()
    }
}

runServers()

// child_process.exec(iframelyCode, {cwd:expressIframelyAppPath}, (error, stdout, stderr) => {
//     if(error) {
//         console.log(`error: ${error.message}`);
//         process.exit();
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         process.exit();
//     }

//     app.listen(config.port, ()=>{
//         console.log(`Portfolio is running on ${config.host}:${2000}`)
//     })

//     console.log(`stdout: ${stdout}`);
// })

