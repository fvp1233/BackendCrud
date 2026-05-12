import express from "express";
import subjectsController from "../controllers/subjectsController.js";

const router = express.Router();

router.route("/").get(subjectsController.getSubjects).post(subjectsController.insertHomework);
router.route("/:id").put(subjectsController.updateSubject).delete(subjectsController.deleteSubject) ;

export default router