import { Container } from '@mui/material';
import { BlogPosts } from '../components/';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ marginBlock: 2 }}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <BlogPosts />
    </Container>
  );
};

export default Dashboard;
