import { createContext } from '../Context/Context.js'
import Router from '../Router/router.js'

const [projects, setProjects] = createContext([])

export async function fetchProjects () {
  const router = new Router()
  await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
    .then(data => data.json())
    .then(data => {
      setProjects(data)
      console.log('he hecho fethc de ', data)
    })

  // add a comparable element like time => in milliseconds
  const datedProjects = [...projects()].map((project) => {
    const date = new Date(project.completed_on)
    const id = project.name
      .replace(' ', '-')
      .toLowerCase()
    return { ...project, milliseconds: date.getTime(), id }
  })

  // order the projects by the milliseconds
  const oProjects = datedProjects.sort((a, b) => b.milliseconds - a.milliseconds)

  console.log(oProjects)

  let cards = ''
  for (let i = 0; i < 3; i++) {
    cards += `
      <div id="${oProjects[i].id}" class="card">
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
  for (let i = 0; i < 3; i++) {
    document.querySelector(`#${oProjects[i].id}`).addEventListener('click', (e) => {
      window.history.pushState({}, '', `./projects/${oProjects[i].id}`)
      router.loadPage()
    })
  }
}
