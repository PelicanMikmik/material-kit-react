import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid } from '@mui/material';

// components
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';
// mock

// ----------------------------------------------------------------------

export default function EditorPage() {

  return (
    <>
      <Helmet>
        <title> Starling: Editor</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Editor
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={1} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>

      </Container>
    </>
  );
}
