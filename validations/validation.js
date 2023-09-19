const { body } = require('express-validator')


const loginValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('pass', 'Пароль має мати мінімум 5 символів').isLength({ min: 5 })
];
module.exports.loginValidation = loginValidation 

const registerValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('pass', 'Пароль має мати мінімум 5 символів').isLength({ min: 5 }),
    body('fullName', 'Імя має бути неманьше 2 смволів').isLength({ min: 3 }),
    body('avatarUrl', 'Невірне посилання на аватарку').optional().isURL()
];
module.exports.registerValidation = registerValidation 

const postCreateValidation = [
    body('title', 'Вкажіть заговолок статті').isLength({ min: 3 }).isString(),
    body('text', 'Вкажіть текст статті').isLength({ min: 10 }).isString(),
    body('tags', 'Невірний формат тегів').optional().isString(),
    body('imageUrl', 'Невірне посилання на зображення').optional().isString()
];
module.exports.postCreateValidation = postCreateValidation 