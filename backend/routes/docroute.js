const express = require("express")
const { getalldoc, getsingledoc, createdoc, updatedoc, deletedoc } = require("../controllers/doccontroller")
const { authmiddleware } = require("../middleware/authmiddleware")
const uploads = require("../middleware/multer")
const router = express.Router()

router.get("/",authmiddleware,getalldoc)
router.get("/:id",authmiddleware,getsingledoc)
router.post("/",authmiddleware , uploads.single("coverimg"),createdoc)
router.put("/:id",authmiddleware,updatedoc)
router.delete("/:id",authmiddleware,deletedoc)



module.exports = router