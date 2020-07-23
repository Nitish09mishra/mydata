console.log('its working!!!')

// selecting elements...
const body = document.querySelector('body')
// const email = document.querySelector('input')
const user_name = document.querySelector('user_name')


body.addEventListener('onload', (event) => {
    event.preventDefault()

    fetch('/').then((response) =>{
        response.json().then((data) => {
            if(data.err){
                user_name.textContent = data.err
            }
            else{
                user_name.textContent = data.name               
            }
        })
    })
})