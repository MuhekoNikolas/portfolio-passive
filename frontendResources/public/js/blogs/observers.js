/**
 * Initializes an IntersectionObserver for the top bar container.
 * @param {string|null} initiatorQuery - Query selector for the initiator element.
 * @param {number} threshold - Intersection threshold for triggering changes.
 * @param {string|null} rootMargin - Margin around the root element.
 */
function initializeTopBarObserver(initiatorQuery=null, threshold=1, rootMargin=null){
    const mainWrapper = document.querySelector("#mainWrapper");
    const topBarContainerInitiator = document.querySelector(initiatorQuery || ".blogsPageTopPicksSection");
    const topBar = document.querySelector(".topBar");

    // Intersection observer for the top bar container
    const topBarContainerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Toggle CSS class based on intersection state
                topBar.classList.toggle("changeColorToWhite", entry.isIntersecting == false);
            });
        },
        {
            root: mainWrapper,
            rootMargin: rootMargin || "0px",
            threshold: threshold
        }
    );

    topBarContainerObserver.observe(topBarContainerInitiator);
}

/**
 * Initializes an IntersectionObserver for the tag container.
 * @param {string|null} initiatorQuery - Query selector for the initiator element.
 * @param {number} threshold - Intersection threshold for triggering changes.
 * @param {string|null} rootMargin - Margin around the root element.
 */
function initializeTagContainerObserver(initiatorQuery=null, threshold=1, rootMargin=null){
    const mainWrapper = document.querySelector("#mainWrapper");
    const tagsContainerInitiator = document.querySelector(initiatorQuery || ".blogsPageTopPicksSection");
    const tagsContainer = document.querySelector(".blogsPageBlogsAndTagsSection .blogTagsSection");

    let _lastBoundingRect = null;

    // Event listener for window resize
    window.addEventListener("resize", (event) => {
        if(!_lastBoundingRect){
            return;
        } else {
            tagsContainer.style.position = "relative";
            tagsContainer.style.left = "0px";
            _newBoundingRect = tagsContainer.getBoundingClientRect();

            tagsContainer.style.position = `fixed`;
            tagsContainer.style.left = `${_newBoundingRect.x}px`;
        }
    });

    // Intersection observer for the tags container
    const tagsContainerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting == false) {
                    _lastBoundingRect = tagsContainer.getBoundingClientRect();

                    if (_lastBoundingRect.y <= 75) {
                        _lastBoundingRect.y = 85;
                    }

                    tagsContainer.style.position = `fixed`;
                    tagsContainer.style.left = `${_lastBoundingRect.x}px`;
                    tagsContainer.style.top = `${_lastBoundingRect.y}px`;
                } else {
                    tagsContainer.style.position = `relative`;
                    tagsContainer.style.left = `0px`;
                    tagsContainer.style.top = `0px`;
                }
            });
        },
        {
            root: mainWrapper,
            rootMargin: rootMargin || "0px",
            threshold: threshold
        }
    );

    tagsContainerObserver.observe(tagsContainerInitiator);
}
