import { routes } from './data/routes.js'

function getPath () {
  const url = window.location.pathname // + 'contact'
  let path = url.split('/').splice(1)

  if (String(path) === '') path = 'home'
  else path = String(path)

  return path
}

async function loadPage () {
  const path = getPath()

  const view = document.querySelector('#view')
  const page = await fetchPage(path)
  view.innerHTML = page
}

async function fetchPage (path) {
  const validRoutes = Object.keys(routes)

  // get the current route
  let route

  for (const validRoute of validRoutes) {
    if (validRoute === path) route = routes[path]
  }

  if (!route) {
    route = routes['404']
    const header = document.querySelector('header')
    header.style.display = 'none'
  }

  // Set all meta-elements: css, searchbar, title & description
  configurePage(route, path)

  // fetch the route
  const page = await fetch(route.url)
    .then((page) => page.text()) // .text() returns a promise

  return page
}

function configurePage (route, path) {
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

window.addEventListener('load', () => {
  // LOAD DEFAULT PAGE ( HOMEPAGE )
  loadPage()

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
    window.history.pushState({}, '', './contact')
    loadPage()
  })

  home.addEventListener('click', () => {
    window.history.pushState({}, '', './')
    loadPage()
  })

  /* projects.addEventListener('click', () => {
    window.history.pushState({}, '', './#third-section')
    loadPage()
    const position = document.querySelector('#third-section').offsetTop
    window.scrollTo(0, (position - 150))
  })

  services.addEventListener('click', () => {
    window.history.pushState({}, '', './')
    loadPage()
    console.log('something')
    const position = document.querySelector('#fifth-section').offsetTop
    window.scrollTo(0, (position - 150))
  }) */

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
