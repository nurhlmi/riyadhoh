import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material';
import AppBottomNavigation from '../sections/AppBottomNavigation';

const Page = forwardRef(
  ({ children, title = '', headerNavigation = false, bottomNavigation = false, meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title} - Riyadhoh`}</title>
        {meta}
      </Helmet>
      <Box ref={ref} {...other} mt={headerNavigation ? 10 : 0}>
        {headerNavigation && (
          <AppBar
            position="fixed"
            color="inherit"
            sx={{
              width: { xs: '100%', sm: 600 },
              top: { xs: '3%', sm: '4%' },
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" onClick={() => window.history.back()}>
                <ArrowBackRounded />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} ml={1}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
        {children}
        {bottomNavigation && <AppBottomNavigation />}
      </Box>
    </>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  headerNavigation: PropTypes.bool,
  bottomNavigation: PropTypes.bool,
  meta: PropTypes.node,
};

export default Page;
