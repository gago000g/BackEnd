// Connection dependency
const express = require('express')
const mongoose = require('mongoose')

// Data validation for registration
const validation = require('./validations/validation');
// Life check jwt token
const checkAuth = require('./utils/checkAuth')

//
const controllersUser = require('./controllers/UserController')
const controllersPost = require('./controllers/PostController')


// Initialization express and json
const app = express();
app.use(express.json())



app.post('/auth/register', validation.registerValidation, controllersUser.register)
app.post('/auth/login', validation.loginValidation, controllersUser.login)
app.get('/auth/me', checkAuth, controllersUser.checkMe)

// app.get('/posts', controllersPost.getAll);
// app.get('/posts/:id', controllersPost.getOne);
app.post('/posts', checkAuth, validation.postCreateValidation, controllersPost.create);
// app.delete('/posts', controllersPost.remove);
// app.patch('/posts', controllersPost.update);


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gago000g:nuttertools8@cloud.lhq4nni.mongodb.net/?retryWrites=true&w=majority')
        app.listen(4444, () => console.log('Server Ok'))
    } catch (error) {
        console.log('Error: --> ' + error)
    }
}

start()







