let mongoose= require("mongoose");
const { set } = require("../app");

let tagSchema= mongoose.Schema({
    title: {
        type: String,
        required: [true, "A tag must have a title"],
        unique: [true, "A tag title must be unique"],
        trim: true,
        set: value=>value.toLowerCase()
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    },
    bookmarks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Bookmark"
        }
    ]
});

let tagmodel= mongoose.model("Tag", tagSchema);


module.exports= tagmodel;