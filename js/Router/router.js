import { routes } from './routes.js'

class Router {
  constructor () {
    this.path = ''
    this.segments = []
    this.route = ''
  }

  getCurrentPath () {
    const url = window.location.pathname

    if (url !== '/') this.path = url
    else this.path = '/'
  }

  getSegments () {
    const segments = this.path.split('/').splice(1) 
    this.segments = segments 
  }

  async loadPage () {
    this.getCurrentPath()
    this.getSegments()

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

    //check if the route has childs before throwing 404 page
    if (!this.route && !this.hasChild()) {
      this.route = routes['/404']
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

  hasChild() {
    // if the first segment route exists continue
    if( !routes[`/${this.segments[0]}`] ) return 
    if( this.segments.length <= 1 ) return 
    
    console.log(routes[`/${this.segments[0]}`],this.segments[0] )
    const parentRoute = routes[`/${this.segments[0]}`]
    const requested = this.segments[1]

    for( let i = 0; i < parentRoute.childs.length; i++){
      console.log(requested[i], parentRoute.childs[i][requested])
      if(parentRoute.childs[i][requested]) {
        //Access the property to return the property object
        this.route = parentRoute.childs[i][requested]
        return true
      }
    }

    return false
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
