const { Router } = require('express');
const { UserModel, PostModel } = require("../models");
const router = Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    const news = await PostModel.getNews();
    res.render('index', { news });
});

router.get("/post", (req, res) => {
    return res.render('post');
});

router.get("/cr_author", async(req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const user = await UserModel.create({ name: "Baam Greenvald", ip });
    res.send(`ok => ${user._id}`);
});

router.get("/cr_post", async(req, res) => {
    const authorId = "5b1d7d2f5c1eb1336475e1f1";
    const post = await PostModel.create({
        author: authorId,
        title: "",
        description: ``,
        imageURL: "",
    });
    res.send(`ok => ${post._id}`);
});

module.exports = router;