let BookmarkModel= require("./../model/bookmarkModel");
let TagModel= require("./../model/tagModel");

exports.addBookmark= async (req,res,next)=>{

    try {

        let reqBody=req.body;
        reqBody.timeCreated= Date.now();
        reqBody.timeUpdated= Date.now();
        let tagsArr=reqBody.tags;
        reqBody.tags=undefined;


        let bookmark= await BookmarkModel.create(reqBody);

        let tagIds= [];

        if(tagsArr){
            for(let i=0;i<tagsArr.length;i++){
                let tag=await TagModel.findOneAndUpdate({title: tagsArr[i]},{$push: {bookmarks: bookmark._id}},{new : true});
                if(!tag){
                    tag= await TagModel.create({title: tagsArr[i], bookmarks: [bookmark._id]});
                }
                tagIds.push(tag._id);
            }
        }

        bookmark= await BookmarkModel.findByIdAndUpdate(bookmark._id,{$push: {tags: [...tagIds]}},{new: true});

        res.status(201).json({
            status: "success",
            data: bookmark
        })   
    } catch (error) {
        res.status(403).json({
            status: "fail",
            message: error.message
        })
    }

}

exports.getBookmarks= async (req,res,next)=>{
    try {
        let bookmarks= await BookmarkModel.find().populate({
            path: "tags",
        });
        res.status(200).json({
            status: "success",
            data: bookmarks
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.deleteBookmark= async (req,res,next)=>{
    try {
        let removedBookmark= await BookmarkModel.findByIdAndDelete(req.params.bookmarkId);
        for(let i=0;i<removedBookmark.tags.length;i++){
            await TagModel.findByIdAndUpdate(removedBookmark.tags[i],{$pull : {bookmarks: removedBookmark._id}});
        }
        res.status(200).json({
            status: "success"
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.addTagToBookmark= async (req,res,next)=>{
    try {
        let tag=await TagModel.findOneAndUpdate({title: req.body.tagName},{$push: {bookmarks: req.params.bookmarkId}},{new : true});
        if(!tag){
            tag= await TagModel.create({title: tagsArr[i], bookmarks: [bookmark._id]});
        }
        let bookmark= await BookmarkModel.findByIdAndUpdate(req.params.bookmarkId,{$push: {tags: tag._id}},{new: true});

        res.status(200).json({
            status: "success",
            data: bookmark
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.removeTagFromBookmark= async (req,res,next)=>{
    try {
        let tag= await TagModel.findOneAndUpdate({title: req.body.tagName},{$pull: {bookmarks: req.params.bookmarkId}},{new : true});
        if(!tag){
            throw new Error("Invalid tagName or bookmarkId");
        }
        let bookmark= await BookmarkModel.findByIdAndUpdate(req.params.bookmarkId,{$pull: {tags: tag._id}},{new: true});
        res.status(200).json({
            status: "success",
            data: bookmark
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}