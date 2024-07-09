// When the window finishes loading all resources
window.addEventListener("load", () => {
    // Call functions to initialize various components
    addEventsToWindow();
    removeDefaultEventFromAnchors();
    initializeHidingEventOnLoginAndSignupFormsContainer();
    initEditor(); // Initialize the TinyMCE editor
});

// Function to initialize the TinyMCE editor
function initEditor() {
    // Wait for the DOM content to be fully loaded
    document.addEventListener("DOMContentLoaded", () => {
        // Check if the .newBlogContentEditor element exists in the DOM
        const editorElement = document.querySelector('.newBlogContentEditor');
        if (!editorElement) {
            console.error('.newBlogContentEditor element not found');
            return;
        }

        // Initialize TinyMCE editor with specific configuration
        tinymce.init({
            selector: ".newBlogContentEditor",
            menubar: false,
            toolbar: false,
            statusbar: false,
            inline: true,
            plugins: "autoresize",
            skin: "snow",
            icons: "thin",
            content_css: '/css/pc/blogs/blogContent.css',

            // Setup callback function for editor configuration
            setup: (editor) => {
                // Set the editor mode to read-only
                editor.mode.set("readonly");

                // Delay setting the editor element's visibility to visible after initialization
                editor.on('init', () => {
                    editorElement.style.visibility = "visible";
                });
            }
        });
    });
}
