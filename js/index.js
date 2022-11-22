import Router from './Router/router.js'
import { createContext } from './Context/Context.js'

const router = new Router() // For the page routering

const [projects, setProjects] = createContext([])

window.addEventListener('load', () => {
  // LOAD DEFAULT PAGE ( HOMEPAGE )
  router.loadPage()

  // FETCH PROJECTS
  fetchProjects()

  // NAVBAR BUTTON (MOBILE)
  addNavbarListeners()
})

async function fetchProjects () {
  await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
    .then(data => data.json())
    .then(data => setProjects(data))

  // add a comparable element like time => in milliseconds
  const datedProjects = [...projects()].map((project) => {
    const date = new Date(project.completed_on)
    return { ...project, milliseconds: date.getTime() }
  })

  // order the projects by the milliseconds
  const oProjects = datedProjects.sort((a, b) => b.milliseconds - a.milliseconds)

  console.log(oProjects)

  let cards = ''
  for (let i = 0; i < 3; i++) {
    cards += `
    <div id="first-card" class="card" data-id="${oProjects.uuid}">
    <img loading="eager" src="${oProjects[i].image}" alt="Simplify project image">
    <div class="text-container">
    <p class="title">${oProjects[i].name}</p>
    <p class="description">${oProjects[i].description}</p>
    <p class="link">Learn more</p>
    </div>
    </div>
    `
  }
  document.querySelector('#cards-container').innerHTML = cards
}

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
