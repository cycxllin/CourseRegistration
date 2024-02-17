import Table from 'react-bootstrap/Table';
import RegisterButton from '../button/button.component.jsx';

const CourseTable = ({ courses, COURSE_FULL_AT, enrollType, handleClick }) => (
    <Table striped bordered hover responsive>
    <thead>
        <tr>
            <th className='d-none d-sm-block'>ID</th>
            <th>Name</th>
            <th className='d-none d-sm-block'>Department</th>
            <th>Seats</th>
            <th>Time</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {courses.map((course) => {
            return(
                <tr key={course.id}>
                <th className='d-none d-sm-table-cell'>{course.id}</th>
                <th>{course.CourseName}</th>
                <th className='d-none d-sm-table-cell'>{course.Department}</th>
                <>
                    {(enrollType==='enroll' && course.EnrolledStudents===COURSE_FULL_AT) ? 
                    (<th>FULL</th>) : 
                    (<th>{course.EnrolledStudents}/{COURSE_FULL_AT}</th>)}
                </>
                <th>{course.TimeOfDay}</th>
                <th><RegisterButton course={course} enrollType={enrollType} 
                handleClick={handleClick} COURSE_FULL_AT={COURSE_FULL_AT}/></th>
                </tr>
            )})}
    </tbody>
    </Table>
);

export default CourseTable;