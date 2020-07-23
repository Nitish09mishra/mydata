const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()

//vaise ye behind the scenes hota hai
//  but abhi isko ek variable(server) main dala hai taki uska use kr sake
const server = http.createServer(app) 

const io = socketio(server)   //to use server here, we have refactored out server to http server

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

   
io.on('connection', (socket) => {
    console.log('new websocket connection')

    socket.emit('message', 'welcome!')
    socket.broadcast.emit('message', 'a new user joined...') 

    // for sharing messages.....
    socket.on('send_msg', (message, my_callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)) {
            return my_callback('Profanity is not allowed')
        }

        io.emit('message', message)
        my_callback()
    }) 
    //for sharing location....
    socket.on('location', (coords, my_callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        my_callback('Location Shared succssfully.')
    })

    socket.on('disconnet', () => {
        io.emit('message', 'A user has left...')
    })
})


server.listen(3000, () => {
    console.log('server is running on port 3000')
})