import axios from "axios";

export const getStudent = async (id) => {
  try {
    const url = `http://localhost:65500/students/${id}`;

    const response = await axios.get(url);
    return response.data;

  } catch (error) {
    console.error(`Error fetching student ${id}`, error);
    throw error; 
  }
};