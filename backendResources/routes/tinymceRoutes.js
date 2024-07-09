const axios = require("axios");

module.exports = function(app, DB){

    // Route to fetch oEmbed data based on query parameters
    app.get("/1/embed", async (req, resp)=>{
        url = `${config.oembedOrigin}/oembed${req._parsedOriginalUrl.search}`

        try {
            const _resp = await axios.get(url);
            const data = _resp.data;
            resp.json(data);
        } catch (err) {
            console.log(err.message);
            resp.json({ success: false, message: "An error occurred" });
        }
    });

    // Route to fetch oEmbed data from Iframely
    app.get("/iframely", async (req, resp)=>{
        url = `${config.oembedOrigin}${req._parsedOriginalUrl.href}`;

        try {
            const _resp = await axios.get(url);
            const data = _resp.data;
            resp.json(data);
        } catch (err) {
            resp.json({ success: false, message: "An error occurred" });
        }
    });

    // Route to check the validity of a URL
    app.get("/1/check", async (req, resp)=>{
        requestedUrl = req.query.url;

        try {
            if (requestedUrl == null) {
                obj = { results: [{ url: "https://fjkokfoifjfiljfudik.com", result: "UNKNOWN" }] };
                return resp.json(obj);
            }

            const _req = await axios.get(requestedUrl);
            if (_req.status >= 200 && _req.status < 300) {
                obj = { results: [{ url: requestedUrl, result: "VALID" }] };
                return resp.json(obj);
            } else {
                obj = { results: [{ url: requestedUrl, result: "INVALID" }] };
                return resp.json(obj);
            }
        } catch(err) {
            obj = { results: [{ url: "https://fjkokfoifjfiljfudik.com", result: "UNKNOWN" }] };
            return resp.json(obj);
        }
    });

    // Route to check the validity of multiple URLs via POST
    app.post("/1/check", async (req, resp)=>{
        requestedUrls = req.body?.urls;
        var requestedUrl;

        try {
            if (requestedUrls == null || requestedUrls.length < 1) {
                obj = { results: [{ url: "NONE", result: "INVALID" }] };
                return resp.json(obj);
            }

            requestedUrl = requestedUrls[0]?.url;

            const _req = await axios.get(requestedUrl);
            if (_req.status >= 200 && _req.status < 300) {
                obj = { results: [{ url: requestedUrl, result: "VALID" }] };
                return resp.json(obj);
            } else {
                obj = { results: [{ url: requestedUrl, result: "INVALID" }] };
                return resp.json(obj);
            }
        } catch(err) {
            console.log(err.message);
            obj = { results: [{ url: "https://invalidurlunknown.com", result: "INVALID" }] };
            return resp.json(obj);
        }
    });

    // Route to serve autocorrect JSON file
    app.get("/2/autocorrect", (req, resp)=>{
        try {
            resp.sendFile("/autocorrect.json", {
                root: "./backendResources/apiResources"
            });
        } catch (err) {
            resp.send("{}");
        }
    });

}
