import React, { useContext } from "react";
import Grid from '@mui/material/Grid'; // Grid version 1
import Container from '@mui/material/Container'; // Grid version 1

import CanvasWindow from "./CanvasWindow";
import AnimationWindow from "./AnimationWindow";
import FramesWindow from "./FramesWindow";
import FrameLoader from "./FrameLoader";
import ColorPalette from "./ColorPalette";
import Controlls from "./Controlls";

const FramePage = ({ socket }) => {
  return (
    <div>
      <div>
        <Container maxWidth="sm">
          <Grid >
            <Controlls socket={socket} />
          </Grid>
          <Grid >
            <CanvasWindow />
          </Grid>
          <Grid >
            <ColorPalette />
            <FrameLoader />
            <AnimationWindow />
          </Grid>
          <Grid >
            <FramesWindow />
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default FramePage;
