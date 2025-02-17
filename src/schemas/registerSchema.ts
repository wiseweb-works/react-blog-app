import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
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
  email: Yup.string().email('Invalid email').required('This field is required'),
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
