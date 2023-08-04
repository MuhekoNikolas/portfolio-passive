


window.addEventListener("load", ()=>{
    addEventsToWindow()

    removeDefaultEventFromAnchors()

    initEditor()

    initializeHidingEventOnLoginAndSignupFormsContainer()
})


function initEditor(){
    tinymce.init({
        selector: ".newBlogContentEditor",
        menubar:false,
        toolbar:false,
        statusbar: false,
        inline: true,
        plugins: "autoresize",
        skin:"snow",
        icons:"thin",
        content_css: '/css/pc/blogs/blogContent.css',
    
        setup: (editor)=>{
            editor.mode.set("readonly");
    
            setTimeout(()=>{
                document.querySelector('.newBlogContentEditor').style.visibility = "visible"
            }, 1000)
        }
    })
}
