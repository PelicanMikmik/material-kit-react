import React, { createContext, useReducer } from "react";
import { ColorList } from "./components/ColorPalette";

// import { saveAs } from "file-saver";

/* Import Animation to Build */

import framesCircle3x3  from "./animations/circle3x3";
import framesBlue4x4 from "./animations/blue4x4";
import framesPink2x2 from "./animations/pink2x2";
import framesOne1x1 from "./animations/one1x1";

/* simple deep clone function */
export const clone = (array) => JSON.parse(JSON.stringify(array));


const framesBlue4x4Size  = [4, 4];
const framesEmpty3x3Size = [3, 3];
const framesPink2x2Size = [2, 2];
const framesOne1x1Size = [1, 1];

const frameArrey = [
  [framesBlue4x4, framesBlue4x4Size ],
  [framesCircle3x3 , framesEmpty3x3Size],
  [framesPink2x2, framesPink2x2Size],
  [framesOne1x1, framesOne1x1Size],
];

/**
 * Set up Store with Config for Animation
 * Pixel grid width / height and blank array
 */
const width = 4;
const height = 4;
const cellLength = width * height;
const blankArray = [];
for (let i = 0; i < cellLength; i += 1) {
  blankArray.push({
    color: ColorList[0],
  });
}

const matrixExpand = (x, y, height) => x + height * y;

const frames = frameArrey[0][0];
/* if frames are imported load into state else load blank array */
const f = frames.length > 0 ? clone(frames) : [clone(blankArray)];
const dataSet = [];
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
  const dataSet = expportFrames.map((frame) =>
    frame.map((still, index) => {
      const x = index % width;
      const y = (index - x) / height;

      const objectPixel = {
        x,
        y,
        color: still.color,
      };

      return objectPixel;
    })
  );

  // const tempTXT = JSON.stringify(dataSet);
  // let blob = new Blob([tempTXT], { type: "text/plain;charset=utf-8" });
  // saveAs(blob, "Frame.txt");
  return { ...state, dataSet };
};

const updateCurrent = (state, index) => {
  const { frames } = state;
  const config = {
    currentFrame: index,
    canvasArray: clone(frames[index]),
  };
  return { ...state, ...config };
};

const updateColor = (state, color) => ({ ...state, currentColor: color });

const updatePixel = (state, index) => {
  const { frames, currentFrame, canvasArray, currentColor } = state;
  const saveFrames = clone(frames);
  const tempArray = clone(canvasArray);

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
  const cellLength = width * height;
  const tempblankArray = [];
  for (let i = 0; i < cellLength; i += 1) {
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
  for (let i = 0; i < matrix.length; i += 1) {
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

  const tempFrames = frames;
  tempFrames[currentFrame] = matrix;
  return {
    ...state,
    frames: tempFrames,
    canvasArray: matrix,
  };
};

const updateWidthFrame = (state, action) => ({ ...state, width: action, });

const updateHightFrame = (state, action) => ({ ...state, height: action, });

const loadFrame = (state, frame, size, index) => {
  const cellLength = size[0] * size[1];
  const tempblankArray = [];
  for (let i = 0; i < cellLength; i += 1) {
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
  const dataSet = SaveNewFrameToList.map((frame) =>
    frame.map((still, index) => {
      const x = index % width;
      const y = (index - x) / height;

      const objectPixel = {
        x,
        y,
        color: still.color,
      };

      return objectPixel;
    })
  );
  const tempFrames = [dataSet, [width, height]];
  framesArrey.push(tempFrames);
  return {
    ...state,
  };
};

const ChangeSendFrameFromAppSpeed = (state, action) => ({ ...state, SendFrameFromAppSpeed: action });

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
    // case "UPDATE_ROW_PIXEL":
    //   return updateRowPixel(state, action.index);
    // case "UPDATE_COLUMN_PIXEL":
    //   return updateColumnPixel(state, action.index);
    // case "UPDATE_All_PIXEL":
    //   return updateAllPixel(state);
    // case "UPDATE_RANDOM_PIXEL":
    //   return updaterandomPixel(state);
    // case "UPDATE_All_TRANSPERENT_PIXEL":
    //   return updateAllTransperentPixel(state);
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
// there was a {child} inside the     export const StoreProvider = (child) => {....<Store.Provider value={{ state, dispatch }}>{child}  </Store.Provider>
export const StoreProvider = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>  </Store.Provider>
  );
};
