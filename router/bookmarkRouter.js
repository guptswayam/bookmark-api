let express= require("express");
let router= express.Router();
let bookmarkController= require("./../controller/bookmarkController");

router.post("/create_bookmark", bookmarkController.addBookmark);
router.get("/get_bookmarks", bookmarkController.getBookmarks);
router.delete("/delete_bookmark/:bookmarkId", bookmarkController.deleteBookmark);
router.patch("/add_tag_to_bookmark/:bookmarkId", bookmarkController.addTagToBookmark);
router.patch("/remove_tag_from_bookmark/:bookmarkId", bookmarkController.removeTagFromBookmark);

module.exports= router;