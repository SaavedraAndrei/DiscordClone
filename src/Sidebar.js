import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { Call, Headset, InfoOutlined, Settings } from "@material-ui/icons";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import db from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const addChannel = () => {
    const name = prompt("Enter a new channel name");

    if (name) {
      db.collection("channels").add({
        channelName: name,
      });
    }
  };

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data().channelName,
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Clever Programmer</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
            <AddIcon onClick={addChannel} className="sidebar__addChannel" />
          </div>
        </div>

        <div className="sidebar__channelsList">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              name={channel.channel}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />

        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.name}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <Headset />
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
