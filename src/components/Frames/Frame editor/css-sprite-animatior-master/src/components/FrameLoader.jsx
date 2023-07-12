import React, { useContext } from "react";
import { Store } from "../Store";
import { loadFrame } from "../Actions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const FrameLoader = (props) => {
  const { state, dispatch } = useContext(Store);
  const { framesArrey } = state;
  
  const frameLoader = framesArrey.map((framesArrey, index) => {
    return (
      <Button
        tabIndex={index}
        href="#"
        key={index}
        type="button"
        className="btn "
        style={{}}
        onClick={(e) => {
          e.preventDefault();
          loadFrame(framesArrey[0], framesArrey[1], index, dispatch);
        }}
      >
        No.{index}
      </Button>
    );
  });

  return (
    <div>
      <h4>
        Choose Predefined frames
      </h4>
      <ButtonGroup>{frameLoader}</ButtonGroup>
    </div>
  );
};

export default FrameLoader;
