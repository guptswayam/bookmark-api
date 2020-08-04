let express= require("express");
let router= express.Router();
let tagController= require("./../controller/tagController");

router.post("/create_tag", tagController.createTag);
router.get("/get_tags",tagController.getTags);
router.get("/get_tags_with_nested_bookmarks", tagController.getTagsWithBookmarks);
router.delete("/delete_tag/:tagId", tagController.removeTag);

module.exports= router;