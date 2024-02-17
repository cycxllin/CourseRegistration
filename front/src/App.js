import React, { useEffect, useState } from "react";
import './App.css';
import { getStudentsNamesIdList } from "./actions/getStudentsNameIdList.js";
import { getStudent } from "./actions/getStudent.js";
import StudentSelectMenu from "./components/studentSelectMenu/studentSelectMenu.jsx";
import StudentInfoCard from "./components/studentInfoCard/studentInfoCard.component.jsx";
import { getStudentsCourses } from "./actions/getStudentsCourses.js";
import SearchBar from "./components/searchBar/searchBar.component.jsx";
import { getCourses } from "./actions/getCourses.js";
import CourseTable from "./components/courseTable/courseTable.component.jsx";
import { enrollStudent } from "./actions/enrollStudent.js";
import { unenrollStudent } from "./actions/unenrollStudent.js";
import ErrorModal from "./components/errorModal/errorModal.component.jsx";


function App() {
  const COURSE_FULL_AT = 5; // change in back/services/services.js as well
  const [studentNameIDList, setstudentNameIDList] = useState([]);
  const [activeStudent, setActiveStudent] = useState({});
  const [activeStudentCoursesEndrolled, setActiveStudentCoursesEnrolled] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [message, setMessage] = useState("");

  // filter courses based on search bar input and active student
  useEffect(() => {
    let filtered = [];

    //filter courses by search input
    if (searchInput === "") {
      filtered = courses;
    } else {
      filtered = courses.filter(course =>
        course.CourseName.toUpperCase().startsWith(searchInput.toUpperCase())
      );
    }

    //if student selected, remove courses they are enrolled in
    if (activeStudent.id > 0) {
      filtered = filtered.filter(course =>
        !activeStudent.coursesEnrolled.includes(course.id)
        );
    }

    setFilteredCourses(filtered);
  }, [activeStudent, courses, searchInput]);

  //get list of courses from db
  useEffect(() => {
    const fetchCourses = async () => {
        const coursesResponse = await getCourses();
        const courseList = coursesResponse.data

        // sort courses by name
        courseList.sort((a,b) => {
          return a.CourseName.localeCompare(b.CourseName);
        })

        setCourses(courseList);
    };

    fetchCourses();
  }, []);

  //get list of students from db
  useEffect(() => {
    const fetchStudents = async () => {
        const studentsResponse = await getStudentsNamesIdList();
        const students = studentsResponse.data

        // sort students by name
        students.sort((a,b) => {
          return a.name.localeCompare(b.name);
        })

        setstudentNameIDList(students);
    };

    fetchStudents();
  }, []);

  const handleClose = () => {
    setMessage("");
    setShowErrorModal(false);
    };

  // handle searchbar input (from monsters tutorial)
  const handleInput = e => {
    setSearchInput(e.target.value)
    };

  //handles button clicks for enroll/unenroll
  const handleClick = async (cid, enrollType) => {
    if (enrollType === 'enroll'){
      try {
        await enrollStudent(activeStudent.id, cid);
      } catch (error) {
        if (error.response.data.status === 409){
          setMessage("Requested enroll conflicts with existing class");
          setShowErrorModal(true);
        } else if (error.response.data.status === 412){
          setMessage("Class is full.");
          setShowErrorModal(true);
        }
      }

    } else if (enrollType === 'unenroll'){
      try {
        await unenrollStudent(activeStudent.id, cid);
      } catch (error) {
        //throw popup warning
        console.log("drop error");
      }
      
    }
    updateActiveStudentandCourses(activeStudent.id);
    updateCourses();
  };

  // handle selecting student from dropdown menu
  const handleSelect = async (e) => {
    const clickedId = Number(e.target.value);

    // allows for selecting no student
    if (clickedId === -1){
      setActiveStudent({});
      setActiveStudentCoursesEnrolled([]);
    } else {
      updateActiveStudentandCourses(clickedId);
    }
  }

  //update student and courses enrolled list
  const updateActiveStudentandCourses = async (sid) => {
    const responseStudent = await getStudent(sid);
    const student = responseStudent.data;
    setActiveStudent(student);

    const responseCourses = await getStudentsCourses(student)
    const courses = responseCourses.data
    setActiveStudentCoursesEnrolled(courses);
  };

  //update student and courses enrolled list
  const updateCourses = async () => {
    const responseCourses = await getCourses()
    const courses = responseCourses.data
    setCourses(courses);
  };
  

  return (
    <div className="App">
      <ErrorModal handleClose={handleClose} message={message} show={showErrorModal}/>
      <h1>Student Information</h1>
      <StudentSelectMenu students={studentNameIDList} handleSelect={handleSelect}/>
      <StudentInfoCard student={activeStudent} 
          coursesEnrolled={activeStudentCoursesEndrolled}
          COURSE_FULL_AT={COURSE_FULL_AT}
          enrollType="unenroll"
          handleClick={handleClick}/>
      <h1>Course Registration</h1>
      <SearchBar placeholder={"Search Class Names"} handleInput={handleInput}/>
      <CourseTable courses={filteredCourses} 
          COURSE_FULL_AT={COURSE_FULL_AT}
          enrollType="enroll"
          handleClick={handleClick}/>
    </div>
  );
}

export default App;
