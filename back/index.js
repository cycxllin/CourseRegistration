import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import studentRoutes from "./routes/student.route.js"
import courseRoutes from "./routes/course.route.js"
import { connectDB } from "./database/database.js";

connectDB();

const app = express();
const port = process.env.PORT || 65500;

// allow CORS 
app.use(cors());

// parse url & json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

//start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});