import { useNavigate } from 'react-router';
import goBack from '../assets/404.png';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Typography variant="h3" gutterBottom>
        Page Not Found
      </Typography>
      <Box
        component="img"
        src={goBack}
        alt="404"
        width={750}
        sx={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
    </Box>
  );
};

export default NotFound;
