const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(({ error, location, forecast}) => {
            if (error) {
                console.log(error)
                messageOne.textContent=error
            } else {
                console.log(location, forecast)
                messageOne.textContent=location
                messageTwo.textContent=forecast
            }
            
        })
    })

    console.log(location)
})