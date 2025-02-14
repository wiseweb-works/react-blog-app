import { Container } from '@mui/material';
import BlogPosts from '../components/BlogPosts';

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ marginBlock: 2 }}>
      <BlogPosts />
    </Container>
  );
};

export default Dashboard;
