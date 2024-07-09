/**
 * Adds event listeners to the window object for handling popstate events related to login and signup forms.
 */
function addEventsToWindow(){
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            var loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer");

            if(event.state?.showLoginFormContainer == true){
                showLoginForm();
                loginAndSignupFormsContainer.classList.add("visible");
                return;
            } else if(event.state?.showSignupFormContainer == true){
                showSignupForm();
                loginAndSignupFormsContainer.classList.add("visible");
                return;
            }
        }
    });
}

/**
 * Toggles the open/close state of the side menu div.
 */
function manageSideMenuDiv(){
    const bioContainer = document.getElementById("navMenuContainer");
    bioContainer.classList.toggle("opened");
    bioContainer.classList.toggle("closed");
}

/**
 * Changes the color theme of the website.
 * @param {string} colorTheme - Theme name ('dark' or 'light').
 * @returns {boolean} - Returns false if an invalid theme name is provided.
 */
function changeTheme(colorTheme){
    const colors = {
        "dark": {
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
        "light": {
            "--c1": "#3ea8da",
            "--c2": "#258ec1",
            "--c3": "#1287BD",
            "--c4": "#1287BD",
            "--white": "white",
            "--darkWhite1": "#FFF1F3",
            "--darkWhite2": "#FFF1F3",
            "--darkWhite3": "#FFF1F3", 
            "--pink": "#FF516D"
        }
    };

    if(!Object.keys(colors).includes(colorTheme)){
        return false;
    }

    const root = document.querySelector(":root");
    const selectedTheme = colors[colorTheme];

    for(const colorProperty of Object.keys(selectedTheme)){
        root.style.setProperty(colorProperty, selectedTheme[colorProperty]);
    }      
}

/**
 * Toggles between dark and light themes based on current theme state.
 */
function manageColorTheme(){
    const colorThemeButton = document.querySelector(".topBarThemeButton");
    const currentTheme = colorThemeButton.getAttribute("data-theme");

    if(currentTheme == "dark"){
        colorThemeButton.setAttribute("data-theme", "light");
        changeTheme("light");
        colorThemeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    } else {
        colorThemeButton.setAttribute("data-theme", "dark");
        changeTheme("dark");
        colorThemeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
}

/**
 * Generates preview boxes for picked blogs.
 */
function generatePickedBlogsPreviewBoxes(){
    const blogsPreviewsContainer = document.querySelector(".blogsPageTopPicksSection .topPicksContainer");

    for(let _x = 0; _x < 6; _x++){
        const counterNumberPrefix = (_x < 9) ? "0" : "";

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
        `;
    }
}

/**
 * Generates preview boxes for blog containers.
 */
function generateBlogContainerPreviewBoxes(){
    const blogsContainersPreviewsContainer = document.querySelector(".blogsPageBlogsAndTagsSection .blogsSection");

    for(let _x = 0; _x < 10; _x++){
        const counterNumberPrefix = (_x < 9) ? "0" : "";

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
        `;
    }
}

/**
 * Shows the login or signup form container based on current state.
 */
function showLoginAndSignupFormsContainer(){
    const loginAndSignupFormsContainer = loginAndSignupFormsContainer || document.querySelector(".loginAndSignupFormsContainer");

    if(loginAndSignupFormsContainer.classList.contains("showLoginFormContainer")){
        history.replaceState({showLoginFormContainer: true}, "Login", "/blogs/login");
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showLoginFormContainer: true} }));
    } else if(loginAndSignupFormsContainer.classList.contains("showSignupFormContainer")){
        history.replaceState({showSignupFormContainer: true}, "Signup", "/blogs/signup");
        window.dispatchEvent(new PopStateEvent("popstate", { state: {showSignupFormContainer: true} }));
    } 
}

/**
 * Shows the login form and updates the browser history.
 */
function showLoginForm(){
    const loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer");
    loginAndSignupFormsContainer.classList.remove("showSignupFormContainer");
    loginAndSignupFormsContainer.classList.add("showLoginFormContainer");
    history.replaceState(null, "Login", "/blogs/login");    
}

/**
 * Shows the signup form and updates the browser history.
 */
function showSignupForm(){
    const loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer");
    loginAndSignupFormsContainer.classList.remove("showLoginFormContainer");
    loginAndSignupFormsContainer.classList.add("showSignupFormContainer");
    history.replaceState(null, "Signup", "/blogs/signup");
}

/**
 * Initializes hiding event on login and signup forms container.
 */
function initializeHidingEventOnLoginAndSignupFormsContainer(){
    const loginAndSignupFormsContainer = document.querySelector(".loginAndSignupFormsContainer");
    const loginFormContainer = document.querySelector(".loginFormContainer");
    const signupFormContainer = document.querySelector(".signupFormContainer");

    const loginFormCloseButton = document.querySelector(".loginFormContainerCloseButton");
    const signupFormCloseButton = document.querySelector(".signupFormContainerCloseButton");

    loginAndSignupFormsContainer.addEventListener("click", (event) => {
        if((event.target == loginFormCloseButton || loginFormCloseButton.contains(event.target)) ||
           (event.target == signupFormCloseButton || signupFormCloseButton.contains(event.target)) ||
           (event.target != loginFormContainer && event.target != signupFormContainer &&
            !loginFormContainer.contains(event.target) && !signupFormContainer.contains(event.target))){

            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('login');
            currentUrl.searchParams.delete('signup');

            if(currentUrl.pathname == "/blogs/login" || currentUrl.pathname == "/blogs/signup"){
                currentUrl.pathname = new URL(location.href).pathname;
            }

            history.replaceState(null, '', currentUrl);
            loginAndSignupFormsContainer.classList.remove("visible");
        }
    });
}

/**
 * Manages the display of the blog search input label based on user interaction.
 */
function manageBlogSearchInputLabel(){
    const blogSearchInputLabel = document.querySelector(".blogSearchInputLabel");
    const blogSearchInput = document.querySelector(".blogSearchInput");

    blogSearchInputLabel.style.display = "none";
    blogSearchInput.select();
}

/**
 * Initiates events for blog search input handling.
 */
function initiateBlogSearchInputEvents(){
    const blogSearchInput = document.querySelector(".blogSearchInput");
    const blogSearchInputLabel = document.querySelector(".blogSearchInputLabel");

    if(blogSearchInput.value.length > 0){
        blogSearchInputLabel.style.display = "none";
    }

    blogSearchInput.addEventListener("blur", () => {
        if(blogSearchInput.value.length <= 0){
            blogSearchInputLabel.style.display = "flex";
        } else {
            blogSearchInputLabel.style.display = "none";
        }
    });

    blogSearchInput.addEventListener("focus", () => {
        blogSearchInputLabel.style.display = "none";
    });

    blogSearchInput.addEventListener("keyup", (event) => {
        if(event.keyCode == 13){
            blogsInputSearch();
        }
    });
}

/**
 * Removes default event behavior from anchor elements with class 'noRedirect'.
 */
function removeDefaultEventFromAnchors(){
    document.querySelectorAll("a.noRedirect").forEach((_x) => {
        _x.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });
}
