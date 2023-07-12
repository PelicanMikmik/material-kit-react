import React, { useState, useEffect } from "react";
import FramePage from "./css-sprite-animatior-master/src/components/FramePage";

const FrameEditor = ({ socket }) => {
  const [isAdmin, setIsAdmin] = useState(false);

//Socket listens for new user response, conditionally rendering FramePage for admin.

  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      const currentUser = users.find((user) => socket.id === user.socketID);
      const isAdmin = currentUser.userName === "admin";
      setIsAdmin(isAdmin);
    });
  }, [socket]);

  if (isAdmin) {
    return <FramePage socket={socket} />;
  }
  return;
};

export default FrameEditor;
