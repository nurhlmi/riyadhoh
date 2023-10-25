import { useState } from 'react';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Checkbox, Divider, IconButton, Stack, Typography } from '@mui/material';
import moment from 'moment';

export default function SholatSunnahRawatibGhairu() {
  const [sholat, setSholat] = useState([
    {
      title: 'Qabliyah Dzuhur (2 Rakaat)',
      progress: 0,
    },
    {
      title: `Ba'diyah Dzuhur (4 Rakaat)`,
      progress: 0,
    },
    {
      title: 'Qabliyah Ashar (4 Rakaat)',
      progress: 0,
    },
    {
      title: 'Qabliyah Maghrib (2 Rakaat)',
      progress: 0,
    },
    {
      title: 'Qabliyah Isya (2 Rakaat)',
      progress: 0,
    },
  ]);

  const handleCheckbox = (name, key) => {
    let progress = 0;
    if (name === 'jamaah') {
      progress = 100;
    } else {
      progress = 50;
    }
    const newState = sholat.map((value, index) =>
      index === key
        ? {
            ...value,
            progress: value.progress !== progress ? progress : 0,
          }
        : value
    );
    setSholat(newState);
  };

  const [date, setDate] = useState(moment(new Date()).format('yyyy-MM-DD'));
  const yesterday = ((d) => moment(new Date(d.setDate(d.getDate() - 1))).format('yyyy-MM-DD'))(new Date(date));
  const tomorrow7 = ((d) => moment(new Date(d.setDate(d.getDate() + 1))).format('yyyy-MM-DD'))(new Date(date));
  const tomorrow0 = new Date(tomorrow7);
  const tomorrow = tomorrow0.setHours(tomorrow0.getHours() - 7);

  return (
    <Card>
      <Stack direction="row" alignItems="center" justifyContent="space-between" m={1.1}>
        <Box>
          <IconButton onClick={() => setDate(yesterday)}>
            <ChevronLeftRounded />
          </IconButton>
        </Box>
        <Button>{moment(date).format('dddd, LL')}</Button>
        <Box>
          <IconButton onClick={() => setDate(tomorrow)} disabled={new Date().valueOf() < new Date(tomorrow).valueOf()}>
            <ChevronRightRounded />
          </IconButton>
        </Box>
      </Stack>
      <Divider />
      <CardContent sx={{ pr: 1.5, pb: '1rem!important' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography fontWeight="bold">Sholat Sunnah Rawatib (Ghairu Muakkad)</Typography>
        </Stack>
        {sholat.map((value, index) => (
          <Stack direction="row" alignItems="center" justifyContent="space-between" key={index}>
            <Typography color="text.secondary">{value.title}</Typography>
            <Stack direction="row">
              <Checkbox onChange={() => handleCheckbox('jamaah', index)} checked={value.progress === 100} />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
