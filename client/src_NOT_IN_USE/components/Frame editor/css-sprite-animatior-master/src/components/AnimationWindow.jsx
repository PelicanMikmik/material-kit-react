import React, { useEffect, useState, useContext } from "react";
import { Store } from "../Store";
import CssFrame from "./CssFrame";

/**
  AnimationWindow | Generate Animation from CssFrame component.
**/

const AnimationWindow = (props) => {
  const { size } = 20;

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
  return <CssFrame size={20} frame={frames[stepFrame]} />;
};

export default AnimationWindow;
