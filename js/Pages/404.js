import Router from "../Router/router.js"

export function goBack() {
    const router = new Router()

    const button = document.querySelector('#goBackButton')
    console.log(button)
    button.addEventListener('click', () => {
        console.log('f')
        window.history.pushState({}, '', '/')
        router.loadPage()
    })
}