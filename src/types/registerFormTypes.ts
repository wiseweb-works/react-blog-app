import { FormikErrors, FormikTouched } from 'formik';

export type RegisterFormValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  city: string;
  bio: string;
  password: string;
};

export interface RegisterFormProps {
  values: RegisterFormValues;
  errors: FormikErrors<RegisterFormValues>;
  touched: FormikTouched<RegisterFormValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
