const Post = require('../models/post');

module.exports = {
    // Posts index
    async getPosts(req, res, next) {
        let posts = await Post.find({});
        res.render('posts/index', { posts });
    },
    // Posts new
    newPost(req, res, next) {
        res.render('posts/new');
    },
    //Posts create
    async createPost(req, res, next) {
        let post = await Post.create(req.body);
        res.redirect(`/posts/${post.id}`);
    },
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id);
        res.render('posts/show', { post });
    }
}