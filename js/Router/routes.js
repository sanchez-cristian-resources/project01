import { renderProjects } from '../Pages/home.js'
import { renderOtherProjects } from '../Pages/_project.js'
import { selectRandomProject } from '../Pages/projects.js'
import { formValidation } from '../Pages/contact.js'
import { goBack } from '../Pages/404.js'

const prefix = 'Circle: '
const sufix = 'Circle '

export const routes = {
  '/': {
    component: '../pages/home.html',
    style: '../css/pages/home.css',
    title: `${prefix}Software design and  development`,
    description: `
      Circle is a digital design and development studio.
      We design and develop astonishing websites 
      and mobile apps.
    `,
    options: [
      renderProjects
    ],
    childs: []
  },
  '/projects': {
    component: '../pages/projects.html',
    style: '../css/pages/projects.css',
    title: `${prefix}Contact with us`,
    description: `
      Circle is a digital design and development studio.
      Fill the form and in a short time we will be in contact with you.
    `,
    options: [
      selectRandomProject
    ],
    childs: [ // this will be modified in the future
      {
        simplify: {
          component: '../pages/_project.html',
          style: '../css/pages/_project.css',
          title: `Simplify - ${sufix}`,
          description: `
            Circle is a digital design and development studio.
            Fill the form and in a short time we will be in contact with you.
          `,
          options: [
            renderOtherProjects
          ],
          childs: []
        }
      },
      {
        vectorify: {
          component: '../pages/_project.html',
          style: '../css/pages/_project.css',
          title: `Vectorifys - ${sufix}`,
          description: `
            Circle is a digital design and development studio.
            Fill the form and in a short time we will be in contact with you.
          `,
          options: [
            renderOtherProjects
          ],
          childs: []
        }
      },
      {
        'lorem-ipsum': {
          component: '../pages/_project.html',
          style: '../css/pages/_project.css',
          title: `Lorem-Ipsum - ${sufix}`,
          description: `
            Circle is a digital design and development studio.
            Fill the form and in a short time we will be in contact with you.
          `,
          options: [
            renderOtherProjects
          ],
          childs: []
        }
      },
      {
        dashcoin: {
          component: '../pages/_project.html',
          style: '../css/pages/_project.css',
          title: `Dashcoin - ${sufix}`,
          description: `
            Circle is a digital design and development studio.
            Fill the form and in a short time we will be in contact with you.
          `,
          options: [
            renderOtherProjects
          ],
          childs: []
        }
      }
    ]
  },
  '/contact': {
    component: '../pages/contact.html',
    style: '../css/pages/contact.css',
    title: `${prefix}Contact with us`,
    description: `
        Circle is a digital design and development studio.
        Fill the form and in a short time we will be in contact with you.
    `,
    options: [
      formValidation
    ],
    childs: []
  },
  '/404': {
    component: '../pages/404.html',
    style: '../css/pages/404.css',
    title: `${prefix}404 Page not found`,
    description: `
        Here in circle server, we don't have any result. You're 
        going to need more lucky the next time. 
        May the force be with you.
    `,
    options: [
        goBack
    ],
    childs: []
  }
}
