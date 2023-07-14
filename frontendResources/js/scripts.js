


function getPortfolioOwnerInfoAndUpdateSite(){
    fetch("/api/portfolioOwner.json")
    .then(request=>request.json())
    .then(data=>{
        document.querySelectorAll(".portfolioOwnerName").forEach(portfolioOwnerNameContainer=>{
            portfolioOwnerNameContainer.innerText = data.name
        })
        document.querySelectorAll(".portfolioOwnerAge").forEach(portfolioOwnerAgeContainer=>{
            portfolioOwnerAgeContainer.innerText = data.age
        })

        document.querySelectorAll(".portfolioOwnerBio").forEach(portfolioOwnerBioContainer=>{
            portfolioOwnerBioContainer.innerText = data.bio
        })

        professionsSelfWriter = new SelfWriter(data.professions, document.querySelector(".homeSectionCenterDivBioSkillsSpan") )
        console.log(professionsSelfWriter)
    })
}


function generateSkillPreviewBoxes(){
    skillsPreviewsContainer = document.querySelector(".pageSkillsSectionContentsContainer")

    fetch("/api/skills.json")
    .then(request=>request.json())
    .then(data=>{
        for(_skillInfoKey of Object.keys(data)){
            if(_skillInfoKey == "8"){
                break
            }
            _skillInfo = data[_skillInfoKey]

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
            `
        }
        initializeSkillsObserver()
    })
}




function generateProjectsPreviewBoxes(){
    projectsPreviewsContainer = document.querySelector(".projectsSlideShow")

    fetch("/api/projects.json")
    .then(request=>request.json())
    .then(data=>{
        for(__projectInfoKey of Object.keys(data)){
            _projectInfo = data[__projectInfoKey]

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
            `
            _thisProjectStackDiv = projectsPreviewsContainer.children[projectsPreviewsContainer.children.length - 1].querySelector(".projectShowCaseInfoSectionStack")
            _projectInfo.projectStack.forEach(_stack=>{
                _thisProjectStackDiv.innerHTML += `<h3 class="stack ${_stack.toLowerCase()}">${_stack}</h3>`
            })
        }
        initializeProjectsObserver()
    })
}



function generateContactsPreviewBoxes(){
    contactsPreviewsContainer = document.querySelector(".pageContactsSection.pageSection .contentsContainer")
    console.log(contactsPreviewsContainer)

    fetch("/api/contacts.json")
    .then(request=>request.json())
    .then(data=>{
        for(_skillInfoKey of Object.keys(data)){
            _skillInfo = data[_skillInfoKey]

            contactsPreviewsContainer.innerHTML += `
                <a href="${_skillInfo.url}" title="${_skillInfo.site}">
                    <div class="contactDiv">
                        <i class="${_skillInfo.icon}" style="color:${_skillInfo.iconColor};"></i>
                    </div>
                </a>
            `
        }
    })
}

function manageBioDiv(){
    bioContainer = document.getElementById("bioContainer")
    if(bioContainer.classList.contains("opened")){
        bioContainer.classList.add("closed")
        bioContainer.classList.remove("opened")
    } else {
        bioContainer.classList.add("opened")
        bioContainer.classList.remove("closed")
    }
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