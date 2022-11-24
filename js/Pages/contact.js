
export function formValidation () {
  const submitButton = document.querySelector('#submit-button')
  const fullName = document.querySelector('#name-input')
  const email = document.querySelector('#email-input')
  const tel = document.querySelector('#tel-input')

  submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (fullName.value === 'ironhack') {
      alert('You cannot be Ironhack, because I am Ironhack.') //eslint-disable-line
      fullName.style.boxShadow = 'inset 0px 0px 0px 2px #d42828'
      fullName.style.color = '#d42828'
    }

    if (fullName.value === '') {
      fullName.style.boxShadow = 'inset 0px 0px 0px 2px #d42828'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.exec(email.value)) {
      email.style.boxShadow = 'inset 0px 0px 0px 2px #d42828'
      email.style.color = '#d42828'
      email.value = 'example@example.com'
    }

    if (!/[+][\d]+[\s][\d]+/.exec(tel.value)) {
      tel.style.boxShadow = 'inset 0px 0px 0px 2px #d42828'
      tel.style.color = '#d42828'
      tel.value = '[+34]  [609324726]'
    }
  })

  email.addEventListener('focus', () => {
    email.style.boxShadow = 'inset 0px 0px 0px 2px var(--primary)'
    email.style.color = 'var(--primary)'
  })

  email.addEventListener('blur', () => {
    email.style.boxShadow = ''
  })

  tel.addEventListener('focus', () => {
    tel.style.boxShadow = 'inset 0px 0px 0px 2px var(--primary)'
    tel.style.color = 'var(--primary)'
  })

  tel.addEventListener('blur', () => {
    tel.style.boxShadow = ''
  })

  fullName.addEventListener('focus', () => {
    fullName.style.boxShadow = 'inset 0px 0px 0px 2px var(--primary)'
    fullName.style.color = 'var(--primary)'
  })

  fullName.addEventListener('blur', () => {
    fullName.style.boxShadow = ''
  })
}
