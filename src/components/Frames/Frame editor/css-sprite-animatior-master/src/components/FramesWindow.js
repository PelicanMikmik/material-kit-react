import React, { useContext } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { Store } from "../Store";
import { updateCurrent } from "../Actions";

import CssFrame from "./CssFrame";
// import ClassStyles from '../styles/styles.less';
/**
 * Generate the list of frames including states for over/active
 * @param {object} props
 */
const FramesWindow = (props) => {
  const { state, dispatch } = useContext(Store);
  const { frames, width, height, currentFrame } = state;
  const { size = 2 } = props;

  return (
    <h3>
      {frames.map((frame, index) => (
        <Button
          className={`${"frame"} ${currentFrame === index ? "active" : null}`}
          key={`frame-${index}`}
          onClick={() => {
            updateCurrent(index, dispatch);
          }}
        >
          {index}
          <CssFrame frame={frame} width={width} height={height} size={size} />
        </Button>
      ))}
    </h3>
  );
};

FramesWindow.propTypes = {
  size: PropTypes.number,
};

export default FramesWindow;
