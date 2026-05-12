import express from "express";
import homeworkController from "../controllers/homerworks.js";

const router = express.Router();

router.route("/").get(homeworkController.getHomeworks).post(homeworkController.insertHomework);
router.route("/:id").put(homeworkController.updateHomework).delete(homeworkController.deleteHomework) ;

export default router