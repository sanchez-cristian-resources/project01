import { routes } from './routes.js'

class Router {
  constructor () {
    this.path = ''
    this.route = ''
  }

  getCurrentPath () {
    const url = window.location.pathname

    if (url !== '/') this.path = url
    else this.path = '/'
  }

  async loadPage () {
    this.getCurrentPath()

    const view = document.querySelector('#view')
    const page = await this.fetchPage()
    view.innerHTML = page
    this.execOptions()
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
    const page = await fetch(this.route.component)
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

  execOptions () {
    this.route.options.map((option) => option())
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
