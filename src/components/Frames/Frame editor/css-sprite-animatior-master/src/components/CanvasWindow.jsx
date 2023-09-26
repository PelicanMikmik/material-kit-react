import React, { useContext } from "react";
import PropTypes from 'prop-types';

// @mui
import {
    Card,
    Button,
    Grid,
    CardContent,
    CardHeader,
} from '@mui/material';

import { Store } from "../Store";
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

PixelButton.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

const Row = ({ size, pixelRow }) => (
    <div className={size > 0 ? "pixelrow" : "row"} style={{ height: size }}>
        {pixelRow}
    </div>
);

Row.propTypes = {
    size: PropTypes.number.isRequired,
    pixelRow: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const CanvasWindow = ({ size }) => {
    const { state, dispatch } = useContext(Store);
    const { canvasArray, width } = state;

    const generateFrame = () => {
        if (canvasArray === undefined) return null;

        let pixelRow = [];
        const frame = canvasArray.map((cell, index) => {
            const x = (index % width) + 1;
            const y = 1 + (Math.floor(index / width));

            const pixelId = `pixel-${x}-${y}`;

            const handleClick = () => {
                updatePixel(index, dispatch);
            };

            const pixelButton = (
                <PixelButton
                    key={`${pixelId}-${index}`}
                    color={cell.color}
                    onClick={handleClick}
                    coordinates={{ x, y }}
                />
            );

            pixelRow.push(pixelButton);
            if (x === width) {
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

    return (

        <Grid>
            <Card >
                <CardHeader title='current frame ' subheader='click on cell to change color' />
                <CardContent>
                    <>{generateFrame()}</>
                </CardContent>
            </Card>
        </Grid>
    )
};

CanvasWindow.propTypes = {
    size: PropTypes.number.isRequired,
};

export default CanvasWindow;