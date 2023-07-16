import React, { createContext, useReducer } from "react";
import { ColorList } from "./components/ColorPalette";

import { saveAs } from "file-saver";

/* Import Animation to Build */

import frames_circle3x3 from "./animations/circle3x3";
import frames_blue4x4 from "./animations/blue4x4";
import frames_pink2x2 from "./animations/pink2x2";
import frames_one1x1 from "./animations/one1x1";

/* simple deep clone function */
export const clone = (array) => {
  return JSON.parse(JSON.stringify(array));
};

const frames_blue4x4_Size = [4, 4];
const frames_empty3x3_Size = [3, 3];
const frames_pink2x2_Size = [2, 2];
const frames_one1x1_Size = [1, 1];

const frameArrey = [
  [frames_blue4x4, frames_blue4x4_Size],
  [frames_circle3x3, frames_empty3x3_Size],
  [frames_pink2x2, frames_pink2x2_Size],
  [frames_one1x1, frames_one1x1_Size],
];

/**
 * Set up Store with Config for Animation
 * Pixel grid width / height and blank array
 */
let width = 4;
let height = 4;
let cellLength = width * height;
let blankArray = [];
for (let i = 0; i < cellLength; i++) {
  blankArray.push({
    color: ColorList[0],
  });
}

const matrixExpand = (x, y, height) => {
  return x + height * y;
};
const frames = frameArrey[0][0];
/* if frames are imported load into state else load blank array */
const f = frames.length > 0 ? clone(frames) : [clone(blankArray)];
let dataSet = [];
export const initialState = {
  frames: f,
  width,
  height,
  currentFrame: 0,
  palette: ColorList,
  currentColor: ColorList[1],
  canvasArray: f[0],
  copyArray: clone(blankArray),
  blankArray,
  dataSet,
  framesArrey: frameArrey,
  SendFrameFromAppSpeed: 2,
  currentFrameindex: 0,
};

export const Store = createContext(initialState);

const exportFrames = (state) => {
  const { height, width, frames } = state;
  const expportFrames = clone(frames);
  let dataSet = expportFrames.map((frame) => {
    return frame.map((still, index) => {
      const x = index % width;
      const y = (index - x) / height;

      const objectPixel = {
        x,
        y,
        color: still.color,
      };

      return objectPixel;
    });
  });
  const tempTXT = JSON.stringify(dataSet);
  let blob = new Blob([tempTXT], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "Frame.txt");
  return { ...state, dataSet: dataSet };
};

const updateCurrent = (state, index) => {
  const { frames } = state;
  const config = {
    currentFrame: index,
    canvasArray: clone(frames[index]),
  };
  return { ...state, ...config };
};

const updateColor = (state, color) => {
  return { ...state, currentColor: color };
};

const updatePixel = (state, index) => {
  const { frames, currentFrame, canvasArray, currentColor } = state;
  const saveFrames = clone(frames);
  let tempArray = clone(canvasArray);

  if (tempArray[index].color !== currentColor) {
    tempArray[index].color = currentColor;
  } else {
    tempArray[index].color = "transparent";
  }

  saveFrames[currentFrame] = tempArray;
  return { ...state, canvasArray: tempArray, frames: saveFrames };
};

const newFrame = (state) => {
  const { height, width, blankArray } = state;
  let cellLength = width * height;
  let tempblankArray = [];
  for (let i = 0; i < cellLength; i++) {
    tempblankArray.push({
      color: ColorList[0],
    });
  }
  const config = {
    frames: [clone(blankArray)],
    canvasArray: clone(blankArray),
    currentFrame: 0,
  };

  return {
    ...state,
    ...config,
    canvasArray: tempblankArray,
    blankArray: tempblankArray,
  };
};

const addFrame = (state) => {
  const { frames, blankArray, currentFrame } = state;
  const newFrames = clone(frames);
  newFrames.splice(currentFrame + 1, 0, clone(blankArray));
  const config = {
    frames: newFrames,
    canvasArray: clone(blankArray),
    currentFrame: currentFrame + 1,
  };
  return { ...state, ...config };
};

const deleteFrame = (state) => {
  const { frames, currentFrame } = state;
  if (currentFrame === 0 && frames.length < 2) return state;
  const saveFrames = clone(frames);
  saveFrames.splice(currentFrame, 1);
  const newFrame = currentFrame > 0 ? currentFrame - 1 : 0;
  const newArray = frames[newFrame];
  return {
    ...state,
    frames: saveFrames,
    currentFrame: newFrame,
    canvasArray: newArray,
  };
};

const copyFrame = (state) => {
  const { canvasArray } = state;
  const tempArray = clone(canvasArray);
  return { ...state, copyArray: tempArray };
};

const pasteFrame = (state) => {
  const { frames, currentFrame, copyArray } = state;
  const tempCopy = clone(copyArray);
  const tempFrames = clone(frames);
  tempFrames[currentFrame] = tempCopy;
  return { ...state, frames: tempFrames, canvasArray: tempCopy };
};

const shiftFrame = (state, direction) => {
  const { height, width, canvasArray, frames, currentFrame } = state;
  const h = height - 1;
  const w = width - 1;
  const matrix = clone(canvasArray);
  const source = clone(canvasArray);
  for (let i = 0; i < matrix.length; i++) {
    const x = i % width;
    const y = (i - x) / height;
    let move = 0;
    let head = 0;
    switch (direction) {
      case "up":
        move = y + 1;
        head = move > h ? height - move : move;
        matrix[matrixExpand(x, y, height)] =
          source[matrixExpand(x, head, height)];
        break;
      case "down":
        move = y - 1;
        head = move < 0 ? move + height : move;
        matrix[matrixExpand(x, y, height)] =
          source[matrixExpand(x, head, height)];
        break;
      case "left":
        move = x + 1;
        head = move > w ? width - move : move;
        matrix[matrixExpand(x, y, height)] =
          source[matrixExpand(head, y, height)];
        break;
      case "right":
        move = x - 1;
        head = move < 0 ? move + width : move;
        matrix[matrixExpand(x, y, height)] =
          source[matrixExpand(head, y, height)];
        break;
      default:
    }
  }

  let tempFrames = frames;
  tempFrames[currentFrame] = matrix;
  return {
    ...state,
    frames: tempFrames,
    canvasArray: matrix,
  };
};

const updateWidthFrame = (state, action) => {
  return {
    ...state,
    width: action,
  };
};

const updateHightFrame = (state, action) => {
  return {
    ...state,
    height: action,
  };
};

const loadFrame = (state, frame, size, index) => {
  let cellLength = size[0] * size[1];
  let tempblankArray = [];
  for (let i = 0; i < cellLength; i++) {
    tempblankArray.push({
      color: ColorList[0],
    });
  }
  updateCurrent(state, 0);
  const config = {
    // canvasArray: clone(blankArray),
    // currentFrame: 0,
  };
  return {
    ...state,
    ...config,
    canvasArray: tempblankArray,
    blankArray: tempblankArray,
    copyArray: tempblankArray,
    width: size[0],
    height: size[1],
    frames: frame,
    currentFrameindex: index,
    currentFrame: 0,
  };
};

const SaveNewFrame = (state) => {
  const { frames, framesArrey, width, height } = state;

  const SaveNewFrameToList = clone(frames);
  let dataSet = SaveNewFrameToList.map((frame) => {
    return frame.map((still, index) => {
      const x = index % width;
      const y = (index - x) / height;

      const objectPixel = {
        x,
        y,
        color: still.color,
      };

      return objectPixel;
    });
  });
  const tempFrames = [dataSet, [width, height]];
  framesArrey.push(tempFrames);
  return {
    ...state,
  };
};

const ChangeSendFrameFromAppSpeed = (state, action) => {
  return {
    ...state,
    SendFrameFromAppSpeed: action,
  };
};

/**
 * Reducers for state/actions
 */

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT":
      return updateCurrent(state, action.index);
    case "UPDATE_COLOR":
      return updateColor(state, action.color);
    case "UPDATE_PIXEL":
      return updatePixel(state, action.index);
    case "UPDATE_ROW_PIXEL":
      return updateRowPixel(state, action.index);
    case "UPDATE_COLUMN_PIXEL":
      return updateColumnPixel(state, action.index);
    case "UPDATE_All_PIXEL":
      return updateAllPixel(state);
    case "UPDATE_RANDOM_PIXEL":
      return updaterandomPixel(state);
    case "UPDATE_All_TRANSPERENT_PIXEL":
      return updateAllTransperentPixel(state);
    case "SHIFT_FRAME":
      return shiftFrame(state, action.direction);
    case "NEW_FRAME":
      return newFrame(state);
    case "ADD_FRAME":
      return addFrame(state);
    case "DELETE_FRAME":
      return deleteFrame(state);
    case "COPY_FRAME":
      return copyFrame(state);
    case "PASTE_FRAME":
      return pasteFrame(state);
    case "EXPORT_FRAMES":
      return exportFrames(state);
    case "UPDATE_WIDTH_FRAME":
      return updateWidthFrame(state, action.index);
    case "UPDATE_HIGHT_FRAME":
      return updateHightFrame(state, action.index);
    // case "GENERATE_NEW_MARTRIX":
    //   return generateNewMatrix(state);
    case "LOAD_FRAME":
      return loadFrame(state, action.frame, action.size, action.index);
    case "SAVE_NEW_FRAME":
      return SaveNewFrame(state);
    case "CHANGE_SEND_FRAME_FROM_APP_SPEED":
      return ChangeSendFrameFromAppSpeed(state, action.index);
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}> {children} </Store.Provider>
  );
};
