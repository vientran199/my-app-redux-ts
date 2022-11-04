import { Box, Button } from "@material-ui/core";
import { InputField } from "components/FormFields";
import { Student } from "models"
import { useState } from "react";

export interface StudentFormProps {
    initialValues: Student;
    onSubmit?: (formValues: Student) => void;
}
const StudentForm = ({initialValues,onSubmit}:StudentFormProps) =>{
    const [formValues,setFormValues] = useState<Student>(initialValues)
    const handleFormSubmit = (e: any) =>{
        e.preventDefault()
        if(onSubmit) onSubmit(formValues)
    }

    const handleChangeValue = (e:any) =>{
        setFormValues(prev => ({
            ...prev,
            [e.target.name] :e.target.value
        }))
    }
    return (
      <Box maxWidth={400}>
        <form onSubmit={handleFormSubmit as any}>
          <InputField name="name" value={formValues?.name} onChange={handleChangeValue} label="Full Name" />
          <InputField name="age" value={formValues?.age.toString()} onChange={handleChangeValue} label="Age" />
          <InputField name="mark"  value={(formValues?.mark).toString()} onChange={handleChangeValue} label="Mark"/>
          <InputField name="gender" value={formValues?.gender} onChange={handleChangeValue} label="Gender" />
          <InputField name="city" value={formValues?.city} onChange={handleChangeValue} label="City" />

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    );
}

export default StudentForm
