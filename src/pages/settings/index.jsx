import {
  AssignmentOutlined,
  ChevronRightRounded,
  EditOutlined,
  GppMaybeOutlined,
  HelpOutlineOutlined,
  InfoOutlined,
  LogoutOutlined,
  PersonAddAltOutlined,
  StarBorderOutlined,
  SettingsOutlined,
  NotificationsOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Card, CardActionArea, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../components/Page';

export default function Settings() {
  const menu = [
    {
      child: [
        {
          title: 'Pengaturan Akun',
          icon: <SettingsOutlined color="action" />,
          to: './account',
        },
        {
          title: 'Notifikasi',
          icon: <NotificationsOutlined color="action" />,
        },
        {
          title: 'Bantuan & Saran',
          icon: <HelpOutlineOutlined color="action" />,
        },
        {
          title: 'Undang Teman',
          icon: <PersonAddAltOutlined color="action" />,
        },
      ],
    },
    {
      child: [
        {
          title: 'Persyaratan Layanan',
          icon: <AssignmentOutlined color="action" />,
        },
        {
          title: 'Kebijakan Privasi',
          icon: <GppMaybeOutlined color="action" />,
        },
        {
          title: 'Tentang Aplikasi',
          icon: <InfoOutlined color="action" />,
        },
        {
          title: 'Beri Kami Nilai',
          icon: <StarBorderOutlined color="action" />,
        },
      ],
    },
    {
      child: [
        {
          title: 'Keluar',
          to: '/login',
          icon: <LogoutOutlined color="action" />,
        },
      ],
    },
  ];

  return (
    <Page title="Akun" headerNavigation>
      <Container>
        <Stack spacing={4} mt={3}>
          <Card>
            <Stack direction="row" justifyContent="space-between" spacing={2} py={2} pl={2} pr={1}>
              <Stack direction="row" spacing={2}>
                <Avatar />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Nur Hilmi
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    nurhilmi.mail@gmail.com
                  </Typography>
                </Box>
              </Stack>
              <Box>
                <IconButton>
                  <EditOutlined fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          </Card>
          {menu.map((value, index) => (
            <Card key={index}>
              {value.child.map((row, key) => (
                <CardActionArea component={RouterLink} to={row.to} key={key}>
                  <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
                    <Stack direction="row" spacing={2}>
                      {row.icon}
                      <Typography>{row.title}</Typography>
                    </Stack>
                    <ChevronRightRounded color="action" />
                  </Stack>
                  {key + 1 < value.child.length && <Divider sx={{ ml: 7 }} />}
                </CardActionArea>
              ))}
            </Card>
          ))}
        </Stack>
        <Typography variant="body2" align="center" color="text.secondary" mt={4}>
          Versi 1.0.0
        </Typography>
      </Container>
    </Page>
  );
}
