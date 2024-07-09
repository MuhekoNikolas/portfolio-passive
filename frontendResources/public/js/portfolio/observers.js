/**
 * Initializes an IntersectionObserver for skills section elements.
 */
function initializeSkillsObserver() {
    // Selecting the skills container and its children (skill previews)
    const skillsContainer = document.querySelector(".pageSkillsSectionContentsContainer");
    const skillPreviews = skillsContainer.children;

    // Creating a new IntersectionObserver for skills
    const skillsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const _skill = entry.target;
                _skill.classList.toggle("showSkill", entry.isIntersecting);
            });
        },
        {
            root: document.querySelector("#mainWrapper"), // Observing within the main wrapper
            threshold: 0.5 // Triggering when 50% of the skill element is visible
        }
    );

    // Observing each skill preview element
    for (const skill of skillPreviews) {
        skillsObserver.observe(skill);
    }
}

/**
 * Initializes an IntersectionObserver for projects section elements.
 */
function initializeProjectsObserver() {
    // Selecting the project container and its children (project previews)
    const projectContainer = document.querySelector(".projectsSlideShow");
    const projectPreviews = projectContainer.children;

    // Creating a new IntersectionObserver for projects
    const projectsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const _project = entry.target;
                _project.classList.toggle("showProject", entry.isIntersecting);
            });
        },
        {
            root: projectContainer, // Observing within the project container
            threshold: 0.1 // Triggering when 10% of the project element is visible
        }
    );

    // Observing each project preview element
    for (const project of projectPreviews) {
        projectsObserver.observe(project);
    }
}

/**
 * Initializes an IntersectionObserver for the biography section element.
 */
function initializeBioObserver() {
    // Selecting the main wrapper and the bio container
    const mainWrapper = document.querySelector("#mainWrapper");
    const bioContainer = document.querySelector("#pageAboutSection");

    // Creating a new IntersectionObserver for the bio container
    const bioContainerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const _bioCont = entry.target;
                _bioCont.classList.toggle("showBio", entry.isIntersecting);
            });
        },
        {
            root: mainWrapper, // Observing within the main wrapper
            threshold: 0.3 // Triggering when 30% of the bio container is visible
        }
    );

    // Observing the bio container element
    bioContainerObserver.observe(bioContainer);
}
