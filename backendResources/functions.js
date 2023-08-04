const crypto = require("crypto")
const fetch = require("node-fetch")

const { JSDOM } = require('jsdom');
const _DOMPurify = require('dompurify');

const window = new JSDOM('').window;
const DOMPurify = _DOMPurify(window);


function findUser(DB, queries, values){

    try{
        foundUser = DB.prepare(`SELECT * FROM users WHERE ${queries};`).get(values)
        return { success: true, foundUser:foundUser}
    } catch(err){
        return {success:false, message:err.message}
    }
}


function createUser(DB, queries, valueQueries, values){

    try{
        DB.prepare(`INSERT INTO users ${queries} VALUES ${valueQueries};`).run(values)
        createdUser = DB.prepare("SELECT * FROM users WHERE id=?").get(values[0])
        return { success: true, createdUser}
    } catch(err){
        return {success:false, message:err.message}
    }
}


async function manageSuccessSocialLogin(req, resp){

    profile = req.session.passport.user
    _DB = DB.DBPool.getRandomDB()

    foundUserData = findUser(_DB, `${profile.provider}_id=?`, [profile.id])

    if(foundUserData.success == false){
        // console.log(foundUserData)
        _DB.close()
        req.logout((err)=>{})
        return resp.redirect("/blogs/?login=1&error=1")
    }

    if(foundUserData.foundUser == undefined){
        createdUserData = createUser(_DB, `('id', 'fullName', 'profilePicture', '${profile.provider}_id')`, `(?, ?, ?, ?)`, [`${crypto.randomUUID()}`, profile.displayName, await imageUrlToDataurl(profile.profilePicture), profile.id])

        if(createdUserData.success == false){
            _DB.close((err)=>{})
            req.logout((err)=>{})
            return resp.redirect("/blogs/?signup&error=1")
        }

        // console.log(createdUserData, "uhgugu")
        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = createdUserData.createdUser.id
        return resp.redirect("/blogs")

    } else {
        // console.log(foundUserData.foundUser, "gyuguygig")
        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = foundUserData.foundUser.id
        return resp.redirect("/blogs")
    }
}


function getLoggedInUserMiddleware(DB){
    return async (req, resp, next) => {
        _DB = DB.DBPool.getRandomDB()
        req.loggedInUser = await getLoggedInUser(DB, req)
        next()
    }
}

async function getLoggedInUser(DB, req){
    if(req?.session?.loggedInUserId == null){
        return null
    } else {
        foundUser = findUser(_DB, `id=?`, [req.session.loggedInUserId]).foundUser
        return foundUser
    }
}


function userMustNotBeLoggedIn(req, resp, next){
    
    if(req.session?.userLoggedIn == true){
        resp.redirect("/blogs")
        return
    } else {
        next()
        return
    }
}


function userMustBeLoggedIn(req, resp, next){
    if(req.session?.userLoggedIn == true){
        next()
        return
    } else {
        resp.redirect("/blogs/?login=1")
        return
    }
}


async function imageUrlToDataurl(imageUrl){
    try{
        _request = await fetch(imageUrl)
    } catch (err){
        _request = await fetch("http://localhost:2000/images/pfp.jpg")
    }

    buffer = await _request.arrayBuffer()
    stringifiedBuffer = Buffer.from(buffer).toString("base64")
    contentType = _request.headers.get("content-type")
    res = `data:${contentType};base64,${stringifiedBuffer}`
    return res
}



function createDraft(DB, draftId, loggedInUser, content=""){
    _DB = DB.DBPool.getRandomDB()
    _DB.prepare(`INSERT INTO drafts (id, author_id, content) VALUES (?,?,?);`).run([draftId, loggedInUser, content])
    return draftId
}


function getDraftById(DB, draftId){
    _DB = DB.DBPool.getRandomDB()
    foundDraft = _DB.prepare(`SELECT * FROM drafts WHERE id=?`).get([draftId])
    if(foundDraft == undefined){
        return null
    } else {
        return foundDraft
    }
}



function userMustBeEditor(req,resp, next){
    //console.log(req.loggedInUser)
    if(req.session?.userLoggedIn == true){
        if(req.loggedInUser.is_editor == true){
            next()
            return
        } else {
            resp.send("Not authorized")
            return
        }
    } else {
        resp.redirect("/blogs/?login=1")
        return
    }
}

function userMustBeEditorAPI(req, resp, next){
    if(req.session?.userLoggedIn == true){
        if(req.loggedInUser.is_editor == true){
            next()
            return
        } else {
            obj = {
                success: false,
                message: "User not authorized to edit/save this document."
            }
            resp.json(JSON.stringify(obj))
        }
    } else {
        obj = {
            success: false,
            message: "User not logged in"
        }
        resp.json(JSON.stringify(obj))
        return
    }
}


function saveDraft(DB, blogId, content){
    _DB = DB.DBPool.getRandomDB()
    _DB.prepare("UPDATE drafts SET content=? WHERE id=?;").run(content, blogId)
}

function createNewBlog(DB, draft, title, description, banner, currentDate){
    _DB = DB.DBPool.getRandomDB()
    blogURL_ID = `${encodeURIComponent(title.replaceAll(" ", "_"))}_${draft.id}`
    blogReadingTime = getReadingTime(draft.content)
    _DB.prepare("INSERT INTO blogs (id, blog_url_id, author_id, title, banner, description, content, readingTime, created_at) VALUES (?,?,?,?,?,?,?,?, ?)").run(draft.id, blogURL_ID, draft.author_id, title, banner, description, draft.content, blogReadingTime, currentDate)
    createdBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(draft.id)
    return createdBlog
}


function getBlogById(DB, blogId){
    _DB = DB.DBPool.getRandomDB()
    foundBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(blogId)
    if(foundBlog == undefined){
        return null
    } else {
        return foundBlog
    }
}


function getReadingTime(text){
    averageSpeed = 225;
    words = text.trim().split(/\s+/).length;
    time = Math.ceil(words / averageSpeed);
    return time;
}


module.exports = {
    findUser,
    createUser,
    manageSuccessSocialLogin,
    getLoggedInUserMiddleware,
    userMustNotBeLoggedIn,
    userMustBeLoggedIn,
    createDraft,
    userMustBeEditor,
    userMustBeEditorAPI,
    getDraftById,
    saveDraft,
    getBlogById,
    createNewBlog,
    getReadingTime
}
