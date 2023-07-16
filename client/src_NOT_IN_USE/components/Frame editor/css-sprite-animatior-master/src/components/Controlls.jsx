import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import {
  addFrame,
  saveFrame,
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

const Controlls = ({ socket }, props) => {
  const { state, dispatch } = useContext(Store);
  const { width, height, SendFrameFromAppSpeed } = state;
  const [message, setMessage] = useState("");
  const [tempWidth, settempWidth] = useState("");
  const [tempHeight, settempHeight] = useState("");


  const handleSendMessage = (e) => {
    if (e == "play") {
      socket.emit("message", {
        castStatus: "play",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
    if (e == "stop") {
      socket.emit("message", {
        castStatus: "stop",
        text: state,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      setMessage("");
    }
    if (e == "load") {
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
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
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
      </ButtonGroup>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
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
      </ButtonGroup>
      <div>
        <Typography id="input-textHolder"> New Frame size [width / height]</Typography>
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
        <Typography id="input-slider">Casting Speed [seconds]</Typography>
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
      </div>
    </div>
  );
};

export default Controlls;
