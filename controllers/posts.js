const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dftavv1d6',
    api_key: '972658173881391',
    api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
    // Posts index
    async postIndex(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    // Posts new
    postNew(req, res, next) {
        res.render('posts/new');
    },
    //Posts create
    async postCreate(req, res, next) {
        req.body.post.images = [];
        for (let file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);
            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public
            });
        }
        let post = await Post.create(req.body.post);
        res.redirect(`/posts/${post.id}`);
    },

    //Posts show
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    },
    //Posts edit
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/edit', { post });
    },
    //Posts update
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);
        res.redirect(`/posts/${post.id}`);
    },
    // Posts destroy
    async postDestroy(req, res, next) {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.redirect('/posts');
    }
}
