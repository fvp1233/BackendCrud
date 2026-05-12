import express from "express";
import studentController from "../controllers/StudentsController.js";

const router = express.Router();

router.route("/").get(studentController.getStudents);
router.route("/:id").get(studentController.updateStudent).delete(studentController.deleteStudent) ;

export default router
