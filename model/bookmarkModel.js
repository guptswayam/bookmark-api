let mongoose= require("mongoose");

let bookmarkSchema= mongoose.Schema({
    link: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "A bookmark must have a link"]
    },
    title: {
        type: String,
        trim: true,
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    },
    timeUpdated: {
        type: Date,
        default: Date.now()
    },
    publisher: {
        type: String,
        trim: true
    },
    tags: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Tag"
            }
        ],
})

let bookmarkModel= mongoose.model("Bookmark", bookmarkSchema);

module.exports= bookmarkModel;