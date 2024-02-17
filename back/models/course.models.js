import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        CourseName: {type: String, required: true},
        Department: {type: String, required: true},
        TimeOfDay: {type: String, required: true},
        EnrolledStudents: Number
      }
);

export default mongoose.model("Course", CourseSchema);