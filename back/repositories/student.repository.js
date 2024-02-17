import Student from "../models/student.model.js"

export const getAllStudentsFromRepo = async () => {
    try {
        const students = await Student.find({}, {'_id':0, 'id':1, 'name':1});
        return students;
    } catch (error) {
        throw Error("Error while retrieving all students");
    }
};

export const getStudentByIdFromRepo = async (id) => {
    try {
        const student = await Student.findOne({id:id});
        return student;
    } catch (error) {
        throw Error(`Error while retrieving student ${id}`);
    }
};

export const getEnrolledCoursesFromRepo = async (id) => {
    try {
        const courses = await Student.findOne({id:id}, {'coursesEnrolled':1, '_id':0});
        return courses.coursesEnrolled;
    } catch (error) {
        throw Error(`Error while retrieving student's ${id} courses`);
    }
};

// adds given course id to enrolledCourses list
export const enrollStudentinRepo = async (id, courseId) => {
    try {
        const courses = await Student.findOneAndUpdate({id:id}, 
            {$addToSet: {coursesEnrolled: courseId}}, {new: true});
        return courses;
    } catch (error) {
        throw Error(`Error while enrolling student ${id} in course ${courseId}`);
    }
};

// removes given course id to enrolledCourses list
export const unenrollStudentinRepo = async (id, courseId) => {
    try {
        const courses = await Student.findOneAndUpdate({id:id}, 
            {$pull: {coursesEnrolled: courseId}}, {new: true});
        return courses;
    } catch (error) {
        throw Error(`Error while un-enrolling student ${id} from course ${courseId}`);
    }
};