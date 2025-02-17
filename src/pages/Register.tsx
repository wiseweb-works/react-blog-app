import { Avatar, Box, Container, Typography } from '@mui/material';
import * as Yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from 'formik';
import { RegisterForm } from '../components/';
import { Link, useNavigate } from 'react-router';
import { register } from '../services/authService';
import { Helmet } from 'react-helmet';

const Register = () => {
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string()
      .min(8, 'Password cannot be less than 8 characters')
      .matches(/[a-z]/, 'Password must contain lowercase letters')
      .matches(/[A-Z]/, 'Password must contain uppercase letters')
      .matches(/\d+/, 'The password must contain numeric characters.')
      .matches(/[@$?!%&*_-]+/, 'Must contain special characters (@$?!%&*_-).'),
    image: Yup.string().url('Invalid URL'),
    city: Yup.string().max(25, 'City cannot be more than 25 characters'),
    bio: Yup.string().max(100, 'Bio cannot be more than 100 characters'),
  });

  type FormValues = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    city: string;
    bio: string;
    password: string;
  };

  return (
    <Container maxWidth="lg" sx={{ marginBlock: 4 }}>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign Up</Typography>
        <Formik<FormValues>
          initialValues={{
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            image: '',
            city: '',
            bio: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              await register(values);
              navigate('/');
            } catch (error) {
              console.error('Login failed:', error);
              alert('Login failed. Please try again.');
            }
          }}
          component={(props) => <RegisterForm {...props} />}
        />
      </Container>
      <Box sx={{ textAlign: 'center', mt: 2, color: 'secondary.main' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </Box>
    </Container>
  );
};

export default Register;
