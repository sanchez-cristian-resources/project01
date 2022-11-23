import Router from '../Router/router.js'
import { fetchProjects } from '../APIs/fetchProjects.js'

export async function renderOtherProjects () {
  const router = new Router()
  const projects = await fetchProjects()

  const path = window.location.pathname.split('/')
  const targetProject = projects.filter((project) => path[path.length - 1] === project.id)
  const otherProjects = projects.filter((project) => path[path.length - 1] !== project.id)

  console.log(targetProject)
  document.querySelector('h1').innerHTML = targetProject[0].name
  document.querySelector('h3').innerHTML = targetProject[0].description
  document.querySelector('#date').innerHTML = targetProject[0].completed_on
  document.querySelector('#content').innerHTML = targetProject[0].content
  document.querySelector('#banner').setAttribute('src', projects[0].image)

  let cards = ''
  for (let i = 0; i < 3; i++) {
    cards += `
      <div id="${otherProjects[i].id}" class="card">
        <img loading="eager" src="${otherProjects[i].image}" alt="Simplify project image">
        <div class="text-container">
          <p class="title">${otherProjects[i].name}</p>
          <p class="description">${otherProjects[i].description}</p>
          <p class="link">Learn more</p>
        </div>
      </div>
    `
  }

  document.querySelector('#cards-container').innerHTML = cards

  for (let i = 0; i < 3; i++) {
    document.querySelector(`#${otherProjects[i].id}`).addEventListener('click', (e) => {
      window.history.pushState({}, '', `/projects/${otherProjects[i].id}`)
      router.loadPage()
    })
  }
}
