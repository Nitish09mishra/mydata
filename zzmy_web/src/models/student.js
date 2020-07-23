const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt') 

const studentSchema = new mongoose.Schema({
    // name: String,
    // email: String,
    // age: Number,
    // gender: String,
    // password: String
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        validate(value){
            if(value < 11){
                throw new Error('Age must be greater than 10 ')
            }
        }
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot equals to password')
            }
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


// defining middlewares
studentSchema.pre('save',async function(next) {
    const student = this
    student.password = await bcrypt.hash(student.password, 8)

    next()
})

// for loggign in the user...
studentSchema.statics.findByCredentials = async (email, password) => {
    const student = await Student.findOne({ email })
    if(!student) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, student.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return student
}


const Student = mongoose.model('Student', studentSchema)
module.exports = Student