import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
    Card,
    CardContent,
    CardHeader,
    TableRow,
    TableCell,
    TableBody,
    Table,
} from '@mui/material';

const AssignUsersToMatrix = ({ messages, indexOfCurrentUser, socket }) => {
    const [usersList, setUsersList] = useState([]);
    const numRows = messages.length === 0 ? 0 : messages.at(-1).text.height;
    const numCols = messages.length === 0 ? 0 : messages.at(-1).text.width;

    // Socket listens for new user response, Lists all Active users
    useEffect(() => {
        socket.on("newUserResponse", (data) => {
            setUsersList(null);
            const currentActiveUsers = data.map((user) => user.userName);
            setUsersList(currentActiveUsers);
        });
    }, [socket, messages]);

    function arrayToMatrix(arr, width, height, indexOfCurrentUser) {
        let index = 0;

        const matrix = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => {
                const value = index < arr.length ? { position: arr[index], key: index } : { position: "empty", key: index };
                index += 1;
                return value;
            })
        );
        return matrix;
    }
    const matrix = arrayToMatrix(usersList, numCols, numRows, indexOfCurrentUser);

    const matrixlenght = matrix.flat.length;

    return (
        <>
            <Card>
                <CardHeader title="Users Position" subheader="position marked in green" />
                <CardContent>
                    <Table>
                        <TableBody>
                            {matrix.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <TableCell
                                            key={cell.key} disabled
                                            variant="outlined"
                                            style={{
                                                backgroundColor:
                                                    cell.key === indexOfCurrentUser
                                                        ? 'greenyellow' // Set the cell to red if it matches indexOfCurrentUser
                                                        : 'success',
                                            }}
                                        >{`(${cellIndex},${rowIndex})${cell.position}`}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default AssignUsersToMatrix;

AssignUsersToMatrix.propTypes = {
    messages: PropTypes.array.isRequired,
    indexOfCurrentUser: PropTypes.number.isRequired,
    socket: PropTypes.object.isRequired,
};
