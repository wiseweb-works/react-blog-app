import { Box, CardMedia, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../services/authService';
import logoProfile from '../assets/profile.png';

const Profile = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
  });

  if (!userData || userData.length === 0)
    return <Typography>No user data found</Typography>;
  const { username, email, image, bio } = userData[0];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error instanceof Error)
    return <Typography>Error: {error.message}</Typography>;

  return (
    <Container
      maxWidth={'lg'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <h1>Profile</h1>
      <Box sx={{ mt: 4 }}>
        <CardMedia
          component="img"
          image={image || logoProfile}
          alt={`${username} Profile Photo`}
          sx={{ objectFit: 'cover', width: '300px', height: '300px' }}
        />
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom textAlign="center">
          {username}
        </Typography>
        <Typography variant="h5" gutterBottom textAlign="center">
          {email}
        </Typography>
        <Typography variant="h5" gutterBottom textAlign="justify">
          {bio || 'No profile information'}
        </Typography>
      </Box>
    </Container>
  );
};

export default Profile;
