import { Container, Stack } from '@mui/material';
import Page from '../components/Page';
import SholatFardhu from '../sections/SholatFardhu';
import SholatSunnahRawatib from '../sections/SholatSunnahRawatib';
import SholatSunnahRawatibGhairu from '../sections/SholatSunnahRawatibGhairu';
import SholatSunnah from '../sections/SholatSunnah';

export default function Sholat() {
  return (
    <Page title="Sholat" headerNavigation>
      <Container>
        <Stack spacing={3}>
          <SholatFardhu />
          <SholatSunnahRawatib />
          <SholatSunnahRawatibGhairu />
          <SholatSunnah />
        </Stack>
      </Container>
    </Page>
  );
}
