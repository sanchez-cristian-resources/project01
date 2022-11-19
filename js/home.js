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


