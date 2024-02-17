# CourseRegistration

This is a simple course registration app developed for a midterm project for
CMPT 315 MacEwan University Winter 2024

## Assumptions

- Courses are everyday.
- Courses span one hour.
- A course can only hold 5 students

## Installation

Ensure dependancies are installed.
Then run `npm start` in terminal for back and front

- back dependancies
  - "body-parser": "^1.20.2",
  - "cors": "^2.8.5",
  - "dotenv": "^16.4.4",
  - "express": "^4.18.2",
  - "mongoose": "^8.1.2",
  - "nodemon": "^3.0.3"
- front dependancies
  - "@testing-library/jest-dom": "^5.17.0",
  - "@testing-library/react": "^13.4.0",
  - "@testing-library/user-event": "^13.5.0",
  - "axios": "^1.6.7",
  - "bootstrap": "^5.3.2",
  - "react": "^18.2.0",
  - "react-bootstrap": "^2.10.1",
  - "react-dom": "^18.2.0",
  - "react-scripts": "5.0.1",
  - "web-vitals": "^2.1.4"

## Database Schemas

### Students

- id: {type: Number, required: true},
- name: {type: String, required: true},
- email: String,
- coursesEnrolled: [Number] // list of course ids

### Courses

- id: {type: Number, required: true},
- CourseName: {type: String, required: true},
- Department: {type: String, required: true},
- TimeOfDay: {type: String, required: true},
- EnrolledStudents: Number
