import React, { useContext } from "react";
import { Store } from "../Store";
import { updateCurrent } from "../Actions";
import Button from "@mui/material/Button";

import CssFrame from "./CssFrame";
// import ClassStyles from '../styles/styles.less';
/**
 * Generate the list of frames including states for over/active
 * @param {object} props
 */
const FramesWindow = (props) => {
  const { state, dispatch } = useContext(Store);
  const { frames,width, height, currentFrame } = state;
  const { size = 2 } = props;

  return (
    <h3>
      {frames.map((frame, index) => {
        return (
          <Button
            className={`${"frame"} ${currentFrame === index ? "active" : null}`}
            key={`frame-${index}`}
            onClick=
            {() => {
              updateCurrent(index, dispatch);
            }}>
            {index}
            <CssFrame frame={frame} width={width} height={height} size={size} />
          </Button>
        );
      })}
    </h3>
  );
};

export default FramesWindow;
