import axios from "axios";

export const getStudentsNamesIdList = async () => {
  try {
    const url = 'http://localhost:65500/students';

    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    console.error("Error fetching list of students:", error);
    throw error; 
  }
};