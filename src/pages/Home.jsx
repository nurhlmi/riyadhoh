/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CountdownSholat from '../sections/CountdownSholat';
import Page from '../components/Page';

export default function Home() {
  const [data, setData] = useState({
    name: localStorage.getItem('name'),
    theme: localStorage.getItem('theme'),
  });
  const [menu] = useState([
    {
      title: 'Jadwal Sholat',
      image: 'schedule.png',
    },
    {
      title: 'Sholat',
      image: 'sajadah.png',
      to: '/sholat',
    },
    {
      title: `Al-Qur'an`,
      image: 'quran.png',
    },
    {
      title: 'Dzikir',
      image: 'beads.png',
    },
    {
      title: 'Sedekah',
      image: 'charity.png',
    },
    {
      title: 'Puasa',
      image: 'fasting.png',
    },
    {
      title: 'Kajian',
      image: 'muslimin.png',
    },
    {
      title: 'Lainnya',
      image: 'more.png',
    },
  ]);

  const handlePrompt = () => {
    const name = prompt('Masukkan nama anda');
    if (name) {
      localStorage.setItem('name', name);
      setData({
        ...data,
        name,
      });
    }
  };

  useEffect(() => {
    if (data.name === null) {
      handlePrompt();
    }
  }, [data]);

  return (
    <Page title="Beranda" bottomNavigation>
      <Box bgcolor="primary.main" color="#fff" height={200} pt={5}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Stack onClick={handlePrompt}>
              <Typography fontWeight="bold">Assalamu'alaikum</Typography>
              {data.name !== null && (
                <Typography variant="h4" fontWeight="bold">
                  {data.name}
                </Typography>
              )}
            </Stack>
            <Stack direction="row">
              <img src={`/static/theme2/muslimin.png`} alt="Muslimin" width={50} height={50} />
              <img src={`/static/theme2/muslimah.png`} alt="Muslimah" width={50} height={50} />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container>
        <Stack spacing={3} mb={3}>
          <CountdownSholat sx={{ mt: -9 }} />
        </Stack>
        <Grid container spacing={2} mb={3}>
          {menu.map((value, index) => (
            <Grid item xs={3} mb={1} key={index}>
              <Stack alignItems="center" justifyContent="center">
                <Card>
                  <CardActionArea align="center" sx={{ p: 2 }} component={RouterLink} to={value.to}>
                    <img src={`/static/theme2/${value.image}`} alt={value.title} width={40} />
                  </CardActionArea>
                </Card>
                <Typography variant="caption" align="center" mt={1}>
                  {value.title}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack>
          <Card>
            <CardActionArea>
              <CardMedia component="img" image="/static/kajian.webp" />
              <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h5" component="div">
                  Motivasi disaat tidak ada pendapatan sama sekali
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ustadz Khalid Basalamah
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Container>
    </Page>
  );
}
