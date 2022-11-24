# Vanilla SPA 


### Introduction

On this repo we're going to create a fictional company called "Circle" and we're going to create a website for it. The website will be deployed on Netlify usign this github repo. 

Our page will be a SPA (Single Page Application) that will be built using vanilla JavaScript, HTML and CSS. 

### Project Wireframes
<iframe src="https://miro.com/app/live-embed/uXjVPAbx5cU=/?moveToViewport=-1921,-1697,5759,2464&embedId=416097099989" scrolling="no" allowfullscreen width="100%" height="500px" frameborder="0"></iframe>

### Project Structure

The structure looks like a lot of files but we will explain everything step by step.The project will be structured as follows:
 
```
./ ┐
   ├── css
   │   ├── components  // common components css files
   │   │   ├── <Context.js>
   │   │   └── <fetchProjects.js>
   │   ├── pages // Each page will have a css file
   │   │   ├── <_project.js>
   │   │   ├── <contact.js>
   │   │   ├── <home.js> 
   │   │   └── projects.js
   │   └── style.css // our global style  
   ├── js
   │   ├── APIs  // Utils
   │   │   ├── <Context.js>
   │   │   └── <fetchProjects.js>
   │   ├── Pages // Each page will have a js file
   │   │   ├── <_project.js>
   │   │   ├── <contact.js>
   │   │   ├── <home.js> 
   │   │   └── projects.js
   │   ├── Router // our custom router
   │   │   └── router.js
   │   │   └── routes.js
   │   └── index.js
   ├── html
   │   ├── _project.html
   │   ├── 404.html
   │   ├── contact.html
   │   ├── home.html
   │   ├── projects.html
   │   └── services.html
   ├── index.html
   ├── _redirects // the magic file
   ├── .gitignore
   └── README.md
```