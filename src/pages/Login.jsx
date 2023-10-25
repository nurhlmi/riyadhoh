import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Link, Stack, Typography } from '@mui/material';
import Page from '../components/Page';

export default function Login() {
  return (
    <Page title="Login">
      <Container sx={{ bgcolor: '#fff' }}>
        <Stack justifyContent="center" width="100%">
          <Stack direction="row" alignItems="flex-end" justifyContent="center" mt={20}>
            <img src={`/static/theme2/quran.png`} alt="Muslimin" width={100} height={100} />
            {/* <img src={`/static/theme1/muslimah.png`} alt="Muslimah" width={100} height={100} /> */}
          </Stack>
          <Stack py={5} spacing={1}>
            <Typography align="center" variant="h3">
              Assalamu'alaikum!
            </Typography>
            <Typography align="center">
              Selamat datang di aplikasi <b>Riyadhoh</b>.
              <br />
              <i>catatan ibadah pribadi-mu</i>.
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Button size="large" variant="contained" sx={{ textTransform: 'none' }}>
              Saya pengguna baru, Daftar
            </Button>
            <Button size="large" variant="outlined" component={RouterLink} to="/home">
              Masuk
            </Button>
          </Stack>
          <Typography variant="body2" mt={2}>
            Dengan masuk atau mendaftar, Anda menyetujui <Link underline="none">Persyaratan Layanan</Link> dan{' '}
            <Link underline="none">Kebijakan Privasi</Link> kami.
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
