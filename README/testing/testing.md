# Testing

This is the TESTING file for [Inspyre](https://inspyre-53afb73e4a64.herokuapp.com/), a full stack application focused on content creation and sharing.

Return to the [README](../../README.md).

## Table of Contents

### [Validators](#validators)

- [HTML](#html)
- [CSS](#css)
- [Python](#Python)
- [JavaScript](#javascript)

### [Lighthouse Testing](#lighthouse-reports)

- [Reports](#reports)

### [Manual Testing & Bug Fixes](#manual-testing--bug-fixes)

- [Manual Testing](#manual-testing)
- [Bug Fixes](#bug-fixes)
- [Browser Compatibility](#browser-compatibility)
- [Device Compatibility](#device-compatibility)

## Validators

### HTML

Due to the way React applications render HTML dynamically via JavaScript, traditional HTML validation tools cannot accurately parse the live DOM structure directly from a URL. To ensure accurate validation, I conducted my HTML checks by manually viewing the rendered HTML for each page via Chrome Dev Tools' "Elements" tab, then copying and pasting the rendered HTML into the W3C Nu HTML Checker using its "Direct Input" method.

The below table shows the number of warnings and errors indicated for each page.

| **Page**            | **Errors** | **Warnings** |
| ------------------- | ---------- | ------------ |
| Sign Up             | 0          | 0            |
| Sign In             | 0          | 0            |
| Homepage            | 0          | 0            |
| Pyres               | 0          | 0            |
| Sparks              | 0          | 0            |
| Detailed Post View  | 0          | 0            |
| Post Creation Forms | 0          | 0            |
| Post Edit Forms     | 0          | 0            |
| Profile Page        | 0          | 0            |
| Profile Edit Form   | 0          | 0            |
| Conversation Page   | 0          | 0            |
| Conversations Page  | 0          | 0            |

### CSS

Due to Bootstrap causing false warnings, I tested my CSS by direct input into W3C's CSS Validation Service.

| **CSS Module / File** | **Errors** | **Warnings** |
| --------------------- | ---------- | ------------ |
| Asset                 | 0          | 0            |
| Avatar                | 0          | 0            |
| Buttons               | 0          | 0            |
| Comment               | 0          | 0            |
| CommentCreateEditForm | 0          | 0            |
| CommentReplyForm      | 0          | 0            |
| ConversationPage      | 0          | 0            |
| ConversationsPage     | 0          | 0            |
| CustomDropdown        | 0          | 0            |
| CustomErrors          | 0          | 0            |
| Modal                 | 0          | 0            |
| Navbar                | 0          | 0            |
| Post                  | 0          | 0            |
| PostCreateForms       | 0          | 0            |
| PostEditForm          | 0          | 0            |
| PostPage              | 0          | 0            |
| PostsGallery          | 0          | 0            |
| ProfileEditor         | 0          | 0            |
| ProfilePage           | 0          | 0            |
| QuillEditor           | 0          | 0            |
| SignInUpForm          | 0          | 0            |
| UserListModal         | 0          | 0            |
| App                   | 0          | 0            |
| index                 | 0          | 0            |

### PEP8 (Python)

Tested using the [CI Python Linter](https://pep8ci.herokuapp.com/).

| **Directory**   | **admin** | **apps** | **models** | **permissions** | **serializers** | **settings** | **urls** | **views** |
| --------------- | --------- | -------- | ---------- | --------------- | --------------- | ------------ | -------- | --------- |
| comments        | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |
| direct_messages | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |
| followers       | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |
| inspyre_api     | n/a       | n/a      | n/a        | Pass            | Pass            | Pass         | Pass     | Pass      |
| likes           | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |
| posts           | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |
| profiles        | Pass      | Pass     | Pass       | n/a             | Pass            | n/a          | Pass     | Pass      |

### JavaScript

I implemented ESLint (v.9.x) to validate JavaScript files across the entire codebase ('npx eslint . --ext .js'). This resulted in a nil return, confirming that no errors were detected and my JavaScript code is clean.

<details>
<summary> ESLint Terminal Result </summary>

<br>

![ESLint Terminal Result](./images/eslint-result.png)

</details>

<br>

To eliminate false errors and warnings, the following rule adjustments were made:

- react/react-in-jsx-scope: disabled as React 17+ no longer requires explicit import of React in files using JSX.

- react/prop-types: disabled to avoid unnecessary prop validation warnings. This is appropriate given my focus on internal validation rather than prop type enforcement.

- react/no-unescaped-entities: disabled globally following excessive warnings for JSX content containing apostrophes ('). Each of these warnings were simply a case of an apostrophe being used as common punctuation within a `<div>`, `<span>`, `<p>`, etc. and were not genuine syntax errors.

## Lighthouse Testing

Using the Lighthouse feature of Google Chrome's Dev Tools, I tested each of Inspyre's webpages for Performance, Accessibility, Best Practices and SEO (Search Engine Optimisation).

| **Page**             | **Performance** | **Accessibility** | **Best Practices** | **SEO** |
| -------------------- | --------------- | ----------------- | ------------------ | ------- |
| Sign Up              | 79              | 93                | 100                | 92      |
| Sign In              | 83              | 93                | 100                | 92      |
| Homepage             | 71              | 100               | 100                | 100     |
| Pyres                | 68              | 95                | 78                 | 100     |
| Sparks               | 67              | 95                | 78                 | 100     |
| Detailed Post View   | 87              | 93                | 100                | 100     |
| Post Creation Forms  | 94              | 95                | 78                 | 100     |
| Post Edit Forms      | 88              | 85                | 74                 | 92      |
| Profile Page         | 99              | 90                | 100                | 90      |
| Profile Edit Form \* | N/A             | N/A               | N/A                | N/A     |
| Conversation Page    | 92              | 95                | 78                 | 100     |
| Conversations Page   | 88              | 88                | 78                 | 100     |

Where possible, all testing was conducted in Incognito mode to limit the browser interfering with the results. However, due to the authentication logic I've used (namely the use of auth tokens within CurrentUserContext.js), you can't login to an account while in Incognito mode. This is a known issue with the CurrentUserContext logic taught in the Code Institute 'Moments' walkthrough project (which is likewise effected). As such, features that require authentication (Pyres, Sparks, Post Creation Forms, Post Edit Forms, Profile Edit Form, Conversation List and Conversation Page) were tested in a regular Chrome Browser. As visible from the Lighthouse scores, the use of cookies (specifically, the auth tokens) has led to a significant reduction in **Best Practices** scores.

\* The Profile Edit Form could not be analysed using Lighthouse testing, as running the test kept causing the page to redirect to the homepage. I beleive this is another issue that stems from CurrentUserContext, specifically the useCurrentUser() hook briefly returning 'null' upon page refresh. As the profile edit forms require authorisation, this triggers a redirect to '/'. As this is not an app-breaking bug, I will address it as a fix in 'future features'.

## Manual Testing

Extensive manual testing was conducted on each feature of this project to ensure all were functioning as expected. The outcome of this testing and any bug fixes made during the project's development are recorded in the tables below.

### Authentication:

#### Account Registration

| **Feature**                                                                           | **Expected Outcome**                                                                                                               | **Result** |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Account Registration (success)                                                        | Given the correct details provided, a new User account is created.                                                                 | Pass       |
| Account Registration (no username)                                                    | Given no username is provided, the User is prompted to complete this field                                                         | Pass       |
| Account Registration (duplicated username)                                            | Given a username that already belongs to an account is provided, the User is advised accordingly                                   | Pass       |
| Account Registration (no password)                                                    | Given no password is provided, the User is prompted to complete this field                                                         | Pass       |
| Account Registration (incorrect password - too similar to other personal information) | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - 8 character minimum)                       | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - common password)                           | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - entirely numeric)                          | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (password confirmation error)                                    | Given the password provided in the confrimation box does not match the original password provided, the User is advised accordingly | Pass       |
| Confirmation Modal                                                                    | Given the User successfully creates an account, a confirmation message appears.                                                    | Pass       |

<br>

#### Login

| **Feature**               | **Expected Outcome**                                                                                                      | **Result** |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Login (success)           | Given the correct details provided, the User is signed in.                                                                | Pass       |
| Login (missing details)   | Given the User tries to sign in without providing a username and/or password, they are prompted to complete these fields. | Pass       |
| Login (incorrect details) | Given the User tries to sign in by providing an incorrect username and/or password, they are advised accordingly.         | Pass       |

<br>

#### Logout

| **Feature** | **Expected Outcome**                                                 | **Result** |
| ----------- | -------------------------------------------------------------------- | ---------- |
| Logout      | Given the User clicks the 'sign out' button, the User is logged out. | Pass       |

<br>

#### Security

| **Feature**       | **Expected Outcome**                                                                                                                | **Result** |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Authenticated     | Given the User is authenticated, they can freely navigate all pages of the site                                                     | Pass       |
| Not Authenticated | Given the User is not authenticated, they are redirected to the login page should they try to access any of the site's other pages. | Pass       |

<br>

### Navbar

| **Feature**       | **Expected Outcome**                                                                                                                                          | **Result** |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Nav Links         | All navigation links contained within the header direct the User to the expected page url.                                                                    | Pass       |
| Authenticated     | Given the User is authenticated, the specific 'authenticated' NavLink items are rendered, and the specific 'not authenticated' NavLink items are removed.     | Pass       |
| Not Authenticated | Given the User is not authenticated, the specific 'not authenticated' NavLink items are rendered, and the specific 'authenticated' NavLink items are removed. | Pass       |
| Avatar            | Given the User is signed in, their profile image is displayed by the 'Avatar' component.                                                                      | Pass       |
| Profile Link      | Given the User is signed in, the 'profile' link directs them to their profile                                                                                 | Pass       |
| Pyres             | Given the User is signed in, the 'pyres' link populates the homepage with only content posted by the users they follow                                        | Pass       |
| Sparks            | Given the User is signed in, the 'sparks' link populates the homepage with only content they have liked                                                       | Pass       |

<br>

### Homepage

| **Feature**                          | **Expected Outcome**                                                                                                                          | **Result** |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Posts ordered by recency             | Posts are ordered by newest first, descending to oldest.                                                                                      | Pass       |
| Gallery updating per post submission | Each time new content is posted, the gallery automatically updates (upon refresh) to show the latest posts.                                   | Pass       |
| Infinite Scroll                      | Given more than 10 posts in the gallery, upon scrolling to the bottom of the currently rendered feed, more posts are automatically loaded.    | Pass       |
| Post Links                           | Clicking on a posts directs the user to a detailed view of that post.                                                                         | Pass       |
| Pyres Filter                         |                                                                                                                                               | Pass       |
| Sparks Filter                        |                                                                                                                                               | Pass       |
| Searchbar                            |                                                                                                                                               | Pass       |
| Mobile layout                        | Given a screen width of ≤600px, the gallery format changes to a single column feed displaying a more complete instance of the Post component. | Pass       |

<br>

### Post Creation Menu

| **Feature**              | **Expected Outcome**                                                                                                                                 | **Result** |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Post Creation Menu       | Given the User follows a link to make a post, they are directed to a menu where they must choose if they want to create an image or text based post. | Pass       |
| Post Creation Navigation | The option buttons correctly navigate the User to the expected form (i.e. image or text).                                                            | Pass       |

<br>

### Post Creation - Image Form

| **Feature**          | **Expected Outcome**                                                                                                                                                 | **Result** |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Back Button          | Given the User clicks the 'back' button, they are navigated back to the post creation menu.                                                                          | Pass       |
| Image Uploading      | Given the User clicks the upload asset, their file explorer window opens and they may select an image file to upload. Only image files are available to be selected. | Pass       |
| File Size Limitation | If the User attempts to upload an file larger than 2MB, the upload will fail and they will be notified of this limitation.                                           | Pass       |
| Input Fields         | All input fields correctly display their labels, placeholder text and work as expected.                                                                              | Pass       |
| Cancel Button        | Cancelling the post will navigate the User back to the window where they first accessed the post creation menu. The post is not saved.                               | Pass       |
| Save Button          | Saving the post will publish it and navigate the User to the detailed view of the post.                                                                              | Pass       |

<br>

### Post Creation - Text Form

| **Feature**          | **Expected Outcome**                                                                                                                                                                            | **Result** |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Back Button          | Given the User clicks the 'back' button, they are navigated back to the post creation menu.                                                                                                     | Pass       |
| Quill Editor         | The User has access to the Quill Editor, with all features therein working as expected. Styles applied in the editor are visible within the editor and the published post (excluding previews). | Pass       |
| File Size Limitation | If the User attempts to upload an file larger than 2MB, the upload will fail and they will be notified of this limitation.                                                                      | Pass       |
| Cancel Button        | Cancelling the post will navigate the User back to the window where they first accessed the post creation menu. The post is not saved.                                                          | Pass       |
| Save Button          | Saving the post will publish it and navigate the User to the detailed view of the post.                                                                                                         | Pass       |

<br>

### Detailed Post View

| **Feature**                       | **Expected Outcome**                                                                                                                            | **Result** |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Post Edit & Delete Buttons        | Given the User is the owner of the post, 'delete' and 'edit' buttons appears when accessing the dropdown menu beside the post.                  | Pass       |
| Post Edit                         | Given the User clicks the 'edit' button, they are directed to the post edit form.                                                               | Pass       |
| Post Delete Confirmation Modal    | Giveen the User clicks the 'delete' button, a confirmation modal appears.                                                                       | Pass       |
| Post Delete Success               | Given the User confirms the deletion, the post and any comments are deleted from the database. The User is redirected to their previous window. | Pass       |
| Post Owner Avatar Link            | Given the User clicks on the avatar or username of the post owner, they are directed to that user's profile page.                               | Pass       |
| Post Tags                         | Given the creator added tags to their post, these tag appear beneath the post.                                                                  | Pass       |
| Like Button & Counter             | The 'like' button and counter are displayed with the correct number of likes for that post.                                                     | Pass       |
| Liking a Post                     | Given the user clicks the 'like' button, the icon and counter update accordingly.                                                               | Pass       |
| Unliking a Post                   | Given the user clicks the 'unlike' button, the icon and counter update accordingly.                                                             | Pass       |
| 'Original' Tag                    | Given the creator marked the post as an 'original', an 'original' tag appears beneath the post.                                                 | Pass       |
| Comment Counter                   | The comment counter displays the correct number of comments for that post.                                                                      | Pass       |
| Comment Thread                    | All comments and are displayed within the Comment Thread.                                                                                       | Pass       |
| Comment Thread                    | Given a post has no comments, a message appears in the comment section confirming this fact.                                                    | Pass       |
| Comment Avatar                    | Clicking on the avatar of a user within the comment section will direct the user to the profile associated with that avatar.                    | Pass       |
| Comment Report Button             | Given the User is not the author of a comment, a 'report' button appears when accessing the dropdown menu beside each comment.                  | Pass       |
| Comment Report Confirmation Modal | Given the User clicks the 'report' button, a confirmation modal appears.                                                                        | Pass       |
| Comment Reporting                 | Given the User reports a comment, the comment is replaced with a ‘reported’ message until approved by a moderator or outright deleted.          | Pass       |
| Comment Delete & Edit Buttons     | Given the User is the author of a comment, 'delete' and 'edit' buttons appears when accessing the dropdown menu beside each comment.            | Pass       |
| Comment Delete Confirmation Modal | Given the User clicks the 'delete' button, a confirmation modal appears.                                                                        | Pass       |
| Comment Delete Success            | Given the User confirms the deletion, the comment is deleted from the database. The comment disappears from the Comment Thread.                 | Pass       |
| Comment Edit Process              | Given the User clicks the 'edit' button, they are given the ability to edit the comment in the comment textarea.                                | Pass       |
| Comment Edit Success              | Given the User confirms the edit, the comment is updated.                                                                                       | Pass       |
| Comment Reply Button              | Given the User is not the owner of a comment, that comment will display a 'reply' button beneath it.                                            | Pass       |
| Comment Reply                     | Given the User replies to an existing comment, a visual 'thread' is established. Further replies add to this thread.                            | Pass       |

<br>

### Post Edit Form

| **Feature**           | **Expected Outcome**                                                                                                                                                                                                                     | **Result** |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Pre-populated details | The post edit form is pre-populated with the existing post's details.                                                                                                                                                                    | Pass       |
| Change Image Button   | Given the User is editing an image post, they can upload a new image via the 'change image' button.                                                                                                                                      | Pass       |
| File Size Limitation  | If the User attempts to upload an file larger than 2MB, the upload will fail and they will be notified of this limitation.                                                                                                               | Pass       |
| Quill Editor          | Given the User is editing a text post, they will have access to the Quill Editor, with all features therein working as expected. Styles applied in the editor are visible within the editor and the published post (excluding previews). | Pass       |
| Cancel Button         | Cancelling the edit will navigate the User back to the detailed view of the post and discard any changes made.                                                                                                                           | Pass       |
| Save Button           | Saving the edit will navigate the User back to the detailed view of the post and apply any changes made.                                                                                                                                 | Pass       |

<br>

### Profile Page

| **Feature**        | **Expected Outcome**                                                                                                                        | **Result** |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| User Profile       | Given the User is the owner of the profile, an 'edit' button will display beside their username.                                            | Pass       |
| Other User Profile | Given the User is not the owner of the profile, an 'un/follow' and 'message' button will display next to the profile owner's username.      | Pass       |
| Edit Button        | Given the User clicks the 'edit' button, they are directed to the profile edit form.                                                        | Pass       |
| Follow Button      | Given the User clicks the 'follow' button, the 'followers' counter will increase by one and the button will update to an 'unfollow' button. | Pass       |

<br>

### Backend

#### Database

| **Feature**           | **Expected Outcome** | **Result** |
| --------------------- | -------------------- | ---------- |
| Create Account        |                      | Pass       |
| Delete Account        |                      | Pass       |
| Post                  |                      | Pass       |
| Post Edit             |                      | Pass       |
| Post Delete           |                      | Pass       |
| Follow                |                      | Pass       |
| Unfollow              |                      | Pass       |
| Like                  |                      | Pass       |
| Unlike                |                      | Pass       |
| Create Comment        |                      | Pass       |
| Edit Comment          |                      | Pass       |
| Delete Comment        |                      | Pass       |
| Create Comment Thread |                      | Pass       |
| Create Conversation   |                      | Pass       |
| Delete Conversation   |                      | Pass       |
| Send Message          |                      | Pass       |

<br>

#### Cloudinary

| **Feature**           | **Expected Outcome** | **Result** |
| --------------------- | -------------------- | ---------- |
| File Upload           |                      | Pass       |
| Default Profile Image |                      | Pass       |

<br>

### Bug Fixes

Throughout the development of my project, I carried out the following bug fixes:

| Feature                         | Expected Outcome                                                                | Actual Outcome                                              | Fix                                                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Database                        | Updating models                                                                 | Couldn't reconcile changes made                             | Error caused by deleting previous migration files, ultimately corrupting the database. A new database was created to replace the corrupted database                                                     |
| Cloudinary Security             | Secure responses received from Cloudinary                                       | HTTP responses instead of HTTPS, causing unsecure responses | Updated settings.py to configure secure responses from Cloudinary                                                                                                                                       |
| Comment Report Button           | Reported comment's status changes from 'approved' to 'reported'                 | 500 error                                                   | Bug caused by the initial report button having the same id as the report button in the confirmation modal, causing a JavaScript error. ID changed to differentiate between buttons                      |
| Comment Edit Button             | Clicking 'submit' button submits changes to comment                             | 500 error                                                   | ID 'submitButton' had been changed due to conflicting CSS, which caused a bug with the JavaScript. Html and JS updated with new ID                                                                      |
| Homework Submission Lesson Menu | Lesson dropdown menu only contains lessons associated with the selected subject | Menu empty                                                  | Created Homework Dashboard as a means for the subject to be selected prior to reaching the submission page, allowing for the subject.id to be correctly assigned prior to accessing the submission form |
| Homepage subject buttons        | Clicking a button directs the User to the respective lesson feed                | No response                                                 | href's had been left as '#'s. Updated with correct url links                                                                                                                                            |

I am not aware of any further bugs effecting this project.

#### Browser Compatibility

| Browser         | Expected Outcome                                                        | Result |
| --------------- | ----------------------------------------------------------------------- | ------ |
| Google Chrome   | No issues with appearance, functionality, performance or responsiveness | Pass   |
| Microsoft Edge  | No issues with appearance, functionality, performance or responsiveness | Pass   |
| Mozilla Firefox | No issues with appearance, functionality, performance or responsiveness | Pass   |
| Safari          | No issues with appearance, functionality, performance or responsiveness | Pass   |

#### Device Compatibility

| Device                                   | Expected Outcome                                                        | Result |
| ---------------------------------------- | ----------------------------------------------------------------------- | ------ |
| Samsung Galaxy S23 Ultra (412px x 750px) | No issues with appearance, functionality, performance or responsiveness | Pass   |
| iPhone 13 (390px x 661px)                | No issues with appearance, functionality, performance or responsiveness | Pass   |
| Apple iPad 8th Gen (580px x 548px)       | No issues with appearance, functionality, performance or responsiveness | Pass   |
| 15.6" Portable Monitor (1280px x 551px)  | No issues with appearance, functionality, performance or responsiveness | Pass   |
| 15.6" Windows Laptop (1536px x 695px)    | No issues with appearance, functionality, performance or responsiveness | Pass   |

(The above viewports were calculated using [whatismyviewport.com](https://whatismyviewport.com/) on each devices' maximised browser window.)
