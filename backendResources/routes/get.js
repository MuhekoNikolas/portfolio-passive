

module.exports = function(app){

    app.get("/", (req, resp)=>{
        console.log(__dirname+"/../../frontendResources/html/index.html")
        resp.sendFile("index.html", {
            root: __dirname + "/../../frontendResources/html"
        })
    })

    app.get("/api/skills.json", (req,resp)=>{
        resp.sendFile("skills.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/projects.json", (req,resp)=>{
        resp.sendFile("projects.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/contacts.json", (req,resp)=>{
        resp.sendFile("contacts.json", {
            root: __dirname + "/../apiResources"
        })
    })

    app.get("/api/portfolioOwner.json", (req,resp)=>{
        resp.sendFile("portfolioOwner.json", {
            root: __dirname + "/../apiResources"
        })
    })

}