const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose') 
const UserModel = require('./models/User')

const {validationResult} = require('express-validator')
const {registerValidation} = require('./validations/validationAuth');

const app = express();

app.use(express.json())



app.post('/auth/register', registerValidation , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    res.json({
        success: true,
    })
})


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gago000g:nuttertools8@cloud.lhq4nni.mongodb.net/?retryWrites=true&w=majority')
        app.listen(4444, () => console.log('Server Ok'))
    } catch (error) {
        console.log('Error: --> ' + error)
    }
}
start()







