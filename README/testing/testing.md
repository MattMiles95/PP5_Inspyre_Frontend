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
| Conversation List   | 0          | 0            |
| Conversation Page   | 0          | 0            |

### CSS

Due to Bootstrap causing false warnings, I tested my CSS by direct input into W3C's CSS Validation Service.

| **CSS Module**        | **Errors** | **Warnings** |
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

<details>
<summary> PEP8 (Python) Validation - CI Python Linter </summary>
<br>
blackboard/adapters.py:

![Screenshot of Python Validation for blackboard/adapters](/_readme-docs/images/validator_python_blackboard_adapters.png)

blackboard/settings.py:

![Screenshot of Python Validation for blackboard/settings](/_readme-docs/images/validator_python_blackboard_settings.png)

blackboard/urls.py:

![Screenshot of Python Validation for blackboard/urls](/_readme-docs/images/validator_python_blackboard_urls.png)

blackboard/views.py:

![Screenshot of Python Validation for blackboard/views](/_readme-docs/images/validator_python_blackboard_views.png)

homework/admin.py:

![Screenshot of Python Validation for homework/admin](/_readme-docs/images/validator_python_homework_admin.png)

homework/forms.py:

![Screenshot of Python Validation for homework/forms](/_readme-docs/images/validator_python_homework_forms.png)

homework/models.py:

![Screenshot of Python Validation for homework/models](/_readme-docs/images/validator_python_homework_models.png)

homework/urls.py:

![Screenshot of Python Validation for homework/urls](/_readme-docs/images/validator_python_homework_urls.png)

homework/views.py:

![Screenshot of Python Validation for homework/views](/_readme-docs/images/validator_python_homework_views.png)

lessons/admin.py:

![Screenshot of Python Validation for lessons/admin](/_readme-docs/images/validator_python_lessons_admin.png)

lessons/forms.py:

![Screenshot of Python Validation for lessons/forms](/_readme-docs/images/validator_python_lessons_forms.png)

lessons/models.py:

![Screenshot of Python Validation for lessons/models](/_readme-docs/images/validator_python_lessons_models.png)

lessons/urls.py:

![Screenshot of Python Validation for lessons/urls](/_readme-docs/images/validator_python_lessons_urls.png)

lessons/views.py:

![Screenshot of Python Validation for lessons/views](/_readme-docs/images/validator_python_lessons_views.png)

</details>
<br>

| **Directory**        | **adapters.py** | **admin.py** | **forms.py** | **models.py** | **settings.py** | **urls.py** | **views.py** |
| -------------------- | --------------- | ------------ | ------------ | ------------- | --------------- | ----------- | ------------ |
| Blackboard (Project) | Pass            | n/a          | n/a          | n/a           | Pass            | Pass        | Pass         |
| Lessons (App)        | n/a             | Pass         | Pass         | Pass          | n/a             | Pass        | Pass         |
| Homework (App)       | n/a             | Pass         | Pass         | Pass          | n/a             | Pass        | Pass         |

### JavaScript

<details>
<summary> JS Validation - JSHint </summary>
<br>
comments.js:

![Screenshot of JS Validation for comments.js](/_readme-docs/images/validator_js_comments.png)

homework.js:

![Screenshot of JS Validation for homework.js](/_readme-docs/images/validator_js_homework.png)

</details>
<br>

Both JavaScript files passed with no errors or warnings.

## Lighthouse Testing

Using the Lighthouse feature of Google Chrome's Dev Tools, I tested each of my site's pages for Performance, Accessibility, Best Practices and SEO (Search Engine Optimisation).

<details>
<summary> Lighthouse Reports </summary>
<br>
Homepage (Authenticated):

![Screenshot of Lighthouse Report for Homepage (Authenticated)](/_readme-docs/images/lighthouse_homepage_auth.png)

Homepage (Not Authenticated):

![Screenshot of Lighthouse Report for Homepage (Not Authenticated)](/_readme-docs/images/lighthouse_homepage_unauth.png)

Lesson Feed (English):

![Screenshot of Lighthouse Report for Lesson Feed (English)](/_readme-docs/images/lighthouse_eng.png)

Lesson Feed (History):

![Screenshot of Lighthouse Report for Lesson Feed (History)](/_readme-docs/images/lighthouse_hist.png)

Lesson Feed (Psychology):

![Screenshot of Lighthouse Report for Lesson Feed (Psychology)](/_readme-docs/images/lighthouse_psych.png)

Lesson Detail:

![Screenshot of Lighthouse Report for Lesson Detail](/_readme-docs/images/lighthouse_lesson-detail.png)

Homework Dashboard:

![Screenshot of Lighthouse Report for Homework Dashboard](/_readme-docs/images/lighthouse_homework-dashboard.png)

Homework Submission:

![Screenshot of Lighthouse Report for Homework Submission](/_readme-docs/images/lighthouse_homework-submission.png)

Login:

![Screenshot of Lighthouse Report for Login](/_readme-docs/images/lighthouse_login.png)

Logout:

![Screenshot of Lighthouse Report for Logout](/_readme-docs/images/lighthouse_logout.png)

Register:

![Screenshot of Lighthouse Report for Register](/_readme-docs/images/lighthouse_reg.png)

</details>
<br>

| **Page**                     | **Performance** | **Accessibility** | **Best Practices** | **SEO** |
| ---------------------------- | --------------- | ----------------- | ------------------ | ------- |
| Homepage (Authenticated)     | 98              | 98                | 100                | 90      |
| Homepage (Not Authenticated) | 98              | 98                | 100                | 90      |
| Lesson Feed (Eng)            | 95              | 95                | 100                | 91      |
| Lesson Feed (Hist)           | 95              | 95                | 100                | 91      |
| Lesson Feed (Psych)          | 100             | 100               | 100                | 91      |
| Lesson Detail                | 100             | 91                | 100                | 82      |
| Homework Dashboard           | 98              | 98                | 100                | 90      |
| Homework Submission          | 99              | 90                | 100                | 90      |
| Login                        | 98              | 95                | 100                | 90      |
| Logout                       | 98              | 94                | 100                | 90      |
| Account Registration         | 98              | 95                | 100                | 90      |

The only page to have any of the test categories score below 90 is 'lesson_detail.html'. This is due to 4 anchor tags not having crawlable links. These are the two anchor tags for each the 'report' button and the 'delete' button. The reason these anchor tags don't have crawlable links is because they are intentionally written with placeholder text (href="javascript:void(0)">), as the JavaScript that enables the functionality of these buttons does so by replacing the href with 'delete/report_comment/${commentId}' when clicked.

## Manual Testing & Bug Fixes

Extensive manual testing was conducted on each feature of this project to ensure all were functioning as expected. The outcome of this testing and any bug fixes made during the project's development are recorded in the tables below.

### Manual Testing

#### Authentication - Account Registration

| **Feature**                                                                           | **Expected Outcome**                                                                                                               | **Result** |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Account Registration (success)                                                        | Given the correct details provided, a new User account is created.                                                                 | Pass       |
| Account Registration (no email)                                                       | Given no email is provided, the User is prompted to complete this field                                                            | Pass       |
| Account Registration (incorrect email)                                                | Given an email that does not meet the specifications is provided, the User is advised accordingly                                  | Pass       |
| Account Registration (duplicated email)                                               | Given an email that already belongs to an account is provided, the User is advised accordingly                                     | Pass       |
| Account Registration (no username)                                                    | Given no username is provided, the User is prompted to complete this field                                                         | Pass       |
| Account Registration (duplicated username)                                            | Given a username that already belongs to an account is provided, the User is advised accordingly                                   | Pass       |
| Account Registration (no password)                                                    | Given no password is provided, the User is prompted to complete this field                                                         | Pass       |
| Account Registration (incorrect password - too similar to other personal information) | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - 8 character minimum)                       | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - common password)                           | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (incorrect password - entirely numeric)                          | Given a password that does not meet this specification is provided, the User is advised accordingly                                | Pass       |
| Account Registration (password confirmation error)                                    | Given the password provided in the confrimation box does not match the original password provided, the User is advised accordingly | Pass       |
| 'Sign in' link                                                                        | Given the User clicks the 'Sign in' link, they are directed to the Login page                                                      | Pass       |

<br>

#### Authentication - Login

| **Feature**               | **Expected Outcome**                                                                                                      | **Result** |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Login (success)           | Given the correct details provided, the User is signed in.                                                                | Pass       |
| Login (missing details)   | Given the User tries to sign in without providing a username and/or password, they are prompted to complete these fields. | Pass       |
| Login (incorrect details) | Given the User tries to sign in by providing an incorrect username and/or password, they are advised accordingly.         | Pass       |
| 'Sign up' link            | Given the User clicks the 'Sign up' link, they are directed to the Registration page                                      | Pass       |
| Confirmation Message      | Given the User successfully signs in, a confirmation message appears.                                                     | Pass       |

<br>

#### Authentication - Logout

| **Feature**          | **Expected Outcome**                                                   | **Result** |
| -------------------- | ---------------------------------------------------------------------- | ---------- |
| Logout               | Given the User clicks the 'sign out' button, the User is logged out.   | Pass       |
| Confirmation Message | Given the User successfully signs out, a confirmation message appears. | Pass       |

<br>

#### Authentication - Security

| **Feature**       | **Expected Outcome**                                                                                                                | **Result** |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Authenticated     | Given the User is authenticated, they can freely navigate all pages of the site (excluding admin panel for non-staff accounts).     | Pass       |
| Not Authenticated | Given the User is not authenticated, they are redirected to the login page should they try to access any of the site's other pages. | Pass       |

<br>

#### Base Template Features

| **Feature**        | **Expected Outcome**                                                                                                                                        | **Result** |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Nav Links          | All navigation links contained within the header direct the User to the expected page.                                                                      | Pass       |
| Authenticated      | Given the User is authenticated, a welcome message shows in the header, as do the links to the subjects lesson feeds, homework dashboard and sign out page. | Pass       |
| Not Authenticated  | Given the User is not authenticated, a message shows in the header advising them of this, as do the links to the account registration and sign in pages.    | Pass       |
| Template Extending | The Base template is correctly extended on every page.                                                                                                      | Pass       |

<br>

#### Homepage

| **Feature**       | **Expected Outcome**                                                                                         | **Result** |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ---------- |
| Authenticated     | Given the User is authenticated, the three subject buttons appear.                                           | Pass       |
| Not Authenticated | Given the User is not authenticated, a message appears to direct them to sign in or register for an account. | Pass       |
| Subject Buttons   | Given the User clicks on a subject button, they are directed to the correct lesson feed.                     | Pass       |

<br>

#### Lesson Feeds

| **Feature**   | **Expected Outcome**                                                                                            | **Result** |
| ------------- | --------------------------------------------------------------------------------------------------------------- | ---------- |
| Lesson Feed   | All published lessons belonging to the selected subject appear in a single unbroken list.                       | Pass       |
| Draft Lessons | No draft lessons appear in the lesson feed.                                                                     | Pass       |
| Lesson Detail | Given the User clicks on the title or summary of a lesson, they are directed to a detailed view of that lesson. | Pass       |

<br>

#### Lesson Detail

| **Feature**                       | **Expected Outcome**                                                                                                                                                                                                                                                          | **Result** |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Comment Counter                   | The comment counter displays the correct number of approved comments for that lesson.                                                                                                                                                                                         | Pass       |
| Comment Thread                    | All approved comments and are displayed within the Comment Thread.                                                                                                                                                                                                            | Pass       |
| Comment Report Button             | Given the User is not the author of a comment, a 'report' button appears beneath the comment.                                                                                                                                                                                 | Pass       |
| Comment Report Confirmation Modal | Given the User clicks the 'report' button, a confirmation modal appears.                                                                                                                                                                                                      | Pass       |
| Comment Report Success            | Given the User confirms the report, the comment is hidden from view of all Users (notwithstanding the comment author, who seems a faded version of the comment with a message advising it has been reported). A success message appears to the User who reported the comment. | Pass       |
| Comment Delete Button             | Given the User is the author of a comment, a 'delete' button appears beneath the comment.                                                                                                                                                                                     | Pass       |
| Comment Delete Confirmation Modal | Given the User clicks the 'delete' button, a confirmation modal appears.                                                                                                                                                                                                      | Pass       |
| Comment Delete Success            | Given the User confirms the deletion, the comment is deleted from the database and a success message appears confirming the deletion. The comment disappears from the Comment Thread.                                                                                         | Pass       |
| Comment Edit Button               | Given the User is the author of a comment, an 'edit' button appears beneath the comment.                                                                                                                                                                                      | Pass       |
| Comment Edit Process              | Given the User clicks the 'edit' button, they are given the ability to edit the comment in the 'leave a comment' textbox.                                                                                                                                                     | Pass       |
| Comment Edit Success              | Given the User confirms the edit, the comment is updated and a message appears confirming the same.                                                                                                                                                                           | Pass       |

<br>

#### Homework Dashboard

| **Feature**       | **Expected Outcome**                                                                    | **Result** |
| ----------------- | --------------------------------------------------------------------------------------- | ---------- |
| Subject Iteration | All subjects available to the User appear as buttons.                                   | Pass       |
| Subject Buttons   | Given the User clicks a subject button, they are taken to the Homework Submission page. | Pass       |

<br>

#### Homework Submission

| **Feature**                  | **Expected Outcome**                                                                                                                                                                           | **Result** |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Subject                      | The subject selected by the User in the homework dashboard is displayed after the "Submit Homework -" message. The lessons available to the User are only those contained within that subject. | Pass       |
| Form Submission (success)    | Given the User correctly fills out the form, they are able to submit it by clicking the 'submit homework' button. A success message appears when this is done.                                 | Pass       |
| Form Submission (no lesson)  | Given the User attempts to submit the homework without selecting a lesson, a message prompts them to complete this field.                                                                      | Pass       |
| Form Submission (no content) | Given the User attempts to submit the homework without providing any content, a message prompts them to complete this field.                                                                   | Pass       |

<br>

#### Admin Panel

| **Feature**       | **Expected Outcome**                                                                                                                                                                                                      | **Result** |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Restricted Access | Only accounts designated as 'staff' by a superuser can access the admin panel.                                                                                                                                            | Pass       |
| Permissions       | The features available to the User are restricted based on their account's permissions.                                                                                                                                   | Pass       |
| Filters           | All filters are correctly applied/removed when selected/deselected.                                                                                                                                                       | Pass       |
| Homeworks         | All homework submitted to the database is viewable with full CRUD functionality.                                                                                                                                          | Pass       |
| Comments          | All comments submitted to the database are viewable with full CRUD functionality.                                                                                                                                         | Pass       |
| Lessons           | Access to lessons is restricted so that only superusers and the staff that created each lesson can access the given lesson via the Admin Panel. Users have fully CRUD fucntionality over the lessons they have access to. | Pass       |
| Subjects          | Subjects are viewable by staff, but only editable by superusers.                                                                                                                                                          | Pass       |
| Users             | Users are viewable by staff, but only editable by superusers.                                                                                                                                                             | Pass       |

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
