import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <Box width={600} pb={12} minHeight="100vh">
        <Outlet />
      </Box>
    </Stack>
  );
}
