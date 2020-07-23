const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/std-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected !!!')
})