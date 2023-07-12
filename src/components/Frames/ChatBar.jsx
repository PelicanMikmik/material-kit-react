import React, { useState, useEffect } from 'react'

const ChatBar = ({ socket }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState([])

    //////Socket listens for new user response, List all users .
    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    //////Socket listens for new user response, conditionally rendering FramePage for admin.
    useEffect(() => {
        socket.on("newUserResponse", (users) => {
            const currentUser = users.find((user) => socket.id === user.socketID);
            const isAdmin = currentUser.userName === "admin";
            setIsAdmin(isAdmin);
        });
    }, [socket]);

    if (isAdmin) {
        return (
            <div className='chat__sidebar'>
                <h2>Open Chat</h2>
                <div>
                    <h4 className='chat__header'>ACTIVE USERS</h4>
                    <div className='chat__users'>
                        {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                    </div>
                </div>
            </div>
        );
    }
    return;
}

export default ChatBar