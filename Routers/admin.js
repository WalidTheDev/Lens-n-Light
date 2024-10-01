const express = require("express");
const {handleAddProduct ,} = require("./../Controllers/product");
const {handleadminLogin ,} = require("./../Controllers/admin")

const router = express.Router();

router.post("/addproduct" , handleAddProduct);
router.post("/login" , handleadminLogin)


module.exports = router ;

