import React from "react";
import PropTypes from "prop-types";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CanvasWindow from "./CanvasWindow";
import AnimationWindow from "./AnimationWindow";
import FramesWindow from "./FramesWindow";
import ColorPalette from "./ColorPalette";
import Controlls from "./Controlls";

const FramePage = ({ socket }) => (
  <div>
    <div>
      <Container >
        <Grid >
          <Controlls socket={socket} />
        </Grid>
        <Grid item xs={12} sm={6} md={6} >
          <ColorPalette />
          <AnimationWindow />
        </Grid>
        <Grid >
          <CanvasWindow />
        </Grid>
        <Grid>
          <FramesWindow />
        </Grid>
      </Container>
    </div>
  </div >
);

FramePage.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default FramePage;
