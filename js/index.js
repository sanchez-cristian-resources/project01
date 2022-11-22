import Router from './Router/router.js'
import { createContext } from './Context/Context.js'

const router = new Router() // For the page routering

const [projects, setProjects] = createContext([])

window.addEventListener('load', async () => {
  // LOAD DEFAULT PAGE ( HOMEPAGE )
  router.loadPage()

  // FETCH PROJECTS
  await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
    .then(data => data.json())
    .then(data => setProjects(data))

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
    window.history.pushState({}, '', './#third-section')
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
