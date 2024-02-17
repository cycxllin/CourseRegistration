import axios from "axios";

export const getStudentsCourses = async (student) => {
  try {
    const coursesEnrolled = student.coursesEnrolled;
    const query_string = coursesEnrolled.join();

    const url = `http://localhost:65500/courses/list?ids=${query_string}`;

    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    console.error(`Error fetching list of student ${student.id} courses:`, error);
    throw error; 
  }
};