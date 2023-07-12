import React, { useState, useEffect } from 'react'

const AssignUsersToMatrix = ({ messages, indexOfCurrentUser, socket }) => {

    const [usersList, setUsersList] = useState([])
    let numRows = messages == 0 ? 0 : messages.at(-1).text.height;
    let numCols = messages == 0 ? 0 : messages.at(-1).text.width;

    //////Socket listens for new user response, Lists all Active users
    useEffect(() => {
        socket.on("newUserResponse", data => {
            let currentActiveUsers = data.map(user => user.userName)
            setUsersList(currentActiveUsers)
        })
    }, [socket, messages])

    function arrayToMatrix(arr, width, height) {
        let index = 0;

        const matrix = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => {
                const value = index < arr.length ? arr[index] : 0;
                index++;
                return value;
            })
        );

        return matrix;
    }

    const matrix = arrayToMatrix(usersList, numCols, numRows);

    return (
        <div>
            <table >
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{'(' + cellIndex + ',' + rowIndex + ')'}{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default AssignUsersToMatrix