import { Avatar, Box, Container, Typography } from '@mui/material';
import * as Yup from 'yup';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Formik } from 'formik';
import { Link } from 'react-router';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Password has more than 8 characters')
      .matches(/[a-z]/, 'Password contain lowercase letters')
      .matches(/[A-Z]/, 'Password contain uppercase letters')
      .matches(/\d+/, 'Password contain numeric characters.')
      .matches(/[@$?!%&*_-]+/, 'Contain special characters (@$?!%&*_-).'),
  });

  type FormValues = {
    username: string;
    password: string;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Container
        maxWidth="xs"
        sx={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'green' }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <Formik<FormValues>
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
          // onSubmit={(values) => {
          //   dispatch(createUser(values));
          // }}
          component={(props) => <LoginForm {...props} />}
        />
      </Container>
      <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </Box>
    </Container>
  );
};

export default Login;
