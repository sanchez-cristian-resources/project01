import { routes } from './data/routes.js'

async function loadPage(path) {
    const view = document.querySelector('#view')
    const page = await fetchPage(path)

    view.innerHTML = page
}

async function fetchPage(path) {
    const validRoutes = Object.keys(routes)

    // get the current route
    let route

    for ( let validRoute of validRoutes ) {
        if( validRoute === path ) route = routes[path]
    }
    
    if(!route) {
        route = routes['404']
        const header = document.querySelector('header')
        header.style.display = 'none'
    }
 
    // fetch the route
    const page = await fetch(route.url)
        .then((page) => page.text()) // .text() returns a promise

    
    // Set all meta-elements: css, searchbar, title & description
    configurePage(route)

    return page
}

function configurePage(route) {
    // change style
    const style = document.querySelector('#style')
    style.setAttribute('href', route.style)

    // change title
    const title = document.querySelector('title')
    title.innerHTML = route.title

    // change title
    const description = document.querySelector('#description')
    description.setAttribute('content', route.description)
}

function addNavbarListeners() {
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

window.addEventListener('load', () => {
    const url = window.location.pathname
    let path = url.split('/').splice(1) 

    if(String(path) === '') path = 'home'
    else path = String(path)

    loadPage(path)


    // NAVBAR BUTTON (MOBILE) 
    addNavbarListeners()
})

