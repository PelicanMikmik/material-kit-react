import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useContext } from 'react';

// @mui
import { Grid, Container, Typography, Button, Stack, CardHeader, Card, CardContent } from '@mui/material';
// components
import Iconify from '../components/iconify';
import FrameLoader from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/FrameLoader";
import AnimationWindow from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/AnimationWindow";

// sections
import {

  AppTrafficBySite,
  AppWidgetSummary,

} from '../sections/@dashboard/app';

import { Store } from "../components/Frames/Frame editor/css-sprite-animatior-master/src/Store";

// ----------------------------------------------------------------------

export default function DashboardAppPage({ socket }) {
  const { state, dispatch } = useContext(Store);
  const { UserList, currentFrameindex, currentFrame, frames } = state;


  const handleSendMessage = (e) => {
    if (e === "play") {
      socket.emit("message", {
        castStatus: "play",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      // setMessage("");
    }
    if (e === "stop") {
      socket.emit("message", {
        castStatus: "stop",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      // setMessage("");
    }
    if (e === "load") {
      socket.emit("message", {
        castStatus: "load",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      // setMessage("");
    }
  };


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

          <Grid item xs={12} sm={6} md={6} >
            <Card >
              <CardHeader title='Controlls' subheader='' />
              <CardContent>


                <Button
                  variant="contained"
                  type="button"
                  className=""
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage("load");
                  }}
                >
                  ---LOAD---
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className=""
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage("play");
                  }}
                >
                  ---PLAY---
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  className=""
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendMessage("stop");
                  }}
                >
                  ---STOP---
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <FrameLoader />
          </Grid>

          <Grid item xs={12} sm={4} md={6} >
            <AnimationWindow />
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <AppWidgetSummary title="Current Matrix" total={currentFrameindex} color="info" />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <AppWidgetSummary title="Current Casted frame No." total={currentFrame} color="info" />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <AppWidgetSummary title="Active Useres" total={UserList.length} color="info" />
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <AppWidgetSummary title="Matrix size" total={frames[0].length} color="info" />
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
