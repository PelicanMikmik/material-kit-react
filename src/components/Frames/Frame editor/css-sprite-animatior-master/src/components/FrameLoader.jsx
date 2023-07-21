import React, { useContext } from "react";
// @mui
import {
  Card,
  Button,
  Grid,
  CardContent,
  CardHeader,
} from '@mui/material';

import { Store } from "../Store";
import { loadFrame } from "../Actions";

const FrameLoader = () => {
  const { state, dispatch } = useContext(Store);
  const { framesArrey } = state;

  const frameLoader = framesArrey.map((framesArrey, index) => (
    <Button
      tabIndex={index}
      href="#"
      key={index}
      type="button"
      className="btn"
      style={{}}
      onClick={(e) => {
        e.preventDefault();
        loadFrame(framesArrey[0], framesArrey[1], index, dispatch);
      }}
    >
      No.{index}
    </Button>
  ));

  return (
    <>

      <Card >
        <CardHeader title='Choose Predefined frames ' subheader='' />
        <CardContent>
          {frameLoader}
        </CardContent>
      </Card>
    </>
  );
};

export default FrameLoader;
