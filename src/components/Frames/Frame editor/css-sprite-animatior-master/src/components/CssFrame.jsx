import React, { useContext } from "react";
import { Box } from "@mui/material";


import PropTypes from "prop-types";
import { Store } from "../Store";

/**
  CssFrame 
  Generate CSS boxshadow pixel display from frame data.
*/

const CssFrame = (props) => {
  const { frame, size } = props;
  const { state } = useContext(Store);
  const { width, height, blankArray } = state;

  /**
   * Generate a single css box-shadow which produces
   * the sprite/pixel frame.
   * @param {array} data
   * @param {number} size
   */
  const generateCSSFrame = (data, size) => {
    if (data === undefined) data = blankArray;
    let cssString = "";

    data.forEach((cell, index) => {
      if (cell.color !== "transparent") {
        const x = index % width;
        const y = (index - x) / height;
        if (index > 0 && cssString !== "") cssString += ",";
        cssString += `${Math.floor(size * (x + 1))}px ${Math.floor(size * (y + 1))}px 0 ${cell.color}`;
      }
    });

    const inlineStyle = {
      // boxSizing: "border-box",
      width: size,
      height: size,
      background: "transparent",
      boxShadow: cssString,
      margin: -size,
    };

    return <div style={inlineStyle}> </div>;
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={size} width={size}>
      {generateCSSFrame(frame, size)}
    </Box>
  );
};

CssFrame.propTypes = {
  // frame: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
};

export default CssFrame;
