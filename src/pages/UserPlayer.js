import { useEffect, useState, useContext } from "react";
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';

import AssignUsersToMatrix from '../components/Frames/AssignUsersToMatrix'
import { Store } from "../components/Frames/Frame editor/css-sprite-animatior-master/src/Store";


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

  const [showAssignUsersToMatrix, setShowAssignUsersToMatrix] = useState(true);
  const [messages, setMessages] = useState([]);
  const [indexOfCurrentUser, setIndexOfCurrentUser] = useState(-1);
  const [indexOfCurrentFrame, setIndexOfCurrentFrame] = useState(0);
  const [colorBackGround, setColorBackGround] = useState('');
  const [playStatus, setPlayStatus] = useState('');
  const [playSpeed, setPlaySpeed] = useState(1);
  const [userName, setuserName] = useState('');

  const messagesLength = messages.length;
  // const { state, dispatch } = useContext(Store);
  const { state } = useContext(Store);
  const { UserList } = state;


  // ----------------------------------------------------------------------
  useEffect(() => {
    const findUserNameBySocketID = (array, socketIDToFind) => {
      const foundUser = array.find(user => user.socketID === socketIDToFind);
      return foundUser ? foundUser.userName : null;
    };
    setuserName(findUserNameBySocketID(UserList, socket.id))
  }, [UserList, socket.id]);


  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  //  UPDATE VARIABLES FROM STORE - , play status , PLAY SPEED//////
  useEffect(() => {
    if (messagesLength === 0) {
      return;
    }
    setPlayStatus(messages[messages.length - 1].castStatus);
    setPlaySpeed(messages[messages.length - 1].text.SendFrameFromAppSpeed);
  }, [messagesLength, messages]);

  //  UPDATE INDEX OF CURRENT USER//////
  const playStatusDependencies = 'play';

  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      const indexOfCurrentUser = users.findIndex((user) => socket.id === user.socketID);
      setIndexOfCurrentUser(indexOfCurrentUser);
    });
  }, [socket, playStatusDependencies]);
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
  }, [playStatus, playSpeed, messages]);

  //  UPDATE BACKGROUND COLOR//////
  useEffect(() => {
    if (messagesLength === 0) {
      return;
    }
    const currentFrame = messages.at(-1).text.frames[indexOfCurrentFrame];
    if (currentFrame && currentFrame.length > indexOfCurrentUser) {
      setColorBackGround(currentFrame[indexOfCurrentUser+1].color);
    } else {
      setColorBackGround("wait for bigger frame size");
    }
  }, [indexOfCurrentFrame, messages, indexOfCurrentUser, messagesLength]);








  

  const toggleAssignUsersToMatrix = () => {
    setShowAssignUsersToMatrix(!showAssignUsersToMatrix);
  };

  const UserLogedOut = () => {
    socket.emit("disconnect", socket.id)
    console.log("user logged out");
  }

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
            Hello {userName}
          </Typography>

          <Typography sx={{ textAlign: 'center', alignItems: 'center', }}>
            {indexOfCurrentUser === -1 ? "wait for admin to start casting" : "check your position"}
          </Typography>

          {/* <Box
            component="img"
            src="/assets/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          /> */}

          {/* Button to toggle AssignUsersToMatrix visibility */}
          <Button onClick={toggleAssignUsersToMatrix} variant="contained" size="small" >
            {showAssignUsersToMatrix ? 'Hide Assign Users' : 'Show matrix postion Users'}
          </Button>

          {/* Render AssignUsersToMatrix if showAssignUsersToMatrix is true */}
          {showAssignUsersToMatrix ? (
            <AssignUsersToMatrix
              messages={messages}
              indexOfCurrentUser={indexOfCurrentUser}
              socket={socket}
            />
          ) : null}

          <Button to="/" size="small" variant="contained" component={RouterLink} onClick={UserLogedOut}>
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
