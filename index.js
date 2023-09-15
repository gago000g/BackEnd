const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/User')

const { validationResult } = require('express-validator')
const { registerValidation } = require('./validations/validationAuth');

const app = express();

app.use(express.json())



app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const salt = await bcrypt.genSalt(10)
        const pHash = await bcrypt.hash(req.body.pass, salt)

        const doc = new User({

            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: pHash,
            avatarUrl: req.body.avatarUrl
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretkey8', 
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невділося зареєструватися"
        })
    }
})

app.post('/auth/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return req.status(404).json({
                message: 'Користувач не знайдений'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.pass, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(404).json({
                message: 'Невірний емайл чи пароль'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secretkey8', 
            {
                expiresIn: '30d'
            }
        )

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невділося увійти"
        })
    }
})

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gago000g:nuttertools8@cloud.lhq4nni.mongodb.net/testUsers?retryWrites=true&w=majority')
        app.listen(4444, () => console.log('Server Ok'))
    } catch (error) {
        console.log('Error: --> ' + error)
    }
}
start()







