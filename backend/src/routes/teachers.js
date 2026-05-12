import express from "express";
import teacherController from "../controllers/teachersController.js";

const router = express.Router();

router.route("/").get(teacherController.getTeachers);
router.route("/:id").get(teacherController.updateTeacher).delete(teacherController.deleteTeacher) ;

export default router