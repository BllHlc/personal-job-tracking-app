import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', height: '60px', mt: "auto", py: 2 }}>
      <Box
        sx={{
          height: '100%',
          bgcolor: grey[100],
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="https://github.com/BllHlc/personal-job-tracking-app"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: grey[600],
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: grey[800],
              },
            }}
          >
            <GitHubIcon sx={{ mr: 1 }} />
            Repository
          </Link>
        </Box>
        <Typography variant="body1"
          color="text.secondary"
          align="center">
          {'© ' + new Date().getFullYear() + ' Bilal Halıcı'}
        </Typography>
      </Box>
    </Box >
  );
};

export default Footer;