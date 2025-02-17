import { Button, TextField } from '@mui/material';
import { RegisterFormProps } from '../types/registerFormTypes';

const RegisterForm: React.FC<RegisterFormProps> = ({
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
        name="firstName"
        label="First Name*"
        variant="outlined"
        fullWidth
        value={values.firstName}
        onChange={handleChange}
        error={Boolean(touched.firstName && errors.firstName)}
        helperText={touched.firstName && errors.firstName}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="lastName"
        label="Last Name*"
        variant="outlined"
        fullWidth
        value={values.lastName}
        onChange={handleChange}
        error={Boolean(touched.lastName && errors.lastName)}
        helperText={touched.lastName && errors.lastName}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="email"
        label="E-Mail Address*"
        variant="outlined"
        fullWidth
        value={values.email}
        onChange={handleChange}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        onBlur={handleBlur}
        margin="normal"
        type="email"
      />
      <TextField
        name="image"
        label="Image URL"
        variant="outlined"
        fullWidth
        value={values.image}
        onChange={handleChange}
        error={Boolean(touched.image && errors.image)}
        helperText={touched.image && errors.image}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="city"
        label="City"
        variant="outlined"
        fullWidth
        value={values.city}
        onChange={handleChange}
        error={Boolean(touched.city && errors.city)}
        helperText={touched.city && errors.city}
        onBlur={handleBlur}
        margin="normal"
      />
      <TextField
        name="bio"
        label="Bio"
        variant="outlined"
        fullWidth
        value={values.bio}
        onChange={handleChange}
        error={Boolean(touched.bio && errors.bio)}
        helperText={touched.bio && errors.bio}
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
        SIGN UP
      </Button>
    </form>
  );
};

export default RegisterForm;
