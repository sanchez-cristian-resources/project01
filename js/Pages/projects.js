import { fetchProjects } from '../APIs/fetchProjects.js'
import Router from '../Router/router.js'

export async function renderAllProjects () {
  const router = new Router()
  const projects = await fetchProjects()

  let cards = ''
  for (let i = 0; i < projects.length; i++) {
    cards += `
        <div id="${projects[i].id}" class="card">
          <img loading="eager" src="${projects[i].image}" alt="">
          <div class="text-container">
            <p class="title">${projects[i].name}</p>
            <p class="description">${projects[i].description}</p>
            <p class="link">Learn more</p>
          </div>
        </div>
      `
  }

  document.querySelector('#cards-container').innerHTML = cards
  for (let i = 0; i < projects.length; i++) {
    document.querySelector(`#${projects[i].id}`).addEventListener('click', (e) => {
      window.history.pushState({}, '', `/projects/${projects[i].id}`)
      router.loadPage()
    })
  }
}
