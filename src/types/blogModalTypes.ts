import { FormikErrors, FormikTouched } from 'formik';
import { FormValues } from './formTypes';

export interface BlogModalProps {
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setFieldValue: (field: string, value: string | boolean) => void;
}
