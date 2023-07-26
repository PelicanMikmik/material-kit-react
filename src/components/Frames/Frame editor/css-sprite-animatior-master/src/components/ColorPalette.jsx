import React, { useContext, useState } from "react";
import CompactPicker from "react-color";
import { Card, Grid, Box, CardContent, CardHeader } from "@mui/material";
import { Store } from "../Store";
import { updateColor } from "../Actions";

export const ColorList = [];

const ColorPalette = (props) => {
  const { state, dispatch } = useContext(Store);
  const [color, setColor] = useState("#000000"); // Default color: black

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    updateColor(newColor.hex, dispatch);
  };

  return (
    <>
      <Grid >
        <Card>
          <CardHeader title="Choose color" subheader="" />
          <CardContent>
            <Box sx={{ mt: 4 }}>
              <CompactPicker color={color} onChange={handleColorChange} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ColorPalette;

// import React, { useState } from "react";
// import { Card, CardContent, Box } from "@mui/material";
// import { ChromePicker } from "react-color";

// const ColorPickerControls = () => {
//   const [color, setColor] = useState("#000000"); // Default color: black

//   const handleColorChange = (newColor) => {
//     setColor(newColor.hex);
//   };

//   return (
//     <Card sx={{ width: 300 }}>
//       <CardContent>
//         <Box sx={{ mt: 2 }}>
//           <ChromePicker color={color} onChange={handleColorChange} />
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ColorPickerControls;

// export const ColorList = [
// ];
