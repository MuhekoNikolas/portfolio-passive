const fetch = import("node-fetch")

const { JSDOM } = require('jsdom');
const _DOMPurify = require('dompurify');

// Creating a new window instance for DOMPurify
const window = new JSDOM('').window;
const DOMPurify = _DOMPurify(window);

// Exporting the module with Express app, Passport (optional), and DB parameters
module.exports = async function(app, passport=null, DB){

    // Route to handle editing a draft blog post
    app.post("/blogs/drafts/edit/:draftId/", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditor, (req,resp)=>{

        // return resp.send("me")
        thisPageDraft = functions.getDraftById(DB, req.params.draftId)
    
        if(thisPageDraft == null){
            resp.send("404.ejs")
        } else {
            if(req.loggedInUser.id == thisPageDraft.author_id){
                savedBlog = functions.saveBlog(DB, thisPageDraft.id, )
                req.pageBlog = thisPageDraft
                resp.render("newBlog.ejs", {req})
            } else {
                resp.send("Not authorized")
            }
        }
    })

    // Route to save content of a draft blog post
    app.post("/blogs/drafts/edit/:draftId/save", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, (req,resp)=>{
        content = req.body.content

        if(content == null){
            obj = {
                success: false,
                message: "Missing content"
            }
            resp.json(JSON.stringify(obj))
            return
        }

        thisPageDraft = functions.getDraftById(DB, req.params.draftId)
    
        if(thisPageDraft == null){
            obj = {
                success: false,
                message: "Invalid Draft id"
            }
            resp.json(JSON.stringify(obj))
            return

        } else {
            if(req.loggedInUser.id == thisPageDraft.author_id){
                content = DOMPurify.sanitize(content)
                savedDraft = functions.saveDraft(DB, thisPageDraft.id, content )
                req.pageBlog = thisPageDraft
                obj = {
                    success: true,
                    message: "Saved successfully"
                }
                resp.json(JSON.stringify(obj))
            } else {
                obj = {
                    success: false,
                    message: "Not authorized to edit/save this Draft"
                }
                resp.json(JSON.stringify(obj))
            }
        }
    })

    // Route to handle uploading a draft blog post as a new blog
    app.post("/blogs/drafts/edit/:draftId/upload", await functions.getLoggedInUserMiddleware(DB), functions.userMustBeEditorAPI, async (req,resp)=>{
        blogTitle = req.body.title
        blogDescription = req.body.description
        blogBanner = req.body.blogBanner

        if(blogTitle == null  || blogTitle.length <= 1){
            obj = {
                success: false,
                message: "Blog title must not be empty."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        if(blogDescription == null  || blogDescription.length <= 10 ){
            obj = {
                success: false,
                message: "Blog description must be longer than 10 characters."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        if(blogBanner == null  || blogBanner.length <= 10 || !(blogBanner.match(new RegExp(/^data:image\/(\w+);base64,(.*)$/))) ){
            obj = {
                success: false,
                message: "Invalid blog banner."
            }
            resp.json(JSON.stringify(obj))
            return
        }

        try{
            thisPageDraft = functions.getDraftById(DB, req.params.draftId)
            if(thisPageDraft == null){
                obj = {
                    success: false,
                    message: "Invalid Draft id"
                }
                resp.json(JSON.stringify(obj))
                return
            } else {
                if(DOMPurify.sanitize(thisPageDraft.content, {USE_PROFILES: {html: false}}).length <= 10){
                    obj = {
                        success: false,
                        message: "The blog's content must be longer than 10 characters."
                    }
                    resp.json(JSON.stringify(obj))
                    return
                }
                if(req.loggedInUser.id == thisPageDraft.author_id){
                    savedBlog = functions.createNewBlog(DB, thisPageDraft, blogTitle, blogDescription, blogBanner, Date.now())
                    _DB = DB.DBPool.getRandomDB()
                    _DB.prepare("DELETE FROM drafts WHERE id=?;").run(savedBlog.id)

                    obj = {
                        success: true,
                        message: "Uploaded successfully",
                        createdBlogId: savedBlog.blog_url_id
                    }
                    resp.json(JSON.stringify(obj))
                } else {
                    obj = {
                        success: false,
                        message: "Not authorized to upload this Blog"
                    }
                    resp.json(JSON.stringify(obj))
                }
            }
        } catch(err){
            console.log(err.message)
            obj = {
                success: false,
                message: "An error occurred."
            }
            resp.json(JSON.stringify(obj))
        }
    })
}
