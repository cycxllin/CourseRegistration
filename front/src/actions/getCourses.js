import axios from "axios";

export const getCourses = async () => {
  try {
    const url = 'http://localhost:65500/courses';

    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    console.error("Error fetching list of courses:", error);
    throw error; 
  }
};