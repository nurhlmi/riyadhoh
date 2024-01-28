/* eslint-disable no-nested-ternary */
import { forwardRef, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Skeleton,
  Slide,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChevronRightRounded,
  CancelRounded,
  ExpandMoreRounded,
  HighlightOffRounded,
  PinDropRounded,
  SearchRounded,
} from '@mui/icons-material';
import axios from 'axios';
import moment from 'moment';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function CountdownSholat(props) {
  const [data, setData] = useState();
  const [params, setParams] = useState({
    location: '1204',
    date: moment().format('yyyy/MM/DD'),
  });
  const [next, setNext] = useState({ name: '', countDown: 0 });
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);

  // Dokumentasi API Muslim
  // https://documenter.getpostman.com/view/841292/2s9YsGittd
  const baseUrl = 'https://api.myquran.com/v2/';

  // Fetch jadwal sholat
  useEffect(() => {
    setComplete(false);
    fetch(`${baseUrl}sholat/jadwal/${params.location}/${params.date}`)
      .then((res) => res.json())
      .then(({ data }) => {
        // console.log(data);
        delete data.jadwal.tanggal;
        delete data.jadwal.imsak;
        delete data.jadwal.terbit;
        delete data.jadwal.dhuha;
        delete data.jadwal.date;
        setData(data);
      })
      .catch(() => {
        setData(null);
        setError(true);
        setComplete(true);
      });
  }, [params]);

  // Mengatur waktu tanggal, jam, hari ini.
  useEffect(() => {
    const tId = setTimeout(() => {
      // Sholat berikutnya.
      if (data) {
        if (!complete) setComplete(true);
        if (data.jadwal) {
          // Mengambil sholat yang waktunya sudah paling dekat
          const times = Object.values(data.jadwal)
            .map((v) => new Date(`${moment().format('yyyy-MM-DD')}T${v}`).getTime())
            .map((v, i) => [Object.keys(data.jadwal)[i], v + 60000 - Date.now()])
            .sort((a, b) => a[1] - b[1])
            .filter((v) => v[1] > 0);

          const nextSubuh = new Date(`${moment().add(1, 'days').format('yyyy-MM-DD')}T${data.jadwal.subuh}`).getTime();
          times.push(['subuh', nextSubuh - Date.now()]);

          // Jika jadwal hari ini belum selesai
          if (times.length > 0) {
            // Mengatur countdown
            const distance = times[0][1];
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Memperbarui info sholat berikutnya
            setNext({
              name: times[0][0],
              countDown: `${hours > 0 ? `${hours} jam` : ''} ${minutes > 0 ? `${minutes} menit` : ''} ${
                hours > 0 || minutes > 0 ? 'menuju' : 'Waktunya sholat'
              }`,
            });
          } else {
            // Memperbarui tanggal jika jadwal hari ini sudah selesai
            const date = new Date();
            date.setDate(date.getDate() + 1);
            // setData(undefined);
            setParams({
              ...params,
              date: moment(date).format('yyyy/MM/DD'),
            });
          }
        }
      }
    }, 1000);
    return () => clearTimeout(tId);
  });

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState();
  const getLocation = async () => {
    if (search !== '') {
      await axios.get(`${baseUrl}sholat/kota/cari/${search}`).then((res) => {
        // console.log(res.data.data);
        const value = res.data.data;
        setLocation(value !== undefined ? value : null);
      });
    }
  };

  useEffect(() => {
    setLocation(undefined);
    const timer = setTimeout(() => {
      getLocation(search);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const [dialog, setDialog] = useState(false);
  const handleDialog = () => {
    setDialog(!dialog);
    if (location === undefined) getLocation();
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3} align="center">
            <img src={`/static/theme2/mosque.png`} alt="Ramadhan" />
          </Grid>
          {complete ? (
            <>
              {!error ? (
                <Grid item xs>
                  <Typography variant="body2">{next.countDown}</Typography>
                  <Typography variant="h4" textTransform="capitalize" gutterBottom>
                    {next.name}, {data?.jadwal[next.name]}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PinDropRounded color="primary" fontSize="small" />}
                    onClick={handleDialog}
                  >
                    {data?.lokasi.toLowerCase()}
                  </Button>
                </Grid>
              ) : (
                <Grid item xs>
                  <Typography gutterBottom>Gagal memuat data</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      setParams({
                        ...params,
                        location: '1204',
                      })
                    }
                  >
                    Muat ulang
                  </Button>
                </Grid>
              )}
            </>
          ) : (
            <Grid item xs>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', py: 1, mt: 0.4 }} width="50%" />
            </Grid>
          )}
        </Grid>
      </CardContent>
      <Dialog
        open={dialog}
        onClose={handleDialog}
        TransitionComponent={Transition}
        scroll="paper"
        sx={{ mt: 15 }}
        fullScreen
      >
        <Stack p={2}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1} ml={-1}>
            <IconButton onClick={handleDialog}>
              <ExpandMoreRounded />
            </IconButton>
            <Typography variant="h6">Lokasi</Typography>
          </Stack>
          <TextField
            id="search"
            size="small"
            placeholder="Cari kabupaten/kota"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
              endAdornment: search.length > 0 && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch('');
                      document.getElementById('search').focus();
                    }}
                  >
                    <CancelRounded fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            autoFocus
          />
        </Stack>
        <DialogContent dividers sx={{ p: 0 }}>
          {location !== undefined ? (
            location.length > 0 ? (
              <Card sx={{ borderRadius: 0 }}>
                {location.map(
                  (value, index) =>
                    index < 20 && (
                      <CardActionArea
                        key={index}
                        onClick={() => {
                          handleDialog();
                          setParams({ ...params, location: value.id });
                          setComplete(true);
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" spacing={2} p={2}>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="body2" textTransform="capitalize">
                              {value.lokasi.toLowerCase()}
                            </Typography>
                          </Stack>
                          <ChevronRightRounded color="action" />
                        </Stack>
                        {index + 1 < location.length && <Divider />}
                      </CardActionArea>
                    )
                )}
              </Card>
            ) : (
              <Stack alignItems="center" justifyContent="center" spacing={1} pt={10}>
                <HighlightOffRounded style={{ fontSize: 48 }} />
                <Typography variant="h6" align="center">
                  Pencarian "{search}" tidak ditemukan
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  Pastikan nama kabupaten/kota dieja dengan benar.
                </Typography>
              </Stack>
            )
          ) : search !== '' ? (
            <Stack spacing={4} p={2}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Stack>
          ) : (
            <Stack alignItems="center" justifyContent="center" spacing={1} pt={10}>
              <SearchRounded style={{ fontSize: 48 }} />
              <Typography variant="h6">Cari kabupaten/kota</Typography>
              <Typography variant="body2" color="text.secondary">
                Cari lokasi kabupaten/kota Anda.
              </Typography>
            </Stack>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
