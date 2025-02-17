import { Container, Paper } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BlogModal } from '../components/';
import { createPost } from '../services/postService';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const NewBlog = () => {
  const navigate = useNavigate();
  const NewPostSchema = Yup.object().shape({
    title: Yup.string()
      .min(5, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    image: Yup.string().url('Invalid URL'),
    categoryId: Yup.string().required('Required'),
    isPublish: Yup.boolean().required('Required'),
    content: Yup.string().max(
      100,
      'Content cannot be more than 100 characters'
    ),
  });

  type FormValues = {
    title: string;
    image: string;
    categoryId: string;
    isPublish: boolean;
    content: string;
  };

  return (
    <Container
      maxWidth={'xs'}
      sx={{
        minHeight: '80vh',
        marginBlock: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Helmet>
        <title>New Blog</title>
      </Helmet>
      <Paper elevation={10} sx={{ p: 2, mt: 2 }}>
        <Formik<FormValues>
          initialValues={{
            title: '',
            image: '',
            categoryId: '',
            isPublish: false,
            content: '',
          }}
          validationSchema={NewPostSchema}
          onSubmit={async (values) => {
            const response = await createPost(values);
            if (response) navigate('/');
          }}
          component={(props) => <BlogModal {...props} />}
        />
      </Paper>
    </Container>
  );
};

export default NewBlog;
