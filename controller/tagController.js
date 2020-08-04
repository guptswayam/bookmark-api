let TagModel= require("./../model/tagModel");
let BookmarkModel= require("./../model/bookmarkModel");

exports.createTag= async (req,res,next)=>{
    try {
        let reqBody=req.body;
        reqBody.timeCreated= Date.now();
        reqBody.timeUpdated= Date.now();

        let tag= await TagModel.create(reqBody);

        res.status(201).json({
            status: "success",
            data: tag
        })   
    } catch (error) {
        res.status(403).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getTags=async (req,res,next)=>{
    try {
        let tags= await TagModel.find();

        res.status(200).json({
            status: "success",
            data: tags
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getTagsWithBookmarks=async (req,res,next)=>{
    try {
        let tags= await TagModel.find().populate({
            path: "bookmarks",
        });

        res.status(200).json({
            status: "success",
            data: tags
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}

exports.removeTag= async (req,res,next)=>{
    try {
        
        let removedTag= await TagModel.findByIdAndDelete(req.params.tagId);
        for(let i=0;i<removedTag.bookmarks.length;i++){
            await BookmarkModel.findByIdAndUpdate(removedTag.bookmarks[i],{$pull : {tags: removedTag._id}});
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