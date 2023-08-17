import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  minWidth: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 0),
}));

// ----------------------------------------------------------------------

export default function UserPlayer({ socket }) {

  const [messages, setMessages] = useState([]);
  const [indexOfCurrentUser, setIndexOfCurrentUser] = useState("");
  const [indexOfCurrentFrame, setIndexOfCurrentFrame] = useState(0);
  const [colorBackGround, setColorBackGround] = useState('');
  const [playStatus, setPlayStatus] = useState('');
  const [playSpeed, setPlaySpeed] = useState(1);
  const messagesLength = messages.length;

  // ----------------------------------------------------------------------

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  //  UPDATE VARIABLES FROM STORE - width , height , play status , PLAY SPEED//////
  useEffect(() => {
    if (messagesLength === 0) {
      return;
    }

    setPlayStatus(messages[messages.length - 1].castStatus);
    setPlaySpeed(messages[messages.length - 1].text.SendFrameFromAppSpeed);
  }, [messagesLength]);

  //  UPDATE INDEX OF CURRENT USER//////
  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      const currentUser = users.find((user) => socket.id === user.socketID);
      setIndexOfCurrentUser(users.map((el) => el.socketID).indexOf(socket.id));
    });
  }, [socket, playStatus === 'play']);

  //  UPDATE INDEX OF CURRENT FRAME AND PLAY \ STOP //////
  useEffect(() => {
    let interval;
    switch (playStatus) {
      case 'play':
        interval = setInterval(() => {
          setIndexOfCurrentFrame((index) => (index + 1) % messages.at(-1).text.frames.length);
        }, 1000 * playSpeed);
        break;

      case 'load':
        setIndexOfCurrentFrame(0);
        setColorBackGround('grey');
        clearInterval(interval);
        break;

      default:
        clearInterval(interval);
        setIndexOfCurrentFrame(0);
    }

    return () => clearInterval(interval);
  }, [playStatus]);

  //  UPDATE BACKGROUND COLOR//////
  useEffect(() => {
    if (messagesLength === 0) {
      return;
    }
    if (indexOfCurrentUser > messages.at(-1).text.frames[indexOfCurrentFrame].length - 1) {
      setColorBackGround("wait for bigger frame size")
    } else
      setColorBackGround(messages.at(-1).text.frames[indexOfCurrentFrame][indexOfCurrentUser].color);
  }, [indexOfCurrentFrame]);

  return (
    <>
      <Helmet>
        <title> Starling </title>
      </Helmet>

      <Container sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: colorBackGround,
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vh',
      }}>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center', }}>
          <Typography variant="h3" paragraph>
            Hello
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Hello
          </Typography>
          <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Log out
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}

UserPlayer.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    // id: PropTypes.func.isRequired,
  }).isRequired,
};
