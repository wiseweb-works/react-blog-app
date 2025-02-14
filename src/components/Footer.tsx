import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        // position: 'fixed',
        // bottom: 0,
        // left: 0,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'black',
        color: 'white',
        paddingBlock: 2,
      }}
    >
      <Typography variant="body1">Developed By Abdullah Koyuncu</Typography>
      <Typography variant="body2">Copyright © 2025</Typography>
    </Box>
  );
};

export default Footer;
