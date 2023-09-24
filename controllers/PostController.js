const { param } = require('express-validator')
const Post = require('../models/Post')

const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })
        const post = await doc.save()
        res.json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невдалося створити статтю"
        })
    }
}
module.exports.create = create

const getAll = async (req, res) => {
    try {
        const posts = await Post.find().populate('user').exec()

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невдалося отримати статтю"
        })
    }
}
module.exports.getAll = getAll

const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        Post.findOneAndUpdate(
            {
                _id: postId
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            }
        ).then(doc => {
            
            if (!doc) {
                return res.status(404).json({
                    message: 'Статтю не знайдено'
                })
            }
            res.json(doc)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невдалося отримати "
        })
    }
}
module.exports.getOne = getOne

const remove = async (req, res) => {
    try {
        const postId = req.params.id

        Post.findOneAndDelete({

            _id: postId
        }).then( doc => {

            if(!doc) {
                return res.status(404).json({
                    message: 'Статтю не знайдено'
                })
            }

            res.json({
                success: true
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невдалося отримати "
        })
    }
}
module.exports.remove = remove

const update = async (req, res) => {
    try {
        const postId = req.params.id

        await Post.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId
            }
        )

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Невдалося обновити статтю "
        })
    }
}
module.exports.update = update