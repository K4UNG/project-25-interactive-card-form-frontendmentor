const form = document.getElementById('form')
const inputs = document.querySelectorAll('.form input')

const number = document.getElementById('card__number')
const name = document.getElementById('card__name')
const month = document.getElementById('card__month')
const year = document.getElementById('card__year')
const cvc = document.getElementById('card__cvc')

let errors = [1, 1, 1, 1, 1]

form.onsubmit = e => {
    e.preventDefault()
}

inputs.forEach(input => {
    input.onkeypress = e => {
        const key = e.key
        if ((key === 'e' || key === '-' || key === '+' || key === '_' || key === '=') && input.name !== 'name') e.preventDefault()
    }
    input.addEventListener('keyup', () => {
        const type = input.name
        if (type === 'name') {
            if (input.value.trim()) {
                name.textContent = input.value.trim().toUpperCase()
                errors[0] = 0
            } else {
                name.textContent = 'JANE APPLESEED'
                errors[0] = 1
            }
        } else if (type === 'number') {
            const value = input.value.trim().replace(/\s/g, '')
            const x = Number(value)
            if (x === 0) {
                errors[1] = 1
            } else if (x != x) {
                errors[1] = 2
            } else if (value.length < 16) {
                errors[1] = 3
            } else { 
                errors[1] = 0
            }
            if (value.length > 16) {
                input.value = input.value.slice(0, 16)
                return
            }
            let num = '0'.repeat(16-value.length) + value
            number.textContent = `${num.slice(0, 4)} ${num.slice(4, 8)} ${num.slice(8, 12)} ${num.slice(12, 16)}`
        } else if (type === 'cvc') {
            const x = Number(input.value.trim());
            if (x === 0) {
                errors[4] = 1
            } else if (x != x || x < 100) {
                errors[4] = 2
            } else {
                errors[4] = 0
            }
            let value = x || '0'
            value = value.toString()
            const length = value.length
            if (length === 4) {
                cvc.textContent = value
                return
            } else if (length > 4) {
                input.value = value.slice(0, 4)
                return
            }
            cvc.textContent = '0'.repeat(3-length) + value
        } else if (type === 'month' || type === 'year') {
            const value = input.value.trim()
            if (value.length > 2) {
                input.value = value.slice(0,2)
                return
            }
            if (type === 'month') {
                month.textContent = '0'.repeat(2-value.length) + value
            } else {
                year.textContent = '0'.repeat(2-value.length) + value
            }
            const x = Number(value)
            const i = type === 'month' ? 2 : 3
            if (x === 0) {
                errors[i] = 1
            } else if (x != x || x < 0 || (i === 2 && x > 12)) {
                errors[i] = 2
            } else {
                errors[i] = 0
            }
        }
    })
})