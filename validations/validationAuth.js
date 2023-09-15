const { body } = require('express-validator')

const registerValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('pass', 'Пароль має мати мінімум 5 символів').isLength({ min: 5 }),
    body('fullName', 'Імя має бути неманьше 2 смволів').isLength({ min: 3 }),
    body('avatarUrl', 'Невірне посилання на аватарку').optional().isURL()
];

module.exports = { registerValidation }