const { Router } = require('express');
const { UserModel, PostModel } = require("../models");
const { paginator } = require("../helpers");
const router = Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    const news = await PostModel.getNews(1);
    return res.render('index', {
        title: "Открытые новости",
        pager: paginator(news),
        news
    });
});

router.get("/page/:number", async(req, res) => {
    const { number } = req.params;
    const news = await PostModel.getNews(Number(number));
    return res.render('index', {
        title: "Открытые новости",
        pager: paginator(news),
        news
    });
});

router.get("/post/add", (req, res) => {
    return res.render("addPost", { title: "Добавить пост", success: false });
});

router.post("/post/add", async(req, res) => {
    const { title, author, image, text } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const user = await UserModel.create({ name: author, ip });
    const post = await PostModel.create({
        author: user._id,
        title,
        description: text,
        imageURL: image,
    });
    return res.render("addPost", { title: "Добавить пост", success: true });
});

router.get("/post/:id", async(req, res) => {
    const { id: postId } = req.params;
    const post = await PostModel.getPostById(postId);
    return res.render("post", {
        title: post.title,
        post
    });
});


router.post("/post/:id", async(req, res) => {
    const { id: postId } = req.params;
    const { comment } = req.body;
    await PostModel.update({ _id: postId }, { $push: { comments: { text: comment } } });

    const post = await PostModel.getPostById(postId);
    return res.render("post", {
        title: post.title,
        post
    });
});

module.exports = router;