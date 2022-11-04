import { TextField } from "@material-ui/core";

interface InputFieldProps{
    value: string;
    name: string;
    label? : string;
    onChange: any;
}
export const InputField = ({name,label,onChange,value}:InputFieldProps) =>{
    return (
        <TextField
            fullWidth
            size="small"
            name={name}
            margin="normal"
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
        />
    )
}