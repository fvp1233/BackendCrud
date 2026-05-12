import express from "express";
import categoryController from "../controllers/categoriesController.js";

const router = express.Router();

router.route("/").get(categoryController.getCategories).post(categoryController.insertCategory);
router.route("/:id").put(categoryController.updateCategory).delete(categoryController.deleteCategory) ;

export default router