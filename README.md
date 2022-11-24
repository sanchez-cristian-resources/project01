# Vanilla SPA 


### Introduction

On this repo we're going to create a fictional company called "Circle" and we're going to create a website for it. The website will be deployed on Netlify usign this github repo. 

Our page will be a SPA (Single Page Application) that will be built using vanilla JavaScript, HTML and CSS. 

### Project Wireframes
<iframe src="https://miro.com/app/live-embed/uXjVPAbx5cU=/?moveToViewport=-1921,-1697,5759,2464&embedId=416097099989" scrolling="no" allowfullscreen width="100%" height="500px" frameborder="0"></iframe>

### Setup

Setup this project is so easy. Just clone this repo and open on a local http server.

```
git clone https://github.com/sanchez-cristian-resources/vanilla-spa.git
```

### Project Structure

The structure looks like a lot of files but we will explain everything step by step.The project will be structured as follows:
 
```
./ ┐
   ├── css
   │   ├── components  ────────────────> common components css files
   │   │   ├── <Context.js>
   │   │   └── <fetchProjects.js>
   │   ├── pages ───────────────────> Each page will have a css file
   │   │   ├── <_project.js>
   │   │   ├── <contact.js>
   │   │   ├── <home.js> 
   │   │   └── projects.js
   │   └── style.css ───────────────────> our global style  
   ├── js
   │   ├── APIs  ───────────────────> Utils
   │   │   ├── <Context.js>
   │   │   └── <fetchProjects.js>
   │   ├── Pages ───────────────────> Each page will have a js file
   │   │   ├── <_project.js>
   │   │   ├── <contact.js>
   │   │   ├── <home.js> 
   │   │   └── projects.js
   │   ├── Router ───────────────────> our custom router
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
   ├── index.html ───────────────────> our entry point
   ├── _redirects ───────────────────> the magic file
   ├── .gitignore
   └── README.md ───────────────────> 📍 you are here
```

### Understanding the project

As we say, this project was built on top of vanila JavaScript, HTML and CSS. So, why not? we're going to divide our project in this 3 main parts: HTML, CSS and JS.

#### 1. HTML
As we can see, we have a folder called `html` that contains all the html files that we're going to use. We're going to use the same html file for all the pages. The only thing that will change is the content.

This html file will be our entry point, the `index.html` let's take a look at it.

```
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta id="description" name="description" content="Software development and ui design company">
    <base href="/">
    <!-- PRELOADS -->
    <link rel="preload" href="/css/pages/_project.css" as="style" />
    <link rel="preload" href="/css/pages/contact.css" as="style" />
    <!-- NORMAL FLOW -->
    <link rel="stylesheet" href="/css/style.css"/>
    <link id="style" rel="stylesheet" href="/css/pages/home.css"/>
    <title>Circle: Design and Software development</title>
</head>
```

As we can see on the header, we have a `base` tag that will be used by our router to know where to load the pages. Also we have a `meta` tag with the description of our page. This will be used by the SEO to know what is our page about. Another important thing is the `link` tag with the `preload` attribute. This will tell the browser to load the css files before the page is loaded. This will help us to have a better performance.

Without preload attribute we have 2 links. This is because we need to first load the global styles file(`style.css`) and have those styles always loaded. Then the page styles dynamically, this is why this link element has an style id.

```
  <div id="menu">
    <div id="close-button">
      <span></span>
      <span></span>
    </div>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/">Services</a>
    <a href="/contact">Contact us</a>
  </div>
  <header id="root">
    <nav>
      <a href="/">
        <img src="../assets/logos/circle.svg"/>
      </a>
      <ul>
        <li id="home">Home</li>
        <li id="projects">Projects</li>
        <li id="services">Services</li>
      </ul>
      <button id="contact">Contact us</button>
      <div id="menu-button">
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
```

On the header we have a pretty simple navbar and also a menu button thats loads dynamically depending of the screen size. As the header renders always because it contains our navbar we need to declare out of our  dynamically main section. 

```
  <main id="view">
    <!-- ROUTER: HERE ALL THE PAGES WILL BE LOADED -->
  </main>
  <script type="module" src="./js/index.js"></script>
```

On the main tag we have a `view` id to identify where is our content going to be loaded, pretty similar to React. 
    
Finally, we have a script tag that loads our `index.js` file. Here starts all the machinery of our SPA.

#### 2. JavaScript
Here, on the real code, we have a folder called `js`. On this folder we storage all the javascript files. We have 3 main folders: `APIs`, `Pages` and `Router`.

##### The start: index.js
```
import Router from './Router/router.js'

(() => {
  const router = new Router() // For the page routering

  window.addEventListener('load', () => {
  // LOAD DEFAULT PAGE ( HOMEPAGE )
    router.loadPage()

    // NAVBAR BUTTON (MOBILE)
    addNavbarListeners()
  })

  function addNavbarListeners () {
  // DESKTOP
    const contact = document.querySelector('#contact')
    const home = document.querySelector('#home')
    const projects = document.querySelector('#projects')
    const services = document.querySelector('#services')

    contact.addEventListener('click', () => {
      window.history.pushState({}, '', '/contact')
      router.loadPage()
    })

    home.addEventListener('click', async () => {
      window.history.pushState({}, '', '/')
      router.loadPage()
    })

    projects.addEventListener('click', () => {
      window.history.pushState({}, '', '/projects')
      router.loadPage()
    })

    services.addEventListener('click', () => {
      window.history.pushState({}, '', '/')
      router.loadPage(false)

      const position = document.querySelector('#fifth-section').offsetTop
      window.scrollTo(0, (position - 150))
    })

    // MOBILE
    const button = document.querySelector('#menu-button')
    const menu = document.querySelector('#menu')

    const closeButton = document.querySelector('#close-button')

    button.addEventListener('click', () => {
      menu.style.display = 'flex'
      menu.style.top = '0px'
      button.style.display = 'none'
    })

    closeButton.addEventListener('click', () => {
      menu.style.display = 'none'
      button.style.display = 'block'
    })
  }
})()
```

The first that we could note is that we have an IIFE (Immediately Invoked Function Expression) that will be executed when the page is loaded. This is because we don't want to have global variables.

On the IIFE we have a `Router` instance that will be used to load the pages. Also we have several `addEventListener()' to handle click events on the navbar.

On the `Router` object we have a `loadPage()` method that will be used to load the pages. This method will be called every time that the user clicks on a link.	But first, before call this method, we need to change the url of the page. This is because we need to know what page we need to load. This is done with the `window.history.pushState()` method. This method will change the url of the page without reloading it. This is the magic of the SPA.

Let's see the `Router` class to see how works under the hood. 

##### The routing: router.js
On this class we have the `loadPage()` method that he've seen before. 

```
async loadPage () {
    this.getCurrentPath()
    this.getSegments()

    const view = document.querySelector('#view')
    view.style.display = 'none' // Avoid flickering

    const page = await this.fetchPage()

    // Set all meta-elements: css, searchbar, title & description
    this.configurePage()

    view.innerHTML = page

    // Execute current page specials method at startup
    this.execOptions()

    view.style.display = '' // Avoid flickering
}
```

First, we get the current path of the page. This is done with the `window.location.pathname` property. Then we get the segments of the path. This is done with the `this.getSegments()` method. This method will split the path by the `/` character. This is because we have a path like `/projects` and we need to get the `projects` segment.

Once he've made this, we get the `view` element. This is the element where we will load the page. Then we hide the view to avoid flickering. 

Then we fetch the page with the `this.fetchPage()` method (later we're going to explain from where is fetched the page). Once the page is fetched we configure the page with the `this.configurePage()` method. This method will set the title, description and the css. 

Then we set the innerHTML of the `view` with the fetched page content. Finally we execute the options of the page with the `this.execOptions()` method. This method will execute the `onLoad()` method of the page. This method is optional and it's used to execute some code when the page is loaded.

You could be asking from where is getted all the information of the page, the page, the title, the css file, the options, etc. This is done with another js file called routes.js. This file contains all the information of the pages. Let's take a look to a unique route object. 

```
  '/': {
    component: '../pages/home.html',
    style: '../css/pages/home.css',
    title: `${prefix}Software design and  development`,
    description: `
      Circle is a digital design and development studio.
      We design and develop astonishing websites 
      and mobile apps.
    `,
    options: [
      renderProjects
    ],
    childs: []
  },
```

NOTE: The `childs` property is for the nested routes. For example, it's not 
the same render `/projects` than `/projects/simplify`. The first one will 
render a random project and the second one will render the project with the 
id equal to `simplify`.

As you can see, we have a route object with a lot of properties. The 
`component` property is the path of the page. The `style` property is the 
path of the css file. The `title` property is the title of the page. The 
`description` property is the description of the page. The `options` 
property is an array of functions that will be executed when the page is 
loaded. Finally, the `childs` property is an array of routes objects.

Here occurs the magic of the SPA. The Router class. 

##### On components load: executeOptions() & ./pages
When a component is loaded, we've the possibility to execute an array of function that we want to execute. This is done with the `execOptions()` method. 

```
  execOptions () {
    this.route.options.map((option) => option())
  }
```
It's a very simple method. It's just iterate over the `options` array and it executes function by function. 

The functionality of having a page for each route is to have more clear from where are getted the method to be executed with `execOptions()`. 

##### Our customs APIs: Context & fetchProjects()
The `fetchProjects()` method is a custom API that we've created to get the projects from the server. This is done with the `fetch()` API. 

The Context class, but most important, the `createContext()` method. The context class provides us a way to store data in a dinamic way. This is done with the `createContext()` method. 

#### 3. Css
The css is one of the most headache part of the project. Because we need to load dinamically without impacting to much the permormance. This is why we decided to first preload all the css important files and the load the rest of the css files when the page is loaded.

The css folder is dividen in two main folders: components and pages. The components folder contains the css files of the components, that is css that will be used many times in the project inside the pages. The pages folder contains a css file for each page we have.

#### Bonus: _redirects
All the stuff that we've made so far is working under the condition of no reloading the page. But, what happens if the user reloads the page? The page will be reloaded and the SPA will not work. 

This behaviour need to be avoided server-side. On our deployment platform(Netlify) we have the possibility to add a `_redirects` file. This file will be used to redirect all the request to our page to the index.html file. So that the behaviour of the SPA will be something like this:

```
Browser -> Request to /projects
 └ Server -> Redirect to /index.html

Browser -> Request to /contacts
 └ Server -> Redirect to /index.html

```

We will handle the request on the client-side and we will load the page that the user wants as we've seen. 

__Demo: See the live of the project [here](https://ciircle.netlify.app/)__

### Conclusion
This project was a very interesting project to do. We've learned a lot of things and we've had a lot of fun doing it. It will be a good idea try implemente all this stuff on a independent library or why not, create our own framework. The limit is up to us.

Feel free to fork this project and try to improve it. All the code is open source and all the technical documentation is available on [MDN](https://developer.mozilla.org/es/)

Here Cristian Sánchez as todays author. I hope you've enjoyed this article.

Happy coding!