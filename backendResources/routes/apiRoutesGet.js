

axios = require("axios")

module.exports = function(app, DB){

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

    app.get("/api/loremipsum", async (req,resp)=>{
        try{
            _resp = await axios.get("https://loripsum.net/api")
            data = _resp.data         
            resp.json({success:true, text:data})
        } catch (err){
            resp.json({success:false, message:"An error occured"})
        }
    })
}