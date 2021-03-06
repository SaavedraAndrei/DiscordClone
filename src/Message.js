import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ timestamp, user, message }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>{user.name}</h4>
        <p>{message}</p>
      </div>

      <span className="message__timestamp">
        {new Date(timestamp?.toDate()).toUTCString()}
      </span>
    </div>
  );
}

export default Message;
