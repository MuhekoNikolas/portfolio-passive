




function initializeTopBarObserver(initiatorQuery=null, threshold=1, rootMargin=null){
    mainWrapper = document.querySelector("#mainWrapper")
    topBarContainerInitiator = document.querySelector(initiatorQuery || ".blogsPageTopPicksSection")

    topBar = document.querySelector(".topBar")

    var topBarContainerObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                //console.log(entry)
                topBar.classList.toggle("changeColorToWhite", entry.isIntersecting==false)
            })
        },
        {
            root:mainWrapper,
            rootMargin: rootMargin || "0px",
            threshold:threshold
        }
    )

    topBarContainerObserver.observe(topBarContainerInitiator)

}



function initializeTagContainerObserver(initiatorQuery=null, threshold=1, rootMargin=null){
    mainWrapper = document.querySelector("#mainWrapper")
    tagsContainerInitiator = document.querySelector(initiatorQuery || ".blogsPageTopPicksSection")

    tagsContainer = document.querySelector(".blogsPageBlogsAndTagsSection .blogTagsSection")

    _lastBoundingRect = null

    window.addEventListener("resize", (event)=>{
        if(!_lastBoundingRect){
            return
        } else {
            tagsContainer.style.position = "relative"
            tagsContainer.style.left = "0px"
            _newBoundingRect = tagsContainer.getBoundingClientRect()


            tagsContainer.style.position=  `fixed`
            tagsContainer.style.left=  `${_newBoundingRect.x}px`
        }
    })


    var tagsContainerObserver = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
                if( entry.isIntersecting==false ){
                    _lastBoundingRect = tagsContainer.getBoundingClientRect()

                    if(_lastBoundingRect.y <= 75){
                        _lastBoundingRect.y = 85
                    }

                    tagsContainer.style.position=  `fixed`
                    tagsContainer.style.left=  `${_lastBoundingRect.x}px`
                    tagsContainer.style.top=  `${_lastBoundingRect.y}px`

                    //_lastBoundingRect = tagsContainer.getBoundingClientRect()
                } else {
                    tagsContainer.style.position=  `relative`
                    tagsContainer.style.left=  `0px`
                    tagsContainer.style.top=  `0px`
                }

            })
        },
        {
            root:mainWrapper,
            rootMargin: rootMargin || "0px",
            threshold:threshold
        }
    )

    tagsContainerObserver.observe(tagsContainerInitiator)
}


