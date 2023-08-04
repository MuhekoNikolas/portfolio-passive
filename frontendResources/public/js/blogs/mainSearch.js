




window.addEventListener("load", ()=>{
    addEventsToWindow()

    generateBlogContainerPreviewBoxes()

    removeDefaultEventFromAnchors()

    initializeTopBarObserver(".topGradientBanner", 0, "-30px 0px")

    initializeTagContainerObserver(".blogsSection", 1, "0px")

    initiateBlogSearchInputEvents()

    initializeHidingEventOnLoginAndSignupFormsContainer()
})


document.querySelector(".blogSearchInput").addEventListener("load", (event)=>{
    initiateBlogSearchInputEvents()
})