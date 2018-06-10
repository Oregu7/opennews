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

PostSchema.statics.getNews = async function() {
    let news = await this
        .find({})
        .select("-comments -views")
        .sort("-createdAt")
        .populate("author");

    return news.map((post) => {
        let { createdAt } = post;
        createdAt = moment(createdAt).format('LLL');
        return Object.assign({}, post.toObject(), { createdAt });
    });
}

module.exports = mongoose.model("Post", PostSchema);