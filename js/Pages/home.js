import Router from '../Router/router.js'
import { fetchProjects } from '../APIs/fetchProjects.js'

export async function renderProjects () {
  const router = new Router()
  const projects = await fetchProjects()

  let cards = ''
  for (let i = 0; i < 3; i++) {
    cards += `
      <div id="${projects[i].id}" class="card">
        <img loading="eager" src="${projects[i].image}" alt="Simplify project image">
        <div class="text-container">
          <p class="title">${projects[i].name}</p>
          <p class="description">${projects[i].description}</p>
          <p class="link">Learn more</p>
        </div>
      </div>
    `
  }

  document.querySelector('#cards-container').innerHTML = cards
  for (let i = 0; i < 3; i++) {
    document.querySelector(`#${projects[i].id}`).addEventListener('click', (e) => {
      window.history.pushState({}, '', `/projects/${projects[i].id}`)
      router.loadPage()
    })
  }
}
