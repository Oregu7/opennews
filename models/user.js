const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    name: { type: String, default: "Аноним" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);