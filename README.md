# Inspyre

### Create boldly. Share freely. Discover endlessly.

![Responsive Demo](./README/images/Am-I-Responsive.png)

#### Frontend React app - for the backend DRF API, [click here](https://github.com/MattMiles95/PP5_Inspyre_Backend).

Inspyre is a modern content-sharing platform designed to empower creativity and connection. Whether you're a digital artist, writer, photographer, or passionate hobbyist, Inspyre gives you the tools to showcase your work, engage with a like-minded community, and discover new inspiration every day.

Built with a clean, responsive UI and a focus on discoverability, Inspyre supports both image-based and text-based posts, user profiles with customizable tags, an intuitive editing experience and a built in direct messaging service. It's a place to be seen, to be heard, and to inspire—and be inspired.

[Visit the deployed site](https://inspyre-53afb73e4a64.herokuapp.com/)

## Table of Contents

### [User Experience (UX)](#user-experience-ux-1)

- [User Stories](#user-stories)

### [Logic](#logic-1)

### [Design](#design-1)

- [Wireframes](#wireframes)
- [Theme](#theme)
- [Colours](#colours)
- [Brand: Meet Ember](#brand-meet-ember)
- [Typography](#typography)
- [Accessibility](#accessibility)
- [Responsiveness](#responsiveness)

### [Features](#features-1)

- [Front End](#front-end)
- [Admin Panel](#admin-panel)

### [Future Features](#future-features-1)

- [Bespoke Profiles](#bespoke-profiles)
- [Front End UI for Teachers](#front-end-ui-for-teachers)
- [Homework CRUD Functionality](#homework-crud-functionality)
- [More Content](#more-content)
- [Refactoring](#refactoring)

### [Project Management - an Agile Approach](#project-management---an-agile-approach-1)

- [Agile Methodology](#agile-methodology)
- [MoSCoW Prioritisation](#moscow-prioritisation)
- [GitHub Project - Kanban Board](#github-project---kanban-board)

### [Technologies Used](#technologies-used-1)

- [Languages](#languages)
- [Frameworks, Libraries & Programs Used](#frameworks-libraries--programs-used-1)

### [Testing](#testing-1)

### [Local Development & Deployment](#local-development--deployment-1)

- [Forking the GitHub Repository](#forking-the-github-repository)
- [Local Clone](#local-clone)
- [Code Institute PostgreSQL Database](#code-institute-postgresql-database)
- [Cloudinary](#cloudinary)

### [Credits](#credits-1)

- [Affiliations](#affiliations)
- [Copy (Written Material)](#copy-written-material)
- [Code Credits](#code-credits)

## User Experience (UX)

Inspyre is designed to feel like a creative home — a platform where users don’t just consume content, but actively participate in an ongoing exchange of ideas and inspiration.

_Effortless Discovery:_ From the moment users land on the homepage, they’re greeted with a dynamic gallery of visual and written content, curated for exploration. Browsing is fast, intuitive, and immersive — with minimal clutter and maximum focus on the work.

_Creative Expression:_ Users can easily create and share posts, whether it’s artwork, photography, short stories, or thought pieces. Image-based and text-based content types are both first-class citizens, each with tailored editing interfaces.

_Personalized Profiles:_ Each user gets a customizable profile with a bio, profile tags to highlight your creative mediums, a profile photo, and a clean portfolio-style layout. Their posts, followers, and following lists are all easily viewable and interactable.

_Community Engagement:_ Through likes, comments, follows and direct messages, users can connect and build communities around shared passions.

_Mobile-Ready Design:_ Inspyre scales gracefully to any device, with thoughtful mobile UX — from responsive navigation to swipe-friendly browsing.

Inspyre aims to be more than just a platform — it’s a creative space that puts the user’s work front and center, while offering just enough social functionality to foster genuine connection and growth.

### User Stories

When originally designing Inspyre, I created a Project (organised via a kanban board) in GitHub, containing a list of User Stories that set out my intended features. These User Stories can be viewed [here](https://github.com/users/MattMiles95/projects/8/views/1).

## Logic

I discuss the logic for Inspyre (including my Entity Relationship Diagrams), in the README for my backend repo. [Click here]() to check it out.

## Design

### Wireframes

Below are the wireframes I used to create the initial layout and design for Inspyre. These include the the sign up page, the homepage (on desktop and mobile device), the profile page and the chat page.

<details>
<summary> Wireframe - Sign Up Page </summary>

<br>

![Wireframe for the sign up page](./README/wireframes/wf-signup-page.png)

</details>

<br>

<details>
<summary> Wireframe - Homepage </summary>

<br>

![Wireframe for the homepage](./README/wireframes/wf-homepage.png)

</details>

<br>

<details>
<summary> Wireframe - Homepage (Mobile) </summary>

<br>

![Wireframe for the homepage (mobile view)](./README/wireframes/wf-homepage-mobile.png)

</details>

<br>

<details>
<summary> Wireframe - Profile Page </summary>

<br>

![Wireframe for the profile page](./README/wireframes/wf-profile-page.png)

</details>

<br>

<details>
<summary> Wireframe - Chat Page </summary>

<br>

![Wireframe for the profile page](./README/wireframes/wf-chat-page.png)

</details>

### Theme

<details>
<summary> Logo </summary>

<br>

![Inspyre Logo](./src/assets/inspyre_logo.png)

</details>

<br>

The theme for Inspyre began with its logo. Fire has long been a symbol of creativity — the _spark_ of inspiration, the _flames_ of the forge where where the blacksmith shapes his creations, storytellers sharing tales of wonder around a _campfire_. I wanted a logo that embodied this elemental energy — something simple, bold, and immediately evocative of the act of creation. From that foundation, the visual identity of Inspyre took shape.

### Colours

<details>
<summary> Background & Colour Palette </summary>

<br>

![Background](./src/assets/inspyre_bg.jpg)
![Colour Palette](./README/images/inspyre-palette.png)

</details>

<br>

The background and colour scheme builds on this concept of fire and emberlight. A dark background beneath dancing embers serves as the canvas, contrasted with a UI that utilises vivid accents of bright orange, amber, and ember-red, giving the platform a sense of warmth and focus. This contrast helps highlight content while maintaining a modern, dramatic tone. It’s designed to feel sleek and atmospheric, like a gallery lit by a glowing campfire.

<details>
<summary> Demo: Post Creation Page </summary>

<br>

![Post Creation Page](./README/images/post-creation-page.png)

</details>

### Brand: Meet Ember

<details>
<summary> Ember </summary>

<br>

![Ember](./README/images/ember.png)

</details>

<br>

To bring personality and playfulness into the design, I created Ember, the platform’s flame-shaped mascot. Ember embodies the spirit of Inspyre: a cheeky, curious flame with a creative streak. As users engage with the platform — posting, exploring, or connecting — Ember makes the occasional appearance here and there. Be it as the favicon, at the sign in page, during a 404 error, as a default profile image or even a post from his own account!

<details>
<summary> Ember - Sign Up </summary>

<br>

![Ember - Sign Up Page](./src/assets/signup_hero.png)

</details>

<br>

<details>
<summary> Ember - Sign In </summary>

<br>

![Ember - Sign In Page](./src/assets/signin_hero.png)

</details>

<br>

<details>
<summary> Ember - 404 Error & No Results </summary>

<br>

![Ember - 404 Error & No Results](./src/assets/no-results.png)

</details>

<br>

<details>
<summary> Ember - 401 & 403 Error </summary>

<br>

![Ember - 401 & 403 Error](./src/assets/no-access.png)

</details>

<br>

<details>
<summary> Ember - 500 & 503 Error </summary>

<br>

![Ember - 500 & 503 Error](./src/assets/no-service.png)

</details>

<br>

A brand mascot like Ember creates an emotional resonance between the user and the platform, helping users form a more memorable and relatable connection with the brand. It can make interactions feel more engaging and human, while also reinforcing core themes — in this case, creativity, warmth, and playful inspiration.

### Typography

<details>
<summary> Font Specimen - Montserrat </summary>

<br>

![Font Specimen - Montserrat](./README/images/font-specimen-montserrat.png)

</details>

<br>

I chose **Montserrat** as the default font for Inspyre because its clean, geometric style aligns perfectly with the platform’s modern and creative aesthetic. It feels contemporary without being cold, giving the site a sense of clarity and polish. Additionally, as a Google Font, it’s widely supported across browsers and devices, ensuring consistent rendering and accessibility for all users.

### Accessibility

To ensure every User has equal opportunity to enjoy the platform, I ensured maximum accessibility in its design and code:

- Alt text and aria-labels are used throughout the site to aid screen readers.

- All colour schemes utilise contrast between background and foreground to ensure ease of readability.

### Responsiveness

<details>
<summary> Homepage - Desktop </summary>

<br>

![Homepage - Desktop](./README/images/homepage-desktop.png)

</details>

<br>

<details>
<summary> Homepage - Mobile </summary>

<br>

![Homepage - Mobile](./README/images/homepage-mobile.png)

</details>

<br>

While Inspyre is primarily designed with desktop users in mind — where creative content can be viewed and edited most comfortably — the platform is fully responsive across a range of devices, including tablets and smartphones. By combining Bootstrap’s responsive flexbox system with custom CSS media queries, I’ve ensured that layouts adapt seamlessly to different screen sizes, maintaining usability, visual clarity, and an intuitive experience no matter where or how users access the site.
