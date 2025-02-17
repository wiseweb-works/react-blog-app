import { Box, Container, Paper, Typography } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import avatar from '../assets/mern.png';
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '80vh',
        marginBlock: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Helmet>
        <title>About</title>
      </Helmet>
      <Box>
        <Paper elevation={10} sx={{ p: 2, mt: 2, textAlign: 'center' }}>
          <BadgeOutlinedIcon sx={{ fontSize: 60, color: 'purple' }} />
          <Typography variant="h3" align="center" gutterBottom>
            {/* Nett hier. Aber haben Sie schon mal mein persönliches Portfolio gesehen? */}
            Abdullah Koyuncu
          </Typography>
          <img
            src={avatar}
            alt="avatar"
            style={{ width: '', maxHeight: '50vh' }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Fullstack Developer
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <a href="https://www.linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="https://www.x.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="https://www.instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="https://www.youtube.com">
              <YouTubeIcon fontSize="large" />
            </a>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
