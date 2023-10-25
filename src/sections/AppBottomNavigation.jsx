import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { AccountCircleRounded, CrisisAlertRounded, HomeRounded } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export default function AppBottomNavigation() {
  const { pathname } = window.location;
  const [value, setValue] = useState(pathname);
  return (
    <Paper
      sx={{
        width: { xs: '100%', sm: 600 },
        position: 'fixed',
        bottom: 0,
        pb: { xs: 3, sm: 0 },
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Beranda"
          icon={<HomeRounded />}
          component={RouterLink}
          to="/home"
          value="/home"
        />
        <BottomNavigationAction label="Target" icon={<CrisisAlertRounded />} />
        <BottomNavigationAction label="Akun" icon={<AccountCircleRounded />} component={RouterLink} to="/settings" />
      </BottomNavigation>
    </Paper>
  );
}
