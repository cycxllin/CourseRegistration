import axios from "axios";

export const enrollStudent = async (sid, cid) => {
  try {
    const url = `http://localhost:65500/students/${sid}/enroll/${cid}`;

    const response = await axios.patch(url);
    return response.data;

  } catch (error) {
    console.error(error);
    throw error; 
  }
};