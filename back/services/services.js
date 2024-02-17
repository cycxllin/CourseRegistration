export const checkCourseIsFull =  (course) => {
    try {
        const courseFullAt = 5;
        const numberEnrolled = course.EnrolledStudents;

        if (numberEnrolled >= courseFullAt){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw Error('Error while determining if course is full');
    }
}

export const checkCourseConflict =  (course, courses) => {
    try {
        for (let i=0; i<courses.length; i++){
            if (courses[i].TimeOfDay === course.TimeOfDay){
                return true;
            }
        }
        //no courses conflict
        return false;
    } catch (error) {
        throw Error('Error while determining if courses conflict');
    }
}