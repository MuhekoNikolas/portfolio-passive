/**
 * Fetches portfolio owner information from the server and updates the site accordingly.
 */
function getPortfolioOwnerInfoAndUpdateSite() {
    fetch("/api/portfolioOwner.json")
    .then(request => request.json())
    .then(data => {
        // Update portfolio owner name with styled span elements
        document.querySelectorAll(".portfolioOwnerName").forEach(portfolioOwnerNameContainer => {
            const splittedName = data.name.split(" ");

            for (const _n of splittedName) {
                const _firstCharEl = document.createElement("span");
                _firstCharEl.classList.add("profileOwnerNameStyled");
                _firstCharEl.innerText = _n[0];

                const _otherCharEl = document.createElement("span");
                _otherCharEl.classList.add("profileOwnerNameUnstyled");
                _otherCharEl.innerText = _n.substring(1, _n.length);

                portfolioOwnerNameContainer.append(_firstCharEl);
                portfolioOwnerNameContainer.append(_otherCharEl);
                portfolioOwnerNameContainer.append(" ");
            }
        });

        // Update portfolio owner age
        document.querySelectorAll(".portfolioOwnerAge").forEach(portfolioOwnerAgeContainer => {
            portfolioOwnerAgeContainer.innerText = data.age;
        });

        // Update portfolio owner bio
        document.querySelectorAll(".portfolioOwnerBio").forEach(portfolioOwnerBioContainer => {
            portfolioOwnerBioContainer.innerText = data.bio;
        });

        // Initialize SelfWriter for professions
        const professionsSelfWriter = new SelfWriter(data.professions, document.querySelector(".homeSectionCenterDivBioSkillsSpan"));
        console.log(professionsSelfWriter); // Output SelfWriter object for debugging
    });
}

/**
 * Generates skill preview boxes based on data fetched from the server.
 */
function generateSkillPreviewBoxes() {
    const skillsPreviewsContainer = document.querySelector(".pageSkillsSectionContentsContainer");

    fetch("/api/skills.json")
    .then(request => request.json())
    .then(data => {
        for (const _skillInfoKey of Object.keys(data)) {
            if (_skillInfoKey == "8") {
                break; // Break for debugging
            }

            const _skillInfo = data[_skillInfoKey];

            skillsPreviewsContainer.innerHTML += `
                <div class="skillBlock">
                    <div class="skillBlockBannerSection">
                        <div class="skillBlockBanner" style='background:url("${_skillInfo.skillBanner}") !important; background-position:center center !important; background-size:60% 60% !important; background-repeat:no-repeat !important;'></div>
                        <div class="skillBlockTitle">${_skillInfo.skillName}</div>
                    </div>
                    <div class="skillBlockProgressSection">
                        <div class="progressBarSection">
                            <progress value="${_skillInfo.skillExperiencePercent}" max="100"></progress>
                        </div>
                        <div class="progressSectionInfo">
                            <div class="progressExperienceInfo">
                                <h4>
                                    Experience: <span>${_skillInfo.skillExperienceYears}</span>
                                </h4>
                            </div>
                            <div class="progressKnowledgeInfo">
                                <h4>
                                ${_skillInfo.skillExperiencePercent}%
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        initializeSkillsObserver(); // Initialize skills observer after generating skill previews
    });
}

/**
 * Generates project preview boxes based on data fetched from the server.
 */
function generateProjectsPreviewBoxes() {
    const projectsPreviewsContainer = document.querySelector(".projectsSlideShow");

    fetch("/api/projects.json")
    .then(request => request.json())
    .then(data => {
        for (const __projectInfoKey of Object.keys(data)) {
            const _projectInfo = data[__projectInfoKey];

            projectsPreviewsContainer.innerHTML += `
                <div class="projectShowCase">
                    <div class="projectShowCaseBannerSection" style='background:url("${_projectInfo.projectBanner}") !important; background-position:center center !important; background-size:90% 90% !important; background-repeat:no-repeat !important;'>
                    </div>
                    <div class="projectShowCaseInfoSection">
                        <div class="projectShowCaseInfoSectionTitle">
                            <h3>${_projectInfo.projectName}</h3>
                        </div>
                        <div class="projectShowCaseInfoSectionStack">
                        </div>
                        <div class="projectShowCaseInfoSectionNotes">
                            <h4>${_projectInfo.projectDescription}</h4>
                        </div>
                    </div>
                    <div class="projectShowCaseButtonsSection">
                        <a href="${_projectInfo.projectSourceCode}" style="text-decoration:none;">
                            <div class="projectShowCaseSourceCodeButton button">
                                <i class="fa-solid fa-code"></i>
                            </div>
                        </a>
                        <a href="${_projectInfo.projectLivePreviewLink}" style="text-decoration:none;">
                            <div class="projectShowCasePreviewButton button">
                                <h3>${_projectInfo.projectLivePreviewText}</h3>
                            </div>
                        </a>
                    </div>
                </div>
            `;

            // Update project stack information
            const _thisProjectStackDiv = projectsPreviewsContainer.children[projectsPreviewsContainer.children.length - 1].querySelector(".projectShowCaseInfoSectionStack");
            _projectInfo.projectStack.forEach(_stack => {
                _thisProjectStackDiv.innerHTML += `<h3 class="stack ${_stack.toLowerCase()}">${_stack}</h3>`;
            });
        }
        initializeProjectsObserver(); // Initialize projects observer after generating project previews
    });
}

/**
 * Generates blog preview boxes.
 */
function generateBlogsPreviewBoxes() {
    const blogsPreviewsContainer = document.querySelector(".pageBlogsSection .contentsContainer");

    for (let _x = 0; _x < 6; _x++) {
        let counterNumberPrefix;

        if (_x < 9) {
            counterNumberPrefix = "0";
        } else {
            counterNumberPrefix = "";
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
        `;
    }
}

/**
 * Generates contact preview boxes based on data fetched from the server.
 */
function generateContactsPreviewBoxes() {
    const contactsPreviewsContainer = document.querySelector(".pageContactsSection.pageSection .contentsContainer");

    fetch("/api/contacts.json")
    .then(request => request.json())
    .then(data => {
        for (const _contactInfoKey of Object.keys(data)) {
            const _contactInfo = data[_contactInfoKey];

            contactsPreviewsContainer.innerHTML += `
            <div class="pageContactObjectDiv">
                <h3 class="contactHead">
                    <div class="contactHeadIcon">
                    ${_contactInfo.icon}
                    </div>
                    ${_contactInfo.site}
                </h3>
                <h4 class="contactUsername">
                    ${_contactInfo.username}
                </h4>
            </div>
            `;
        }
    });
}

/**
 * Toggles the visibility of the bio container.
 */
function manageBioDiv() {
    const bioContainer = document.getElementById("bioContainer");

    if (bioContainer.classList.contains("opened")) {
        bioContainer.classList.add("closed");
        bioContainer.classList.remove("opened");
    } else {
        bioContainer.classList.add("opened");
        bioContainer.classList.remove("closed");
    }
}

/**
 * Toggles the visibility of the side menu container.
 */
function manageSideMenuDiv() {
    const navMenuContainer = document.getElementById("navMenuContainer");

    if (navMenuContainer.classList.contains("opened")) {
        navMenuContainer.classList.add("closed");
        navMenuContainer.classList.remove("opened");
    } else {
        navMenuContainer.classList.add("opened");
        navMenuContainer.classList.remove("closed");
    }
}

/**
 * Changes the color theme of the site.
 * @param {string} colorTheme - The color theme to apply ('dark' or 'light').
 */
function changeTheme(colorTheme) {
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

    if (!Object.keys(colors).includes(colorTheme)) {
        return false; // Break for debugging
    }

    const root = document.querySelector(":root");
    const selectedTheme = colors[colorTheme];

    for (const colorProperty of Object.keys(selectedTheme)) {
        root.style.setProperty(colorProperty, selectedTheme[colorProperty]);
    }
}

/**
 * Toggles between dark and light themes and updates the theme button icon.
 */
function manageColorTheme() {
    const colorThemeButton = document.querySelector(".topBarThemeButton");
    const currentTheme = colorThemeButton.getAttribute("data-theme");

    if (currentTheme === "dark") {
        colorThemeButton.setAttribute("data-theme", "light");
        changeTheme("light");
        colorThemeButton.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    } else {
        colorThemeButton.setAttribute("data-theme", "dark");
        changeTheme("dark");
        colorThemeButton.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
}
