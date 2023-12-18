import {
  InputAdornment,
  MenuItem,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./NavbarCadastro.module.css";

export interface FormInputFieldProps {
  register: UseFormRegisterReturn;
  label?: string;
  formError?: FieldError;
  inputGroupElement?: JSX.Element;
  options?: Array<{ value: string; label: string }>; // Add options prop for select
}

export default function FormInputField({
  register,
  label,
  formError,
  inputGroupElement,
  options,
  ...props
}: FormInputFieldProps & TextFieldProps) {
  const isSelect = !!options;

  return (
    <div style={{ width: "100%", marginBottom: "16px" }}>
      {label && <Typography variant="body1">{label}</Typography>}
      <TextField
        className={styles.text}
        {...register}
        {...props}
        variant="outlined"
        error={!!formError}
        helperText={formError?.message}
        select={isSelect} // Set select prop conditionally
        SelectProps={isSelect ? { native: false } : undefined} // Use native false only for select
        {...register}
        InputProps={{
          endAdornment: inputGroupElement ? (
            <InputAdornment position="end">{inputGroupElement}</InputAdornment>
          ) : undefined,
        }}
      >
        {isSelect &&
          options &&
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
}
