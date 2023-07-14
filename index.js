

express = require("express")
config = require("./backendResources/config.js")

getRoutes = require("./backendResources/routes/get.js")
postRoutes = require("./backendResources/routes/post.js")

app = express()

app.use(express.json())
app.use(express.static(__dirname+"/frontendResources"))


getRoutes(app)
postRoutes(app)



app.listen(config.port, ()=>{
    console.log(`Portfolio is running on ${config.host}:${2000}`)
})