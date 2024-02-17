import Button from 'react-bootstrap/Button';
import "./button.styles.css"

const RegisterButton  = ({ course, enrollType, handleClick, COURSE_FULL_AT }) => {
  if (enrollType === 'unenroll') {
    return (
        <>
            <Button variant='danger' onClick={() => handleClick(course.id, enrollType)}>Drop</Button>
        </>
  )} else if (enrollType === 'enroll'){
    return (
        <>
            <Button disabled={Number(course.EnrolledStudents) >= COURSE_FULL_AT ? true:false}
            onClick={() => handleClick(course.id, enrollType)}>Enroll</Button>
        </>
  )}
};

export default RegisterButton;