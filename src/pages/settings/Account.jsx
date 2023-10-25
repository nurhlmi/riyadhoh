import {
  ChevronRightRounded,
  ColorLensOutlined,
  DeleteOutlined,
  LanguageRounded,
  LockOutlined,
  PinDropOutlined,
} from '@mui/icons-material';
import { Card, CardActionArea, Container, Divider, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../components/Page';

export default function AccountSettings() {
  const menu = [
    {
      child: [
        {
          title: 'Kata Sandi',
          icon: <LockOutlined color="action" />,
        },
      ],
    },
    {
      child: [
        {
          title: 'Wilayah',
          icon: <PinDropOutlined color="action" />,
        },
        {
          title: 'Bahasa',
          icon: <LanguageRounded color="action" />,
        },
        {
          title: 'Tema',
          icon: <ColorLensOutlined color="action" />,
        },
      ],
    },
    {
      child: [
        {
          title: 'Hapus Akun',
          icon: <DeleteOutlined color="action" />,
        },
      ],
    },
  ];

  return (
    <Page title="Pengaturan Akun" headerNavigation>
      <Container>
        <Stack spacing={4} mt={3}>
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
      </Container>
    </Page>
  );
}
