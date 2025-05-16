import { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { theme } from '../theme';
import PrivateRouter from './Private/privateRouter';
import { RECEPTIONIST_ROLE } from '../constants';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  maxWidth: '100%',
  height: '100vh', // <-- quan trọng
  overflow: 'hidden', // <-- ngăn scroll body
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));


export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <PrivateRouter acceptRole={[RECEPTIONIST_ROLE]}>
      <ThemeProvider theme={theme}>
        <DashboardLayoutRoot className='bg-[#eee] h-screen'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: '1 1 auto',
              height: '100%', // <-- thêm dòng này
              width: '100%',
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
        <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
        <DashboardSidebar
          onClose={() => setSidebarOpen(false)}
          open={isSidebarOpen}
        />
      </ThemeProvider>
    </PrivateRouter>
  );
};
