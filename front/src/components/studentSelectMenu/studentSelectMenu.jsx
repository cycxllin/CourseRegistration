import Form from 'react-bootstrap/Form';

function selectStudent({students, handleSelect}) {
  return (
    <Form.Select aria-label="Choose Student" onChange={handleSelect}>
      <option key="-1" value ="-1" label='No Student'>
      </option>
      {students.map((student) => (
                <option key={student.id} value={student.id} label={student.name}>
                </option>
            ))}
    </Form.Select>
  );
}

export default selectStudent;