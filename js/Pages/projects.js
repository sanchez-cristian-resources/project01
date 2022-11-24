import { fetchProjects } from '../APIs/fetchProjects.js'
import Router from '../Router/router.js'

export async function selectRandomProject () {
  const router = new Router()

  const projects = await fetchProjects()

  const random = projects[Math.floor((Math.random() * projects.length))]

  window.history.pushState({}, '', `/projects/${random.id}`)
  router.loadPage()
}
