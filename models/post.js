const mongoose = require("mongoose");
const moment = require("moment");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
moment.locale("ru");

const PostSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, default: "http://placehold.it/900x300" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        user: { type: String, default: "Аноним" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }],
    views: [String],
});

PostSchema.plugin(mongoosePaginate);

PostSchema.statics.getNews = async function(page, limit = 5) {
    let news = await this.paginate({}, {
        select: "-comments -views",
        sort: "-createdAt",
        populate: "author",
        limit,
        page,
    });

    news.docs = news.docs.map((post) => normalizeDate(post.toObject()));
    return news;
}

PostSchema.statics.getPostById = async function(id) {
    let post = await this
        .findById(id)
        .populate("author");

    post = normalizeDate(post.toObject());
    post.comments = post.comments.map(normalizeDate);
    return post;
}

function normalizeDate(data) {
    let { createdAt } = data;
    createdAt = moment(createdAt).format('LLL');
    return Object.assign({}, data, { createdAt });
}

module.exports = mongoose.model("Post", PostSchema);