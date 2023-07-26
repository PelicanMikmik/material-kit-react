import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// @mui
import {
  Card,
  Button,
  Grid,
  Slider,
  CardContent,
  CardHeader,
} from '@mui/material';



import FrameLoader from "./FrameLoader";
import { Store } from "../Store";

import {
  addFrame,
  newFrame,
  copyFrame,
  pasteFrame,
  deleteFrame,
  shiftFrame,
  exportFrames,
  updateWidthFrame,
  updateHightFrame,
  // generateNewMatrix,
  SaveNewFrame,
  ChangeSendFrameFromAppSpeed,
} from "../Actions";

const Controlls = ({ socket }) => {
  const { state, dispatch } = useContext(Store);
  const { SendFrameFromAppSpeed } = state;
  const [, setMessage] = useState("");
  const [tempWidth, settempWidth] = useState("");
  const [tempHeight, settempHeight] = useState("");


  const handleSendMessage = (e) => {
    if (e === "play") {
      socket.emit("message", {
        castStatus: "play",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
    if (e === "stop") {
      socket.emit("message", {
        castStatus: "stop",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
    if (e === "load") {
      socket.emit("message", {
        castStatus: "load",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const checkKey = (event) => {
      const code = event.keyCode;
      switch (code) {
        case 38:
          shiftFrame("up", dispatch);
          break;
        case 40:
          shiftFrame("down", dispatch);
          break;
        case 39:
          shiftFrame("right", dispatch);
          break;
        case 37:
          shiftFrame("left", dispatch);
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      checkKey(event);
    };

    document.addEventListener("keyup", handleKeyUp);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]); // Empty dependency array to ensure the effect runs only once

  return (
    <>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Card >
            <CardHeader title='Controlls' subheader='' />
            <CardContent>
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  updateWidthFrame(parseInt(tempWidth, 10), dispatch);
                  updateHightFrame(parseInt(tempHeight, 10), dispatch);
                  newFrame(dispatch);
                }}
              >
                New frame list
              </Button>
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  addFrame(dispatch);
                }}
              >
                Add frame
              </Button>
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  deleteFrame(dispatch);
                }}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  copyFrame(dispatch);
                }}
              >
                Copy
              </Button>{" "}
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  pasteFrame(dispatch);
                }}
              >
                Paste
              </Button>
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  exportFrames(dispatch);
                }}
              >
                Export
              </Button>{" "}
              <Button
                type="button"
                variant="outlined"
                className=""
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  SaveNewFrame(dispatch);
                }}
              >
                Save to list
              </Button>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card >
            <CardHeader title='New Frame size ' subheader='[width / height]' />
            <CardContent>
              <input
                className="textHolder"
                type="number"
                step='1'
                min='1'
                max='8'
                placeholder="Width"
                onChange={(e) => {
                  settempWidth(e.target.value)
                }}
              />
              <input
                className="textHolder"
                type="number"
                step='1'
                min='1'
                max='8'
                placeholder="height"
                onChange={(e) => {
                  settempHeight(e.target.value)
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card >
            <CardHeader title='Casting Speed ' subheader='[seconds]' />
            <CardContent>
              <Slider
                value={SendFrameFromAppSpeed}
                onChange={(e) =>
                  ChangeSendFrameFromAppSpeed(e.target.value, dispatch)
                }
                step={0.5}
                min={0.5}
                max={10}
                valueLabelDisplay="on"
                size="small"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FrameLoader />
        </Grid>
      </Grid>
    </>
  );
};

Controlls.propTypes = {
  socket: PropTypes.object.isRequired,
};



/* <Stack
spacing={2}
direction={{ xs: 'column', sm: 'row' }}
spacing={{ xs: 1, sm: 2, md: 4 }}>

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
</Stack> */



export default Controlls;



