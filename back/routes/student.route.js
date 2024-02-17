import express from "express";
import { getAllStudentsListNameId, getStudentById, enrollStudent, unenrollStudent } 
    from "../controllers/student.controller.js";

const router = express.Router();

router.get('/', getAllStudentsListNameId);
router.get("/:id", getStudentById);
router.patch('/:id/enroll/:cid', enrollStudent);
router.patch('/:id/unenroll/:cid', unenrollStudent);

export default router;