const express = require("express")
const router = express.Router()
const isAdmin = require("../middlewares/isAdmin")
const {createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct} =  require("../controllers/products")


router.post("/createProduct",  createProduct)
router.get("/getAllProduct", getAllProduct)
router.get("/getSingleProduct/:id", getSingleProduct)
router.put("/updateProduct/:id", isAdmin, updateProduct); 
router.delete("/deleteProduct/:id", isAdmin, deleteProduct); 

module.exports = router