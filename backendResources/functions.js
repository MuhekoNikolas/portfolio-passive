const crypto = require("crypto")
const fetch = import("node-fetch")

const { JSDOM } = require('jsdom');
const _DOMPurify = require('dompurify');

// Create a DOM window instance for DOMPurify
const window = new JSDOM('').window;
const DOMPurify = _DOMPurify(window);


/**
 * Finds a user in the database based on provided queries and values.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} queries - SQL WHERE clause for querying users.
 * @param {array} values - Values to be inserted into the query.
 * @returns {object} - Object with success status and found user data.
 */
function findUser(DB, queries, values){
    try {
        // Query the database to find a user based on provided criteria
        foundUser = DB.prepare(`SELECT * FROM users WHERE ${queries};`).get(values)
        return { success: true, foundUser: foundUser}
    } catch(err){
        // Return error message if user is not found or an error occurs
        return {success:false, message:err.message}
    }
}

/**
 * Creates a new user in the database.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} queries - SQL columns for inserting new user data.
 * @param {string} valueQueries - SQL values placeholders.
 * @param {array} values - Values to be inserted into the query.
 * @returns {object} - Object with success status and created user data.
 */
function createUser(DB, queries, valueQueries, values){
    try {
        // Insert new user into the database
        DB.prepare(`INSERT INTO users ${queries} VALUES ${valueQueries};`).run(values)
        // Retrieve the created user from the database
        createdUser = DB.prepare("SELECT * FROM users WHERE id=?").get(values[0])
        return { success: true, createdUser}
    } catch(err){
        // Return error message if user creation fails
        return {success:false, message:err.message}
    }
}

/**
 * Manages user login after successful social authentication.
 * 
 * @param {object} req - Express request object.
 * @param {object} resp - Express response object.
 * @returns {void}
 */
async function manageSuccessSocialLogin(req, resp){
    // Retrieve user profile data from session
    profile = req.session.passport.user
    _DB = DB.DBPool.getRandomDB()

    // Find user data in the database based on social profile
    foundUserData = findUser(_DB, `${profile.provider}_id=?`, [profile.id])

    if(foundUserData.success == false){
        _DB.close()
        req.logout((err)=>{})
        // Redirect to login page with error if user not found
        return resp.redirect("/blogs/?login=1&error=1")
    }

    if(foundUserData.foundUser == undefined){
        // Create new user if not found in the database
        createdUserData = createUser(_DB, `('id', 'fullName', 'profilePicture', '${profile.provider}_id')`, `(?, ?, ?, ?)`, [`${crypto.randomUUID()}`, profile.displayName, await imageUrlToDataurl(profile.profilePicture), profile.id])

        if(createdUserData.success == false){
            _DB.close((err)=>{})
            req.logout((err)=>{})
            // Redirect to signup page with error if user creation fails
            return resp.redirect("/blogs/?signup&error=1")
        }

        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = createdUserData.createdUser.id
        // Redirect to blogs page after successful login/signup
        return resp.redirect("/blogs")
    } else {
        _DB.close()
        req.session["userLoggedIn"] = true
        req.session["loggedInUserId"] = foundUserData.foundUser.id
        // Redirect to blogs page after successful login
        return resp.redirect("/blogs")
    }
}

/**
 * Middleware to retrieve logged-in user information.
 * 
 * @param {object} DB - Database instance or connection.
 * @returns {function} - Middleware function to retrieve logged-in user.
 */
function getLoggedInUserMiddleware(DB){
    return async (req, resp, next) => {
        _DB = DB.DBPool.getRandomDB()
        // Retrieve logged-in user details and attach to request object
        req.loggedInUser = await getLoggedInUser(DB, req)
        next()
    }
}

/**
 * Retrieves logged-in user based on session ID.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {object} req - Express request object.
 * @returns {object|null} - Found user object or null if user is not logged in.
 */
async function getLoggedInUser(DB, req){
    if(req?.session?.loggedInUserId == null){
        return null
    } else {
        // Find user based on session ID
        foundUser = findUser(_DB, `id=?`, [req.session.loggedInUserId]).foundUser
        return foundUser
    }
}

/**
 * Middleware to ensure user is not logged in.
 * 
 * @param {object} req - Express request object.
 * @param {object} resp - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {void}
 */
function userMustNotBeLoggedIn(req, resp, next){
    // Redirect to blogs page if user is already logged in
    if(req.session?.userLoggedIn == true){
        resp.redirect("/blogs")
        return
    } else {
        next()
        return
    }
}

/**
 * Middleware to ensure user is logged in.
 * 
 * @param {object} req - Express request object.
 * @param {object} resp - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {void}
 */
function userMustBeLoggedIn(req, resp, next){
    // Redirect to login page if user is not logged in
    if(req.session?.userLoggedIn == true){
        next()
        return
    } else {
        resp.redirect("/blogs/?login=1")
        return
    }
}

/**
 * Converts an image URL to a data URL format.
 * 
 * @param {string} imageUrl - URL of the image to convert.
 * @returns {string} - Data URL of the image.
 */
async function imageUrlToDataurl(imageUrl){
    try{
        _request = await fetch(imageUrl)
    } catch (err){
        // Use default image URL if provided image URL is invalid
        _request = await fetch("http://localhost:2000/images/pfp.jpg")
    }

    buffer = await _request.arrayBuffer()
    stringifiedBuffer = Buffer.from(buffer).toString("base64")
    contentType = _request.headers.get("content-type")
    res = `data:${contentType};base64,${stringifiedBuffer}`
    return res
}

/**
 * Creates a new draft in the database.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} draftId - ID of the draft to create.
 * @param {string} loggedInUser - ID of the logged-in user.
 * @param {string} content - Content of the draft (optional).
 * @returns {string} - ID of the created draft.
 */
function createDraft(DB, draftId, loggedInUser, content=""){
    _DB = DB.DBPool.getRandomDB()
    // Insert new draft into the database
    _DB.prepare(`INSERT INTO drafts (id, author_id, content) VALUES (?,?,?);`).run([draftId, loggedInUser, content])
    return draftId
}

/**
 * Retrieves a draft from the database based on draft ID.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} draftId - ID of the draft to retrieve.
 * @returns {object|null} - Found draft object or null if draft is not found.
 */
function getDraftById(DB, draftId){
    _DB = DB.DBPool.getRandomDB()
    foundDraft = _DB.prepare(`SELECT * FROM drafts WHERE id=?`).get([draftId])
    if(foundDraft == undefined){
        return null
    } else {
        return foundDraft
    }
}

/**
 * Middleware to ensure user is an editor.
 * 
 * @param {object} req - Express request object.
 * @param {object} resp - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {void}
 */
function userMustBeEditor(req,resp, next){
    if(req.session?.userLoggedIn == true){
        // Check if logged-in user is an editor
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

/**
 * Middleware to ensure user is an editor for API requests.
 * 
 * @param {object} req - Express request object.
 * @param {object} resp - Express response object.
 * @param {function} next - Next middleware function.
 * @returns {void}
 */
function userMustBeEditorAPI(req, resp, next){
    if(req.session?.userLoggedIn == true){
        // Check if logged-in user is an editor for API requests
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

/**
 * Saves draft content in the database.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} blogId - ID of the blog/draft to update.
 * @param {string} content - Content to save for the draft.
 * @returns {void}
 */
function saveDraft(DB, blogId, content){
    _DB = DB.DBPool.getRandomDB()
    // Update draft content in the database
    _DB.prepare("UPDATE drafts SET content=? WHERE id=?;").run(content, blogId)
}

/**
 * Creates a new blog from a draft in the database.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {object} draft - Draft object to create a blog from.
 * @param {string} title - Title of the blog.
 * @param {string} description - Description of the blog.
 * @param {string} banner - URL or data URL of the blog banner image.
 * @param {number} currentDate - Current timestamp for creation date.
 * @returns {object} - Created blog object.
 */
function createNewBlog(DB, draft, title, description, banner, currentDate){
    _DB = DB.DBPool.getRandomDB()
    blogURL_ID = `${encodeURIComponent(title.replaceAll(" ", "_"))}_${draft.id}`
    blogReadingTime = getReadingTime(draft.content)
    // Insert new blog into the database
    _DB.prepare("INSERT INTO blogs (id, blog_url_id, author_id, title, banner, description, content, readingTime, created_at) VALUES (?,?,?,?,?,?,?,?, ?)").run(draft.id, blogURL_ID, draft.author_id, title, banner, description, draft.content, blogReadingTime, currentDate)
    // Retrieve the created blog from the database
    createdBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(draft.id)
    return createdBlog
}

/**
 * Retrieves a blog from the database based on blog ID.
 * 
 * @param {object} DB - Database instance or connection.
 * @param {string} blogId - ID of the blog to retrieve.
 * @returns {object|null} - Found blog object or null if blog is not found.
 */
function getBlogById(DB, blogId){
    _DB = DB.DBPool.getRandomDB()
    foundBlog = _DB.prepare("SELECT * FROM blogs WHERE id=?").get(blogId)
    if(foundBlog == undefined){
        return null
    } else {
        return foundBlog
    }
}

/**
 * Calculates reading time for a given text.
 * 
 * @param {string} text - Text content to calculate reading time.
 * @returns {number} - Estimated reading time in minutes.
 */
function getReadingTime(text){
    averageSpeed = 225;
    words = text.trim().split(/\s+/).length;
    time = Math.ceil(words / averageSpeed);
    return time;
}

// Export all functions and constants
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
