import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography, Grid } from '@mui/material';

// components

import FrameEditor from "../components/Frames/Frame editor/FrameEditor";

// mock

// ----------------------------------------------------------------------

export default function EditorPage(socket) {
  console.log(socket);
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
          <Grid>
            <FrameEditor socket={socket} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
