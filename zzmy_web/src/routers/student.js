const express = require('express')
const Student = require('../models/student')

//setting up router...
const router = new express.Router()

router.post('/signup', async (req, res) => {
    
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        password: req.body.password
    })
    try {
        await student.save()
         res.redirect('/')  //, { msg: 'Hi' + req.body.name + 'you successfully registered' }
    } catch(err) {
        res.status(500).send(err)
    }
    
})

router.post('/', async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.email, req.body.password) 
        res.json(req.student)
        // console.log(student)
    } catch(err){
        res.redirect('/')
    }
    // res.json(req.body)
})

module.exports = router