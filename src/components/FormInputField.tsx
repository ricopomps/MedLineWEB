import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./NavbarCadastro.module.css";
interface FormInputFieldProps {
  register: UseFormRegisterReturn;
  label?: string;
  formError?: FieldError;
  inputGroupElement?: JSX.Element;
}

export default function FormInputField({
  register,
  label,
  formError,
  inputGroupElement,
  ...props
}: FormInputFieldProps & TextFieldProps) {
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
        InputProps={{
          endAdornment: inputGroupElement ? (
            <InputAdornment position="end">{inputGroupElement}</InputAdornment>
          ) : undefined,
        }}
      />
    </div>
  );
}
