import React from "react";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CanvasWindow from "./CanvasWindow";
import AnimationWindow from "./AnimationWindow";
import FramesWindow from "./FramesWindow";
import FrameLoader from "./FrameLoader";
import ColorPalette from "./ColorPalette";
import Controlls from "./Controlls";

const FramePage = ({ socket }) => (
  <div>
    <div>
      <Container >
        <Grid >
          <Controlls socket={socket} />
          {/* <FrameLoader /> */}
          <CanvasWindow />
          <ColorPalette />
          <AnimationWindow />
        </Grid>
        <Grid>
          <FramesWindow />
        </Grid>
      </Container>
    </div>
  </div>
);

FramePage.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default FramePage;
