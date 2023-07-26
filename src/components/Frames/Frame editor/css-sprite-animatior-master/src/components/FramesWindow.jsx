import React, { useContext } from "react";
import {
  Card,
  Button,
  CardContent,
  CardHeader,
} from '@mui/material';

import { Store } from "../Store";
import { updateCurrent } from "../Actions";

import CssFrame from "./CssFrame";
// import ClassStyles from '../styles/styles.less';
/**
 * Generate the list of frames including states for over/active
 * @param {object} props
 */
const FramesWindow = () => {
  const { state, dispatch } = useContext(Store);
  const { frames, width, height, currentFrame } = state;
  

  return (
    <Card >
      <CardHeader title='Choose frame to edit ' subheader='' />
      <CardContent>
          {frames.map((frame, index) => (
            <Button
              className={`${"frame"} ${currentFrame === index ? "active" : null}`}
              key={`frame-${index}`}
              onClick={() => {
                updateCurrent(index, dispatch);
              }}
            >
              {index}
              <CssFrame frame={frame} width={width} height={height} size={8} />
            </Button>
          ))}
      </CardContent>
    </Card>
  );
};



export default FramesWindow;
