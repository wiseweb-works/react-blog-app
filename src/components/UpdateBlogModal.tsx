import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchCategories, updatePost } from '../services/postService';
import { Category } from '../types/categoryTypes';
import { FormValues } from '../types/formTypes';
import { UpdateBlogModalProps } from '../types/updateBlogTypes';

const UpdateBlogModal: React.FC<UpdateBlogModalProps> = ({
  open,
  handleClose,
  post,
  refetch,
}) => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => updatePost(post._id, values),
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Blog</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">Error: {error.message}</Alert>
        ) : (
          <Formik
            initialValues={{
              title: post.title,
              image: post.image,
              categoryId: post.categoryId?._id || '',
              isPublish: post.isPublish,
              content: post.content,
            }}
            onSubmit={async (
              values,
              { setSubmitting }: FormikHelpers<FormValues>
            ) => {
              await mutation.mutateAsync(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="title"
                  label="Title*"
                  variant="outlined"
                  fullWidth
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                />

                <TextField
                  name="image"
                  label="Image URL*"
                  variant="outlined"
                  fullWidth
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel>Category*</InputLabel>
                  <Select
                    name="categoryId"
                    value={values.categoryId}
                    onChange={(e) =>
                      setFieldValue('categoryId', e.target.value)
                    }
                    onBlur={handleBlur}
                  >
                    {(categories ?? []).map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}{' '}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      name="isPublish"
                      checked={values.isPublish}
                      onChange={(e) =>
                        setFieldValue('isPublish', e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label="Publish?"
                />

                <TextField
                  name="content"
                  label="Content*"
                  variant="outlined"
                  fullWidth
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  margin="normal"
                  multiline
                  rows={4}
                />

                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Update Blog'
                    )}
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBlogModal;
