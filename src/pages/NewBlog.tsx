import { Container, Paper } from '@mui/material';
import { Formik } from 'formik';
import { BlogModal } from '../components/';
import { createPost } from '../services/postService';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { NewPostSchema } from '../schemas/postSchema';
import { FormValues } from '../types/formTypes';

const NewBlog = () => {
  const navigate = useNavigate();

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
