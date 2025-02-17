import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
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
