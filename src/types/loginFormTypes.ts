import { FormikErrors, FormikTouched } from 'formik';

export type LoginFormValues = {
  username: string;
  password: string;
};

export interface LoginFormProps {
  values: LoginFormValues;
  errors: FormikErrors<LoginFormValues>;
  touched: FormikTouched<LoginFormValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
