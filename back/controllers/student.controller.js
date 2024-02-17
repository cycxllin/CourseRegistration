import { increaseStudentEnrolled, decreaseStudentEnrolled, getCourseByIdFromRepo, getCoursesByListFromRepo } from "../repositories/course.repository.js";
import { getAllStudentsFromRepo, getStudentByIdFromRepo, getEnrolledCoursesFromRepo,
    enrollStudentinRepo, unenrollStudentinRepo } from "../repositories/student.repository.js"
import { checkCourseConflict, checkCourseIsFull } from "../services/services.js"

export const getAllStudentsListNameId = async (req, res, next) => {
    try {
        const students = await getAllStudentsFromRepo();
    
        res.status(200).json({
            status: 200,
            message: 'retrieved all students sucessfully',
            data: students
        });
        
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getStudentById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const student = await getStudentByIdFromRepo(id);

        if (student) {
            return res.status(200).json({
                status: 200,
                message: 'retrieved student sucessfully',
                data: student
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No student with id ${id} found`,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const enrollStudent = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const courseId = Number(req.params.cid);
        const course = await getCourseByIdFromRepo(courseId);

        //check if student is already enrolled
        const enrolledCourses = await getEnrolledCoursesFromRepo(id);
        if (enrolledCourses.includes(courseId)){
            return res.status(400).json({
                status: 400,
                message: `Student ${id} is already enrolled in course ${courseId}`,
            });
        }

        // check if course is full
        const courseFull = checkCourseIsFull(course);
        console.log(courseFull);
        if (courseFull){
            return res.status(412).json({
                status: 412,
                message: `Course ${courseId} is full`
            });
        }

        //check for time conflict
        const courses = await getCoursesByListFromRepo(enrolledCourses);
        const conflict = checkCourseConflict(course, courses);
        if (conflict) {
            return res.status(409).json({
                status: 409,
                message: `Course ${courseId} conflicts with an enrolled course`
            });
        };

        // checks passed so proceed with enrollment
        const student = await enrollStudentinRepo(id, courseId);
        if (student) {
            // update number of students in course
            const result = increaseStudentEnrolled(courseId);

            // if update fails, rollback cahnges
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: `sucessfully enrolled student ${id} in course ${courseId}`,
                    data: student
                });
            } else {
                unenrollStudentinRepo(id, courseId);

                return res.status(400).json({
                    status: 400,
                    message: `Enrollment of student ${id} in course ${courseId} failed`,
                });
            }

        } else {
            return res.status(404).json({
                status: 404,
                message: `No student with id ${id} found`,
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const unenrollStudent = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        var courseId = Number(req.params.cid);

        //check if student is enrolled
        const enrolledCourses = await getEnrolledCoursesFromRepo(id);

        if (!enrolledCourses.includes(courseId)){
            return res.status(400).json({
                status: 400,
                message: `Student ${id} is not enrolled in course ${courseId}`,
            });
        }

        const student = await unenrollStudentinRepo(id, courseId);

        //if unenrollment passed, update course enrollment number
        if (student) {
            const result = decreaseStudentEnrolled(courseId);
            
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: `sucessfully unenrolled student ${id} from course ${courseId}`,
                    data: student
                });
            } else {
                // rollback unenrollment because increase failed
                enrollStudentinRepo(id, courseId);

                return res.status(400).json({
                    status: 400,
                    message: `Unenrollment of student ${id} from course ${courseId} failed`,
                });
            }
        } else {
            return res.status(404).json({
                status: 404,
                message: `No student with id ${id} found`,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

