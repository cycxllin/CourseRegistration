import mongoose from "mongoose";

mongoose.set('strictQuery', true);

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URL || 
            'mongodb+srv://admin:admin@coursereg.kgrayig.mongodb.net/CourseRegApp?retryWrites=true&w=majority'
        );
        console.log('Database connected')
    } catch (error) {
        console.log("Database connection failed: ", error);
    }
};