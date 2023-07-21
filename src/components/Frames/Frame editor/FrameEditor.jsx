import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FramePage from "./css-sprite-animatior-master/src/components/FramePage";



const FrameEditor = ({ socket }) => {
  // const [isAdmin, setIsAdmin] = useState(false);
  
  //  Socket listens for new user response, conditionally rendering FramePage for admin.
  
  // useEffect(() => {
  //   socket.on("newUserResponse", (users) => {
  //     const currentUser = users.find((user) => socket.id === user.socketID);
  //     const isAdmin = currentUser.userName === "admin";
  //     setIsAdmin(isAdmin);
  //   });
  // }, [socket]);
  
  if (true) {
    return <FramePage socket={socket} />;
  }
  return null;
};
FrameEditor.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default FrameEditor;
