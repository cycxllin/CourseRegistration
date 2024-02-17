import express from "express";
import { getAllCourses, getCourseById, getCoursesByList} from "../controllers/course.controller.js";

const router = express.Router();

router.get('/', getAllCourses);
router.get("/list", getCoursesByList);
router.get("/:id", getCourseById);

export default router;