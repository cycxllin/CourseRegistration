import Course from "../models/course.models.js"

export const getNumberStudentsEnrolledInCourseFromRepo = async (cid) => {
    try {
        const courseLoad = await Course.findOne({id: cid}, {'EnrolledStudents':1, '_id':0});
        return courseLoad.EnrolledStudents;
    } catch (error) {
        throw Error(`Error while retrieving courseload for course ${id}`);
    }
};

export const increaseStudentEnrolled = async (cid) => {
    try {
        const courseLoad = await Course.updateOne({id: cid}, {$inc: {'EnrolledStudents': 1}});
        return courseLoad.modifiedCount === 1 ? true : false;
    } catch (error) {
        throw Error(`Error while retrieving courseload for course ${id}`);
    }
};

export const decreaseStudentEnrolled = async (cid) => {
    try {
        const courseLoad = await Course.updateOne({id: cid}, {$inc: {'EnrolledStudents': -1}});
        return courseLoad.modifiedCount === 1 ? true : false;
    } catch (error) {
        throw Error(`Error while retrieving courseload for course ${id}`);
    }
};

export const getAllCoursesFromRepo = async () => {
    try {
        const courses = await Course.find({});
        return courses;
    } catch (error) {
        throw Error("Error while retrieving all courses");
    }
};

export const getCoursesByListFromRepo = async (courseIdList) => {
    try {
        const courses = await Course.find({id:{$in: courseIdList}});
        return courses;
    } catch (error) {
        throw Error("Error while retrieving courses by list");
    }
};

export const getCourseByIdFromRepo = async (id) => {
    try {
        const course = await Course.findOne({id:id});
        return course;
    } catch (error) {
        throw Error(`Error while retrieving course ${id}`);
    }
};