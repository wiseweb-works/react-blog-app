import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from 'formik';
import { RegisterForm } from '../components/';
import { Link, useNavigate } from 'react-router';
import { register } from '../services/authService';
import { Helmet } from 'react-helmet';
import { RegisterFormValues } from '../types/registerFormTypes';
import { SignupSchema } from '../schemas/registerSchema';

const Register = () => {
  const navigate = useNavigate();

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
        <Formik<RegisterFormValues>
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
