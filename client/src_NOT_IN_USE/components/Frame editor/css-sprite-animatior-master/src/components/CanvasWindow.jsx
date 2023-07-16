import React, { useContext } from "react";
import { Store } from "../Store";
import Button from "@mui/material/Button";
import { updatePixel } from "../Actions";

const PixelButton = ({ color, onClick, coordinates }) => (
    <Button
        style={{
            background: color,
            border: "solid",
            borderWidth: "2px",
        }}
        onClick={onClick}
    >
        ({coordinates.x},{coordinates.y})
    </Button>
);

const Row = ({ size, pixelRow }) => (
    <div className={size > 0 ? "pixelrow" : "row"} style={{ height: size }}>
        {pixelRow}
    </div>
);

const CanvasWindow = ({ size }) => {
    const { state, dispatch } = useContext(Store);
    const { canvasArray, width, height } = state;

    const generateFrame = () => {
        if (canvasArray === undefined) return null;

        let pixelRow = [];
        const frame = canvasArray.map((cell, index) => {
            const x = index % width;
            const y = Math.floor(index / width);

            const pixelId = `pixel-${x}-${y}`;

            const handleClick = () => {
                updatePixel(index, dispatch);
            };

            const pixelButton = (
                <PixelButton
                    key={pixelId}
                    color={cell.color}
                    onClick={handleClick}
                    coordinates={{ x, y }}
                />
            );

            pixelRow.push(pixelButton);
            if (x === width - 1) {
                const row = (
                    <Row size={size} pixelRow={pixelRow} key={`row${y}-${index}`} />
                );
                pixelRow = [];
                return row;
            }
            return null;
        });

        return frame;
    };

    return <div>{generateFrame()}</div>;
};

export default CanvasWindow;