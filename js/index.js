import Router from './router.js'

const router = new Router()

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
    window.history.pushState({}, '', './contact')
    router.loadPage()
  })

  home.addEventListener('click', () => {
    window.history.pushState({}, '', './')
    router.loadPage()
  })

  projects.addEventListener('click', () => {
    window.history.pushState({}, '', './')
    router.loadPage()

    const position = document.querySelector('#third-section').offsetTop
    window.scrollTo(0, (position - 150))
  })

  services.addEventListener('click', () => {
    window.history.pushState({}, '', './')
    router.loadPage()

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
