import axios from "axios";

export const unenrollStudent = async (sid, cid) => {
  try {
    const url = `http://localhost:65500/students/${sid}/unenroll/${cid}`;

    const response = await axios.patch(url);
    return response.data;

  } catch (error) {
    console.error("Error unenrolling student", error);
    throw error; 
  }
};