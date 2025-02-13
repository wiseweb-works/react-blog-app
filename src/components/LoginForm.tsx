import { Button, TextField } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';

type FormValues = {
  username: string;
  password: string;
};

interface LoginFormProps {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username*"
        variant="outlined"
        fullWidth
        value={values.username}
        onChange={handleChange}
        error={Boolean(touched.username && errors.username)}
        helperText={touched.username && errors.username}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="password"
        label="Password*"
        variant="outlined"
        fullWidth
        value={values.password}
        onChange={handleChange}
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
        onBlur={handleBlur}
        margin="normal"
        type="password"
      />
      <Button variant="contained" fullWidth type="submit">
        SIGN IN
      </Button>
    </form>
  );
};

export default LoginForm;
