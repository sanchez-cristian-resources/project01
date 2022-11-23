import { createContext } from './Context.js'

export async function fetchProjects () {
  const [projects, setProjects] = createContext([])
  await fetch('https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects')
    .then(data => data.json())
    .then(data => setProjects(data))

  // add a comparable element like time => in milliseconds
  const datedProjects = [...projects()].map((project) => {
    const date = new Date(project.completed_on)
    const id = project.name
      .replace(' ', '-')
      .toLowerCase()
    return { ...project, milliseconds: date.getTime(), id }
  })

  // order the projects by the milliseconds
  setProjects(datedProjects.sort((a, b) => b.milliseconds - a.milliseconds))

  return projects()
}
