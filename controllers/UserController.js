const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')




const register = async (req, res) => {
    try {
        

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

        const { passwordHash, ...userData } = user._doc;

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
}
module.exports.register = register

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return req.status(404).json({
                message: 'Користувач не знайдений'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.pass, user._doc.passwordHash)

        if (!isValidPass) {
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

        const { passwordHash, ...userData } = user._doc;

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
}
module.exports.login = login

const checkMe = async (req, res) => {
    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: 'User don`t exist'
            })
        }
        const { passwordHash, ...userData } = user._doc;

        

        res.json({
            ...userData
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невділося"
        })
    }
}
module.exports.checkMe = checkMe

