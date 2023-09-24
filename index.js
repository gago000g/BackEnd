// Connection dependency
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const handleValidationErrors = require('./utils/handleValidationErrors')

// Data validation for registration
const validation = require('./validations/validation');
// Life check jwt token
const checkAuth = require('./utils/checkAuth')

// Controllers for processing requests
const controllersUser = require('./controllers/UserController')
const controllersPost = require('./controllers/PostController')


// Initialization express and json
const app = express();
app.use(express.json())


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.post('/auth/register', validation.registerValidation, handleValidationErrors, controllersUser.register)
app.post('/auth/login', validation.loginValidation, handleValidationErrors, controllersUser.login)
app.get('/auth/me', checkAuth, controllersUser.checkMe)

app.get('/posts', controllersPost.getAll);
app.get('/posts/:id', controllersPost.getOne);
app.post('/posts', checkAuth, validation.postCreateValidation, handleValidationErrors, controllersPost.create);
app.delete('/posts/:id', checkAuth, controllersPost.remove);
app.patch('/posts/:id', checkAuth, validation.postCreateValidation, handleValidationErrors, controllersPost.update);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.use('/uploads', express.static('uploads'))




const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://gago000g:nuttertools8@cloud.lhq4nni.mongodb.net/?retryWrites=true&w=majority')
        app.listen(4444, () => console.log('Server Ok'))
    } catch (error) {
        console.log('Error: --> ' + error)
    }
}

start()





