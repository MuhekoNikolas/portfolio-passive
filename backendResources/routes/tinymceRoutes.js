




axios = require("axios")


module.exports = function(app, DB){

    app.get("/1/embed", async (req, resp)=>{
        url = `${config.oembedOrigin}/oembed${req._parsedOriginalUrl.search}`

        console.log(url)
        try{
            _resp = await axios.get(url)
            data = _resp.data         
            resp.json(data)
        } catch (err){
            console.log(err.message)
            resp.json(JSON.parse(`{"success":"false", "message":"An error occured"}`))
        }
    })

    app.get("/iframely", async (req, resp)=>{
        url = `${config.oembedOrigin}${req._parsedOriginalUrl.href}`

        try{
            _resp = await axios.get(url)
            data = _resp.data         
            resp.json(data)
        } catch (err){
            resp.json(JSON.parse(`{"success":"false", "message":"An error occured"}`))
        }
    })


    app.get("/1/check", async (req,resp)=>{
        requestedUrl = req.query.url 

        try{
            if(requestedUrl == null){
                obj = {results:[{url:"https://fjkokfoifjfiljfudik.com",result:"UNKNOWN"}]}
                return resp.json(obj)
            }

            _req = await axios.get(requestedUrl)
            if (_req.status >= 200 && _req.status < 300) {
                obj = {results:[{url:requestedUrl,result:"VALID"}]}
                return resp.json(obj)
            } else {
                obj = {results:[{url:requestedUrl,result:"INVALID"}]}
                return resp.json(obj)
            }

        } catch(err){
            obj = {results:[{url:"https://fjkokfoifjfiljfudik.com",result:"UNKNOWN"}]}
            return resp.json(obj)
        }

    })


    app.post("/1/check", async (req,resp)=>{
        requestedUrls = req.body?.urls 
        var requestedUrl;

        try{
            if(requestedUrls == null || requestedUrls.length < 1){
                obj = {results:[{url:"NONE",result:"INVALID"}]}
                return resp.json(obj)
            }

            requestedUrl = requestedUrls[0]?.url

            _req = await axios.get(requestedUrl)
            if (_req.status >= 200 && _req.status < 300) {
                obj = {results:[{url:requestedUrl,result:"VALID"}]}
                return resp.json(obj)
            } else {
                obj = {results:[{url:requestedUrl,result:"INVALID"}]}
                return resp.json(obj)
            }

        } catch(err){
            console.log(err.message)
            obj = {results:[{url:"https://invalidurlunknown.com",result:"INVALID"}]}
            return resp.json(obj)
        }
    })

    app.get("/2/autocorrect", (req,resp)=>{
        try{
            resp.sendFile("/autocorrect.json", {
                root: "./backendResources/apiResources"
            })
        } catch (err) {
            resp.send("{}")
        }

    })

}