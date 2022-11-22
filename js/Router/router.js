import { routes } from './routes.js'

class Router {
  constructor () {
    this.path = ''
    this.route = ''
  }

  getCurrentPath () {
    const url = window.location.pathname
    const formattedUrl = url.split('/').splice(1)

    if (String(formattedUrl) === '') this.path = 'home'
    else this.path = String(formattedUrl)
  }

  async loadPage () {
    this.getCurrentPath() //  if session storage has no saved path = first load, no reload

    const view = document.querySelector('#view')
    const page = await this.fetchPage(this.path)
    view.innerHTML = page
  }

  async fetchPage () {
    const validRoutes = Object.keys(routes)

    // get the current route
    for (const validRoute of validRoutes) {
      if (validRoute === this.path) this.route = routes[this.path]
    }

    if (!this.route) {
      this.route = routes['404']
      const header = document.querySelector('header')
      header.style.display = 'none'
    }

    // Set all meta-elements: css, searchbar, title & description
    this.configurePage()

    // fetch the route
    const page = await fetch(this.route.url)
      .then((page) => page.text()) // .text() returns a promise

    return page
  }

  configurePage () {
    // change style
    const style = document.querySelector('#style')
    style.setAttribute('href', this.route.style)

    // change title
    const title = document.querySelector('title')
    title.innerHTML = this.route.title

    // change title
    const description = document.querySelector('#description')
    description.setAttribute('content', this.route.description)
  }

  // GETTERS AND SETTERS
  getPath () {
    return this.path
  }

  setPath (value) {
    this.path = value
  }

  getRouter () {
    return this.route
  }

  setRouter (value) {
    this.router = value
  }
}

export default Router
