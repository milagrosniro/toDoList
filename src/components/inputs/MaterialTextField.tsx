import { TextField } from "@mui/material";

interface IProps {
  value: string;
  handleChange: any;
  name: string;
  label: string;
  type: string;
  error: boolean;
  helperText?: string;
  disabled?: boolean
}

export default function MaterialTextField({
  value,
  handleChange,
  name,
  label,
  type,
  error,
  helperText,
  disabled,
  ...other
}: IProps) {
  return (
    <TextField
      size="small"
      disabled={disabled ?? false}
      id={name}
      name={name}
      label={label}
      type={type}
      fullWidth
      value={value}
      onChange={handleChange}
      error={error}
      helperText={helperText && helperText}
      sx={{
        backgroundColor: "#fafafa",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        color: "#CBCCD2"
      }}
    />
  );
}
