import React, { useContext } from "react";
import { Store } from "../Store";
// import { CompactPicker } from "react-color";
import { updateColor } from "../Actions";

export const ColorList = [
];

const ColorPalette = (props) => {
  const { state, dispatch } = useContext(Store);

  return (
    <div>
      {/* <CompactPicker
        onChangeComplete={(e) => {
          updateColor(e.hex, dispatch);
        }}
      /> */}
    </div>
  );

};

export default ColorPalette;
