import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true},
        email: String,
        coursesEnrolled: [Number] // list of course ids
      }
);

export default mongoose.model("Student", StudentSchema);