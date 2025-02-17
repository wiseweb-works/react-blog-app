import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router';
import { LoginForm } from '../components/';
import { login } from '../services/authService';
import { Helmet } from 'react-helmet';
import { LoginFormValues } from '../types/loginFormTypes';
import { LoginSchema } from '../schemas/loginSchema';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: 'green' }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <Formik<LoginFormValues>
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              await login(values);
              navigate('/');
            } catch {
              alert('Login failed. Please try again.');
            }
          }}
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
