class NewBlogEditor {
    constructor(editorContainerSelector) {
        // Initialize editor container and form
        this.editorContainer = $(editorContainerSelector);
        this.form = this.editorContainer.parent()[0];

        // Editor options configuration
        this.editorOptions = {
            selector: editorContainerSelector,
            menu: {
                tools: {
                    title: 'Tools',
                    items: 'code wordcount typography'
                },
                tc: {
                    title: 'Comments',
                    items: 'addcomment showcomments deleteallconversations'
                },
                format: {
                    title: 'Format',
                    items: 'configurepermanentpen | checklist | bold italic underline strikethrough ' +
                        'superscript subscript codeformat | styles blocks fontfamily ' +
                        'fontsize align | forecolor backcolor | removeformat'
                }
            },
            skin: "snow",
            icons: "thin",
            menubar: 'file edit view insert format tools tc help',
            contextmenu: 'link linkchecker image editimage table spellchecker configurepermanentpen',
            contextmenu_never_use_native: true,
            inline: false,
            toolbar: true,
            plugins: 'myembed a11ychecker fontawesomepicker highlight save slashcommands textpattern accordion charmap checklist image wordcount visualchars searchreplace mentions help permanentpen tableofcontents advlist lists footnotes table advtable advtemplate advcode anchor link codesample autolink quickbars preview media mediaembed emoticons autoresize editimage linkchecker autocorrect typography tinycomments',
            toolbar:
                'myembed save publishButton a11ycheck |' +
                'undo redo | ' +
                'forecolor backcolor |' +
                'code codesample hljs preview | accordion footnotes link |' +
                'tableofcontents | ' +
                'styles permanentpen | bold italic | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'outdent indent | numlist bullist | ' +
                'image quickimage media |' +
                'emoticons charmap fontawesomepicker |' +
                'typography searchreplace visualchars |' +
                'table quicktable tableinsertdialog tablecellprops tableprops advtablerownumbering |' +
                'addcomment showcomments | ' +
                'wordcount |' +
                'help',
            mediaembed_service_url: "http://localhost:2000",
            linkchecker_service_url: "http://localhost:2000",
            autocorrect_service_url: "http://localhost:2000",
            extended_valid_elements: 'i[*]',
            fontawesomeUrl: 'https://www.unpkg.com/@fortawesome/fontawesome-free@5.14.0/css/all.min.css',
            encoding: 'xml',
            spellchecker_language: 'en',
            browser_spellcheck: true,
            contextmenu_never_use_native: true,
            advcode_inline: true,
            permanentpen_properties: {
                fontname: 'arial,helvetica,sans-serif',
                forecolor: '#E74C3C',
                fontsize: '12pt',
                hilitecolor: '',
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false
            },
            mentions_item_type: 'profile',
            smart_paste: true,
            autocorrect_capitalize: false,
            content_css: ['/css/pc/blogs/blogContent.css', '/js/dependencies/hljs/min.css', '/js/dependencies/prism/prism.css'],
            typography_default_lang: "en-US",
            typography_langs: [
                'en-US',
                'es',
                'de'
            ],
            typography_rules: [
                'common/punctuation/quote',
                'en-US/dash/main',
                'common/nbsp/afterParagraphMark',
                'common/nbsp/afterSectionMark',
                'common/nbsp/afterShortWord',
                'common/nbsp/beforeShortLastNumber',
                'common/nbsp/beforeShortLastWord',
                'common/nbsp/dpi',
                'common/punctuation/apostrophe',
                'common/space/delBeforePunctuation',
                'common/space/afterComma',
                'common/space/afterColon',
                'common/space/afterExclamationMark',
                'common/space/afterQuestionMark',
                'common/space/afterSemicolon',
                'common/space/beforeBracket',
                'common/space/bracket',
                'common/space/delBeforeDot',
                'common/space/squareBracket',
                'common/number/mathSigns',
                'common/number/times',
                'common/number/fraction',
                'common/symbols/arrow',
                'common/symbols/cf',
                'common/symbols/copy',
                'common/punctuation/delDoublePunctuation',
                'common/punctuation/hellip'
            ],
            typography_ignore: ['code'],
            quickbars_insert_toolbar: "quickimage quicktable quicklink codesample",
            quickbars_selection_toolbar: "bold italic | link h2 h3 blockqoute | hljs",
            quickbars_image_toolbar: true,
            tinycomments_mode: 'embedded',
            tinycomments_author: "User",
            tinycomments_can_resolve: (req, done, fail) => {
                allowed = req.comments.length > 0 &&
                    req.comments[0].author === "User";
                done({
                    canResolve: allowed || "User" === "User"
                });
            },
            draggable_modal: true,
            save_onsavecallback: this.saveBlog.bind(this),
            file_picker_callback: ((callback, value, meta) => {
                // File picker callback for link, image, and media dialogs
                if (meta.filetype == 'file') {
                    callback('mypage.html', { text: 'My text' });
                }
                if (meta.filetype == 'image') {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    if (["blogbanner"].includes(meta.fieldname)) {
                        input.setAttribute('multiple', 'false');
                    } else {
                        input.setAttribute('multiple', 'true');
                    }
                    input.addEventListener('change', (e) => { this.inputsUploadChangeCallback(e, callback) });
                    input.click();
                }
                if (meta.filetype == 'media') {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'video/*');
                    input.addEventListener('change', (e) => { this.inputsUploadChangeCallback(e, callback) });
                    input.click();
                }
            }).bind(this),
            init_instance_callback: (editor) => {
                // Callback after editor initialization
                editor.formatter.register('highlight_wrapper', { inline: 'span', classes: 'highlight_tmp', exact: true });
                return false;
            },
            setup: this.editorSetup.bind(this), // Setup function for editor customization
        };

        // Initialize TinyMCE editor
        tinymce.init(this.editorOptions);
    }

    editorSetup(editor) {
        // Setup function for further editor customization
        this.editor = editor;
        tinymce.activeEditor = editor;

        // Add custom action button to the editor toolbar
        editor.ui.registry.addButton('publishButton', {
            icon: 'upload',
            tooltip: 'Publish draft',
            onAction: (_) => {
                this.showPublishContainer();
            }
        });

        // Event listener for preview command to highlight code in preview
        editor.on('BeforeExecCommand', function (e) {
            if (e.command == "mcePreview") {
                setTimeout(() => {
                    var previewDoc = document.querySelector("iframe.tox-dialog__iframe.tox-dialog__iframe--opaque").contentWindow.document;
                    Prism.highlightAllUnder(previewDoc.querySelector("body"));
                }, 600);
            }
        });
    }

    inputsUploadChangeCallback(e, callback) {
        // Callback function for handling file uploads in TinyMCE dialogs
        var files = e.target.files;

        for (var file of files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                callback(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
        }
    }

    getUploadBlogDialog() {
        // Function to configure and return the blog upload dialog configuration
        var dialogConfig = {
            title: 'Uploading blog.',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'input',
                        name: 'blogtitle',
                        label: 'Blog Title: ',
                        placeholder: 'Blog Title',
                        required: true
                    },
                    {
                        type: 'textarea',
                        name: 'blogdesc',
                        label: 'Blog Description: ',
                        placeholder: 'Blog Description',
                        enabled: true,
                        maximized: false,
                        required: true
                    },
                    {
                        type: 'urlinput',
                        name: 'blogbanner',
                        filetype: 'image',
                        label: 'Blog banner:',
                        enabled: true,
                    },
                    {
                        type: 'checkbox',
                        name: 'issure',
                        label: 'Are you sure you want to upload this blog?',
                        required: true
                    }
                ]
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'closeButton',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'submitButton',
                    text: 'Submit blog.',
                    buttonType: 'primary'
                }
            ],
            initialData: {
                issure: false
            },
            onSubmit: this.beginBlogUploadProcess.bind(this) // Submit callback for blog upload
        };

        return dialogConfig;
    }

    async beginBlogUploadProcess(api) {
        // Function to handle blog upload process
        try {
            const data = api.getData();

            // Validate form data
            if (data.issure == false) {
                this.editor.notificationManager.open({
                    text: "Please tick the given checkbox.",
                    type: "error",
                    timeout: 2500,
                });
                return;
            }

            var urlRegex = new RegExp(/^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/);
            if (data.blogbanner.value.length <= 11 || data.blogbanner.value.match(urlRegex) == null) {
                this.editor.notificationManager.open({
                    text: "Please enter a valid image url for the blog banner.",
                    type: "error",
                    timeout: 2500,
                });
                return;
            }

            // Validate and fetch blog banner image
            fetch(data.blogbanner.value).then(async _req => {
                if (_req.ok == false) {
                    this.editor.notificationManager.open({
                        text: "There was an error validating the blog banner's url.",
                        type: "error",
                        timeout: 2500,
                    });
                    return;
                }

                _req.blob().then(async reqBlob => {
                    var contentType = reqBlob.type;
                    if (contentType.toLowerCase().startsWith("image") == false) {
                        this.editor.notificationManager.open({
                            text: "We couldn't verify whether the provided banner is an image.",
                            type: "error",
                            timeout: 2500,
                        });
                        return;
                    }

                    // Convert blog banner to data URL
                    var bannerDataUrl = await new Promise(resolve => {
                        let reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(reqBlob);
                    });

                    // Extract and validate blog title and description
                    var blogTitle = data.blogtitle;
                    var blogDescription = data.blogdesc;

                    if (blogTitle == null || blogTitle.length <= 0) {
                        this.editor.notificationManager.open({
                            text: "Blog title is missing.",
                            type: "error",
                            timeout: 2500,
                        });
                        return;
                    } else {
                        if (blogDescription == null || blogDescription.length <= 10) {
                            this.editor.notificationManager.open({
                                text: "Blog description must be longer than 10 characters.",
                                type: "error",
                                timeout: 2500,
                            });
                            return;
                        } else {
                            // Save blog and handle response
                            var saveResponse = await this.saveBlog();

                            if (saveResponse.success == true) {
                                var postMethods = {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ title: blogTitle, description: blogDescription, blogBanner: bannerDataUrl })
                                };

                                var blogId = this.form.getAttribute("data-blogId") || "fijifjio";
                                var apiUrl = `/blogs/drafts/edit/${blogId}/upload`;

                                fetch(apiUrl, postMethods).then(req => req.json()).then(data => {
                                    data = JSON.parse(data);

                                    if (data.success == false) {
                                        this.editor.notificationManager.open({
                                            text: data.message,
                                            type: "error",
                                            timeout: 2500,
                                        });
                                        return;
                                    }

                                    this.editor.notificationManager.open({
                                        text: "Successfully uploaded this blog.",
                                        type: "success",
                                        timeout: 25000,
                                    });

                                    // Redirect to the newly created blog article page
                                    location.href = `/blogs/article/${data.createdBlogId}`;
                                    return;
                                }).catch(err => {
                                    this.editor.notificationManager.open({
                                        text: "An error occurred while uploading this draft.",
                                        type: "error",
                                        timeout: 2500,
                                    });
                                    return;
                                });
                            }
                        }
                    }
                });
            }).catch(err => {
                console.log(err.message);
                this.editor.notificationManager.open({
                    text: "There was an error validating the blog banner's url.",
                    type: "error",
                    timeout: 2500,
                });
                return;
            });
        } catch (err) {
            this.editor.notificationManager.open({
                text: "An error occurred.",
                type: "error",
                timeout: 2500,
            });
            return;
        }
    }

    showPublishContainer() {
        // Function to display the blog upload dialog
        var uploadBlogDialog = this.getUploadBlogDialog();
        this.editor.windowManager.open(uploadBlogDialog);
    }

    async saveBlog() {
        // Function to save the blog draft
        var blogId = this.form.getAttribute("data-blogId") || "foihfihfi";
        var postMethods = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: this.editor.getContent() })
        };

        var apiUrl = `/blogs/drafts/edit/${blogId}/save`;

        return new Promise((resolve, reject) => {
            fetch(apiUrl, postMethods).then(req => req.json()).then(data => {
                data = JSON.parse(data);

                // Display notification based on server response
                this.editor.notificationManager.open({
                    text: data.message,
                    type: data.success == true ? "success" : "error",
                    timeout: 2500,
                });

                resolve(data);
            }).catch(err => {
                this.editor.notificationManager.open({
                    text: "An error occurred, The server couldn't save this document.",
                    type: "error",
                    timeout: 2500,
                });

                resolve({ success: false });
            });
        });
    }
}
