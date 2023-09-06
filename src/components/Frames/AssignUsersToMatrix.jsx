import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

// @mui
import {
    Card,
    CardContent,
    CardHeader,
    TableRow,
    TableCell,
    TableBody,
    Table
  } from '@mui/material';

const AssignUsersToMatrix = ({ messages, indexOfCurrentUser, socket }) => {

    const [usersList, setUsersList] = useState([])
    const numRows = messages.length === 0 ? 0 : messages.at(-1).text.height;
    const numCols = messages.length === 0 ? 0 : messages.at(-1).text.width;

    //  Socket listens for new user response, Lists all Active users
    useEffect(() => {
        socket.on("newUserResponse", data => {
            setUsersList(null)
            const currentActiveUsers = data.map(user => user.userName)
            setUsersList(currentActiveUsers)
        })
    }, [socket, messages])

    function arrayToMatrix(arr, width, height) {
        let index = 0;

        const matrix = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => {
                const value = index < arr.length ? arr[index] : "empty";
                index += 1;
                return value;
            })
        );

        return matrix;
    }
    const matrix = arrayToMatrix(usersList, numCols, numRows);

    return (
        <>
            <Card >
                <CardHeader title='Users Position' subheader='' />
                <CardContent>
                    <Table  >
                        <TableBody >
                            {matrix.map((row, rowIndex) => (
                                <TableRow  key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <TableCell  key={cellIndex} disabled variant="outlined" color="success">{`(${cellIndex},${rowIndex})${cell}`}</TableCell >
                                    ))}
                                </TableRow >
                            ))}
                        </TableBody >
                    </Table >
                </CardContent>
            </Card>
        </>
    );
}

export default AssignUsersToMatrix

AssignUsersToMatrix.propTypes = {
    messages: PropTypes.array.isRequired,
    indexOfCurrentUser: PropTypes.number.isRequired,
    socket: PropTypes.object.isRequired,
  };