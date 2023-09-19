import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from 'react';

// @mui
import { Grid, Container, Typography, Button, CardHeader, Card, CardContent } from '@mui/material';
// components
import FrameLoader from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/FrameLoader";
import AnimationWindow from "../components/Frames/Frame editor/css-sprite-animatior-master/src/components/AnimationWindow";
import AssignUsersToMatrix from "../components/Frames/AssignUsersToMatrix"

// sections
import {

  AppTrafficBySite,

} from '../sections/@dashboard/app';

import { Store } from "../components/Frames/Frame editor/css-sprite-animatior-master/src/Store";

// ----------------------------------------------------------------------

export default function DashboardAppPage({ socket }) {
  const [messages, setMessages] = useState([]);
  const [playStatus, setPlayStatus] = useState('stop');
  const [indexOfCurrentUser, setIndexOfCurrentUser] = useState(0);
  const { state, dispatch } = useContext(Store);
  const { UserList, currentFrameindex, currentFrame, frames } = state;

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  //  UPDATE INDEX OF CURRENT USER//////
  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      const currentUser = users.find((user) => socket.id === user.socketID);
      setIndexOfCurrentUser(users.map((el) => el.socketID).indexOf(socket.id));
    });
  }, [playStatus === 'play']);

  const handleSendMessage = (e) => {
    if (e === "play") {
      socket.emit("message", {
        castStatus: "play",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setPlayStatus("PLAYING")
    }
    if (e === "stop") {
      socket.emit("message", {
        castStatus: "stop",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setPlayStatus("STOP")
    }
    if (e === "load") {
      socket.emit("message", {
        castStatus: "load",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setPlayStatus("LOADED")
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

          <Grid item xs={12} sm={12} md={6}>
            <AssignUsersToMatrix
              messages={messages}
              indexOfCurrentUser={indexOfCurrentUser}
              socket={socket} />
          </Grid>



          <Grid item xs={12} md={6} lg={6}>
            <AppTrafficBySite
              title="INFO"
              list={[
                {
                  name: 'Matrix size',
                  value: frames[0].length,
                },
                {
                  name: `Play status: ${playStatus}`,
                  value: 0,
                },
                {
                  name: 'Active Useres',
                  value: UserList.length,
                },
                {
                  name: 'Current Casted frame No.',
                  value: currentFrame,
                },
                {
                  name: 'Current Matrix',
                  value: currentFrameindex,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} >
            <AnimationWindow />
          </Grid>

          {/* <Grid item xs={6} sm={4} md={3}>
                <AppWidgetSummary title="Current Matrix" total={currentFrameindex} color="info" />
              </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

DashboardAppPage.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    // id: PropTypes.func.isRequired,

  }).isRequired,

};