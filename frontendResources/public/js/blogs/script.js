




function addEventsToWindow(){
    window.addEventListener('popstate', (event) => {
        if (event.state) {
           var  loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer")

            if(event.state?.showLoginFormContainer == true){
                showLoginForm()
                loginAndSignupFormsContainer.classList.add("visible") 
                return
            } else if(event.state?.showSignupFormContainer == true){
                showSignupForm()
                loginAndSignupFormsContainer.classList.add("visible") 
                return
            }

        }
    });
}


function manageSideMenuDiv(){
    bioContainer = document.getElementById("navMenuContainer")
    if(bioContainer.classList.contains("opened")){
        bioContainer.classList.add("closed")
        bioContainer.classList.remove("opened")
    } else {
        bioContainer.classList.add("opened")
        bioContainer.classList.remove("closed")
    }
}


function changeTheme(colorTheme){
    colors = {
        "dark":{
            "--c1": "#090927",
            "--c2": "#141339",
            "--c3": "#0C0C2B",
            "--c4": "#111030",
            "--white": "#FFF1F3",
            "--darkWhite1": "#8787AC",
            "--darkWhite2": "#636288",
            "--darkWhite3": "#5E5E88", 
            "--pink": "#FF516D"
        },
        "light":{
            "--c1": "#3ea8da",
            "--c2":"#258ec1",
            "--c3": "#1287BD",
            "--c4":"#1287BD",
            "--white": "white",
            "--darkWhite1": "#FFF1F3",
            "--darkWhite2": "#FFF1F3",
            "--darkWhite3": "#FFF1F3", 
            "--pink": "#FF516D"
        }
    }

    if(!Object.keys(colors).includes(colorTheme)){return false}

    root = document.querySelector(":root")

    selectedTheme = colors[colorTheme]

    for(colorProperty of Object.keys(selectedTheme)){
        root.style.setProperty(colorProperty, selectedTheme[colorProperty])
    }      
    
}

function manageColorTheme(){
    colorThemeButton = document.querySelector(".topBarThemeButton")
    currentTheme = colorThemeButton.getAttribute("data-theme")
    if(currentTheme == "dark"){
        colorThemeButton.setAttribute("data-theme", "light")
        changeTheme("light")
        colorThemeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`
    } else {
        colorThemeButton.setAttribute("data-theme", "dark")
        changeTheme("dark")
        colorThemeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`
    }
}




function generatePickedBlogsPreviewBoxes(){
    blogsPreviewsContainer = document.querySelector(".blogsPageTopPicksSection .topPicksContainer")

    for(_x = 0; _x<6; _x++){
        if(_x < 9){
            counterNumberPrefix = "0"
        } else {
            counterNumberPrefix = ""
        }

        blogsPreviewsContainer.innerHTML += `
            <div class="portfolioOwnerBlogElementContainer">
                <div class="portfolioOwnerBlogElementContainerNumber" data-counterNumberPrefix="${counterNumberPrefix}"></div>
                <div class="portfolioOwnerBlogElementContainerContentSection">
                    <div class="portfolioOwnerBlogElementContainerAuthorSection">
                        <div class="portfolioOwnerBlogElementContainerAuthorPfp"></div>
                        <h3 class="portfolioOwnerBlogElementContainerAuthorName">Muheko Nikolas</h3>
                    </div>
                    <div class="portfolioOwnerBlogElementContainerTitleSection">
                        <h3 class="portfolioOwnerBlogElementContainerTitle">
                            An Anomalous Wire Made of Manganese and Platinum in the Pacific Ocean Site of the First
                        </h3>
                    </div>

                    <div class="portfolioOwnerBlogElementContainerTimestampsSection">
                        <h3 class="portfolioOwnerBlogElementContainerCreationDate">
                            3 Jul
                        </h3>
                        <h3 class="portfolioOwnerBlogElementContainerReadingtime">
                            3 min read
                        </h3>
                    </div>

                </div>
            </div>
        `
    }
}



function generateBlogContainerPreviewBoxes(){
    blogsContainersPreviewsContainer = document.querySelector(".blogsPageBlogsAndTagsSection .blogsSection")

    for(_x = 0; _x<10; _x++){
        if(_x < 9){
            counterNumberPrefix = "0"
        } else {
            counterNumberPrefix = ""
        }

        blogsContainersPreviewsContainer.innerHTML += `
            <div class="blogElementContainer">
                <div class="portfolioOwnerBlogElementContainerContentSection">
                    <div class="portfolioOwnerBlogElementContainerAuthorSection">
                        <div class="portfolioOwnerBlogElementContainerAuthorPfp"></div>
                        <h3 class="portfolioOwnerBlogElementContainerAuthorName">Muheko Nikolas</h3>
                    </div>
                    <div class="portfolioOwnerBlogElementContainerTitleSection">
                        <h3 class="portfolioOwnerBlogElementContainerTitle">
                            An Anomalous Wire Made of Manganese and Platinum in the Pacific Ocean Site of the First
                        </h3>
                        <h4 class="portfolioOwnerBlogElementContainerThesis">
                            I wrote a letter thanking librarians across the country for everything they’re doing to protect our freedom to read.
                        </h4>
                    </div>

                    <div class="portfolioOwnerBlogElementContainerTimestampsSection">
                        <h3 class="portfolioOwnerBlogElementContainerCreationDate">
                            3 Jul
                        </h3>
                        <h3 class="portfolioOwnerBlogElementContainerReadingtime">
                            3 min read
                        </h3>
                    </div>

                </div>
                <div class="blogElementContainerBanner"></div>
            </div>

        `
    }
}


function showLoginAndSignupFormsContainer(){

    var loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer")

    if(loginAndSignupFormsContainer.classList.contains("showLoginFormContainer")){
        history.replaceState({showLoginFormContainer: true}, "Login", "/blogs/login")
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showLoginFormContainer: true} }))
    } else if(loginAndSignupFormsContainer.classList.contains("showSignupFormContainer")){
        history.replaceState({showSignupFormContainer: true}, "Signup", "/blogs/signup")
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showSignupFormContainer: true} }))
    } 
}

function showLoginForm(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginAndSignupFormsContainer.classList.remove("showSignupFormContainer")
    loginAndSignupFormsContainer.classList.add("showLoginFormContainer")
    history.replaceState(null, "Login", "/blogs/login")    
}

function showSingupForm(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginAndSignupFormsContainer.classList.remove("showLoginFormContainer")
    loginAndSignupFormsContainer.classList.add("showSignupFormContainer")
    history.replaceState(null, "Signup", "/blogs/signup")
}



function initializeHidingEventOnLoginAndSignupFormsContainer(){
    loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer")
    loginFormContainer = document.querySelector(".loginFormContainer")
    signupFormContainer = document.querySelector(".signupFormContainer")

    loginFormCloseButton = document.querySelector(".loginFormContainerCloseButton")
    signupFormCloseButton = document.querySelector(".signupFormContainerCloseButton")

    loginAndSignupFormsContainer.addEventListener("click", (event)=>{
        if( ( event.target == loginFormCloseButton || loginFormCloseButton.contains(event.target)) || ( event.target == signupFormCloseButton || signupFormCloseButton.contains(event.target)) || event.target != loginFormContainer && event.target != signupFormContainer && loginFormContainer.contains(event.target) == false && signupFormContainer.contains(event.target) == false){

            currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('login');
            currentUrl.searchParams.delete('signup');

            if(currentUrl.pathname == "/blogs/login" || currentUrl.pathname == "/blogs/signup"){
                currentUrl.pathname = new URL(location.href).pathname
            }

            history.replaceState(null, '', currentUrl);
            loginAndSignupFormsContainer.classList.remove("visible")
        }
    })
}


function manageBlogSearchInputLabel(){
    blogSearchInputLabel = document.querySelector(".blogSearchInputLabel")
    blogSearchInput = document.querySelector(".blogSearchInput")

    blogSearchInputLabel.style.display = "none"
    blogSearchInput.select()
}


function blogsInputSearch(){

    blogSearchInput = document.querySelector(".blogSearchInput")
    if(blogSearchInput.value.length <= 0){
        return
    } else {
        _searchPageUrl = new URL(`${new URL(window.location.href).origin}/blogs/search/?text=${encodeURIComponent(blogSearchInput.value)}`)
        
        window.location = _searchPageUrl
    }
}

function initiateBlogSearchInputEvents(){
    blogSearchInput = document.querySelector(".blogSearchInput")
    blogSearchInputLabel = document.querySelector(".blogSearchInputLabel")

    if(blogSearchInput.value.length > 0){
        blogSearchInputLabel.style.display = "none"
    }

    blogSearchInput.addEventListener("blur", ()=>{
        if(blogSearchInput.value.length <= 0){
            blogSearchInputLabel.style.display = "flex"
        } else {
            blogSearchInputLabel.style.display = "none"
        }
    })

    blogSearchInput.addEventListener("focus", ()=>{
        blogSearchInputLabel.style.display = "none"
    })

    blogSearchInput.addEventListener("keyup", (event)=>{
        if(event.keyCode == 13){
            blogsInputSearch()
        }
    })
}


function removeDefaultEventFromAnchors(){
    document.querySelectorAll("a.noRedirect").forEach((_x)=>{_x.addEventListener("click", (event)=>{
        event.preventDefault()
    })})
}
