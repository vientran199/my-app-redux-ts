import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi'
import { Student } from 'models'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import StudentForm from '../components/StudentForm';

const AddEditPage = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);

  const [student, setStudent] = React.useState<Student>();

  React.useEffect(() => {
    if (!studentId) return;
    //IIFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async(formValues: Student) => {
    // TODO: Handle submit here, call API  to add/update student
    try {
        if(isEdit){
            const data:Student = await studentApi.update(formValues)
        }else{
            const data: Student = await studentApi.add(formValues)
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
  };

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
};

export default AddEditPage