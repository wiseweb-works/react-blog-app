import * as Yup from 'yup';

export const NewPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  image: Yup.string().url('Invalid URL'),
  categoryId: Yup.string().required('Required'),
  isPublish: Yup.boolean().required('Required'),
  content: Yup.string().max(100, 'Content cannot be more than 100 characters'),
});
