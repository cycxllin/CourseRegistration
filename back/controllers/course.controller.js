import { getAllCoursesFromRepo, getCourseByIdFromRepo, getCoursesByListFromRepo } 
    from "../repositories/course.repository.js";

export const getAllCourses = async (req, res, next) => {
    try {
        const allCourses = await getAllCoursesFromRepo();
        
        res.status(200).json({
            status: 200,
            message: 'retrieved all courses sucessfully',
            data: allCourses
        });
        
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getCoursesByList = async (req, res, next) => {
    try {
        const idsString = req.query.ids;
        const ids = idsString.split(",");
        
        const courses = await getCoursesByListFromRepo(ids);

        res.status(200).json({
            status: 200,
            message: 'retrieved course list sucessfully',
            data: courses
        });
        
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const course = await getCourseByIdFromRepo(id);

        if (course) {
            return res.status(200).json({
                status: 200,
                message: `retrieved course ${id} sucessfully`,
                data: course
            });
        } else {
            return res.status(404).json({
                status: 404,
                message: `No course with id ${id} found`,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};
