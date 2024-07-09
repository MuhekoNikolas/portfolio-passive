## About

This is passive version of v3.0 of my portfolio. By passive, I mean that this repo will only act as checkpoint/backup of the main portfolio repo. 
I developed this version right after starting the [SMA (social media app)](https://github.com/MuhekoNikolas/sma) project. In the SMA project, users could have a blog-like experience by writing and uploading text to the website. Inspired by this, I decided to incorporate a blog feature into my portfolio.

In this portfolio version, I implemented OAuth2 authentication to create a "blog for all" environment. This allows everyone with an account to open their own blog and upload posts for other users, instead of limiting the ability to upload blogs to just myself. The site features a robust blog writing environment, courtesy of modified version of TinyMCE editor and Iframely, along with numerous other features. However, this project is still under development, and many more features, especially related to the blog, are in progress.

## How to Run

1. **Install Node.js**:
   - This project has been tested to run properly on Node v22.4.1, but lower versions might also work.

2. **Install Dependencies**:
   - Run the following command to install all needed dependencies:
     ```sh
     npm install
     ```
   - If you encounter any "Module not found" errors, use npm to install the missing modules.

3. **Configure Secret Keys**:
   - Obtain secret keys from services such as Google, Facebook, GitHub, and Twitter. These keys are used for OAuth2 login and account management.
   - Refer to the `.env` file for more information regarding the required keys.

4. **Run the Application**:
   - Execute the following command to run the `index.js` file:
     ```sh
     node index.js
     ```
   - Visit the site at [http://localhost:2000](http://localhost:2000).