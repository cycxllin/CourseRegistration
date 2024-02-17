import './studentInfoCard.styles.css'
import CourseTable from '../courseTable/courseTable.component.jsx';

const StudentInfoCard = ({ student, coursesEnrolled, COURSE_FULL_AT, enrollType, handleClick}) => {
    const { name, email, id } = student;

    // display hint if no student selected
    if (!student.name){
        return (
            <div className={"info"}>
                <h3 className='text'>Select student from the dropdown menu</h3>
            </div>
        )
    }

    return (
        <div className={"info"}>
            <h3>{name}</h3>
            <h4 className='text'>ID: {id}</h4>
            <h4 className='text'>{email}</h4>
            <hr/>
            <h2>Enrolled Courses</h2>
            <CourseTable courses={coursesEnrolled} 
                COURSE_FULL_AT={COURSE_FULL_AT}
                enrollType={enrollType}
                handleClick={handleClick}
                student={student}/>
        </div>
    )
};

export default StudentInfoCard;