import React, { useEffect, useState, useContext } from "react";
// @mui
import {
  Card, 
  Box,
  Grid,
  CardContent,
  CardHeader,
} from '@mui/material';

import { Store } from "../Store";
import CssFrame from "./CssFrame";

/*
  AnimationWindow | Generate Animation from CssFrame component.
*/

const AnimationWindow = () => {
  // const { size } = 20;

  const { state } = useContext(Store);
  const { frames } = state;
  const [stepFrame, moveFrame] = useState(0);
  let ani;

  useEffect(() => {
    clearTimeout(ani);
    const timer = setTimeout(() => {
      let newFrame = stepFrame + 1;
      if (newFrame > frames.length - 1) {
        newFrame = 0;
      }
      moveFrame(newFrame);
    }, 500);
    return () => clearTimeout(timer);
  });
  return (
    <Grid >
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardHeader title="Current Frame Animation" subheader={`Frame No ${stepFrame}`} />
        <CardContent sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ mb: 8 }}>
            <CssFrame size={15} frame={frames[stepFrame]} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
};

export default AnimationWindow;
