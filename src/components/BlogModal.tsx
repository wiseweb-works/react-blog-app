import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  SelectChangeEvent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/postService';
import { Category } from '../types/categoryTypes';
import { BlogModalProps } from '../types/blogModalTypes';

const BlogModal: React.FC<BlogModalProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFieldValue('categoryId', event.target.value);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error instanceof Error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">Create Blog</Typography>

      <TextField
        name="title"
        label="Title*"
        variant="outlined"
        fullWidth
        value={values.title}
        onChange={handleChange}
        error={Boolean(touched.title && errors.title)}
        helperText={touched.title && errors.title}
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
        error={Boolean(touched.image && errors.image)}
        helperText={touched.image && errors.image}
        onBlur={handleBlur}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category*</InputLabel>
        <Select
          name="categoryId"
          value={values.categoryId}
          onChange={handleSelectChange}
          onBlur={handleBlur}
          error={Boolean(touched.categoryId && errors.categoryId)}
        >
          {categories.map((category: Category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            name="isPublish"
            checked={values.isPublish}
            onChange={(e) => {
              setFieldValue('isPublish', e.target.checked);
            }}
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
        error={Boolean(touched.content && errors.content)}
        helperText={touched.content && errors.content}
        onBlur={handleBlur}
        margin="normal"
        multiline
        rows={4}
      />

      <Button variant="contained" fullWidth type="submit">
        Publish Blog
      </Button>
    </form>
  );
};

export default BlogModal;
