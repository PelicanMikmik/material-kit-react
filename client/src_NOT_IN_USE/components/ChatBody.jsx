import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AssignUsersToMatrix from "./AssignUsersToMatrix";

const ChatBody = ({ socket, messages }) => {
  const [indexOfCurrentUser, setIndexOfCurrentUser] = useState("");
  const [indexOfCurrentFrame, setIndexOfCurrentFrame] = useState(0);
  const [colorBackGround, setColorBackGround] = useState('');
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [playStatus, setPlayStatus] = useState('');
  const [playSpeed, setPlaySpeed] = useState(1);
  const navigate = useNavigate();
  let messagesLength = messages.length;

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  ////UPDATE VARIABLES FROM STORE - width , height , play status , PLAY SPEED//////
  useEffect(() => {
    if (messagesLength == 0) {
      return;
    } else
      setWidth(messages.at(-1).text.width),
        setHeight(messages.at(-1).text.height),
        setPlayStatus(messages.at(-1).castStatus),
        setPlaySpeed(messages.at(-1).text.SendFrameFromAppSpeed)
  }, [messages]);

  ////UPDATE INDEX OF CURRENT USER//////
  useEffect(() => {
    socket.on("newUserResponse", (users) => {
      const currentUser = users.find((user) => socket.id === user.socketID);
      setIndexOfCurrentUser(users.map((el) => el.socketID).indexOf(socket.id));
    });
  }, [playStatus == 'play']);

  ////UPDATE INDEX OF CURRENT FRAME AND PLAY \ STOP //////
  let interval;
  useEffect(() => {
    switch (playStatus) {
      case 'play':
        interval = setInterval(() => {
          setIndexOfCurrentFrame((index) => (index + 1) % messages.at(-1).text.frames.length);
        }, 1000 * playSpeed);
        break;

      case 'load':
        setIndexOfCurrentFrame(0);
        setColorBackGround('grey');
        clearInterval(interval);
        break;

      default:
        clearInterval(interval);
        setIndexOfCurrentFrame(0);
    }

    return () => clearInterval(interval);
  }, [playStatus]);

  ////UPDATE BACKGROUND COLOR//////
  useEffect(() => {
    if (messagesLength == 0) {
      return;
    } else
      if (indexOfCurrentUser > messages.at(-1).text.frames[indexOfCurrentFrame].length - 1) {
        setColorBackGround("wait for bigger frame size")
        return;
      } else
        setColorBackGround(messages.at(-1).text.frames[indexOfCurrentFrame][indexOfCurrentUser].color);
  }, [indexOfCurrentFrame]);

  return (
    <div>
      <header className="chat__mainHeader">
        <p>Frame Game</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE GAME
        </button>
      </header>
      <div
        className="message__container"
        style={{
          backgroundColor:
            messagesLength === 0 ? "gray" : colorBackGround,
        }}
      >
        <h1>Position IN MATRIX :</h1>
        <AssignUsersToMatrix
          messages={messages}
          indexOfCurrentUser={indexOfCurrentUser}
          socket={socket} />
        <h1>Current frame : ( {indexOfCurrentFrame} )</h1>
        <h1>
          Current frame Size: ( {width} , {height} )
        </h1>
        <h1>Current Color : {colorBackGround}</h1>
      </div>
    </div>
  );
};

export default ChatBody;
