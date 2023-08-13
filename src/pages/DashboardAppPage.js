import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import FrameLoader from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/FrameLoader";
import AnimationWindow from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/AnimationWindow";

// sections
import {

  AppTrafficBySite,
  AppWidgetSummary,

} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {


  return (
    <>
      <Helmet>
        <title> Starling: Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Starling: Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Current Matrix" total={700} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Current Casted frame No." total={1331} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active Useres" total={65656} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Matrix size" total={234} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FrameLoader />
          </Grid>

          <Grid item xs={12} sm={6} md={6} >
            <AnimationWindow />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

DashboardAppPage.propTypes = {
  socket: PropTypes.shape({
    // emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
  }).isRequired,
};
