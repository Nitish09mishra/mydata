const socket = io()

//Elements
const messageForm = document.querySelector('#msg_form')
const messageFormInput = messageForm.querySelector('input')
const messageFormButton = messageForm.querySelector('button')
const sendLocationbutton = document.querySelector('#share_location')
const messages = document.querySelector('#messages')

//templates....
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message
    })
    messages.insertAdjacentHTML('beforeend', html)
})


messageForm.addEventListener("submit",(event) =>{
    event.preventDefault()

    //disable button
    messageFormButton.setAttribute('disabled', 'disabled')

    const message = event.target.elements.my_msg.value   //event.target is pointing to the form
    
    socket.emit('send_msg', message, (error) => {

        //enable button
        messageFormButton.removeAttribute('disabled')
        messageFormInput.value = ''
        messageFormInput.focus()

        if(error) {
            return console.log(error)
        }
        console.log('Message Delivered')
    })
})


sendLocationbutton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation location not supported by your browser.')
    }
    //disablin button
    sendLocationbutton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            sendLocationbutton.removeAttribute('disabled')
            console.log(message)
        })
    })
})