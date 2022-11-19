const exportNavbar = (page) => {
    page === 'projects' ? console.log('index'): console.log('not')

  const navbar = `
    <nav>
    <a href="./index.html">
      <img src="../assets/logos/circle.svg"/>
    </a>
    <ul>
      <li>
        <a href="../html/index.html" class="${page === 'index' ? 'selected' : 'not-selected'}">Home</a>
      </li>
      <li>
        <a href="../html/projects.html" class="${page === 'projects' ? 'selected' : 'not-selected'}">Projects</a>
      </li>
      <li>
        <a href="../html/services.html"class="${page === 'services' ? 'selected' : 'not-selected'}">Services</a>
      </li>
    </ul>
    <button>Contact us</button>
    </nav>
  `
  document.querySelector('#root').innerHTML = navbar
}

window.addEventListener('load', (e) => {
  e.preventDefault()
  const path = window.location.pathname.split('/')
  const page = path[path.length-1].split('.')
  exportNavbar(page[0])
})