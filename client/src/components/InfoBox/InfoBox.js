import React from "react";
import "./InfoBox.css";

export const InfoBox = ({ room }) => (
	<div className="InfoBoxOuterContainer">
		<div className="InfoBoxChatContainer">
			<div className="roomOfChat">{room}</div>
		</div>
		<a href="/" className="closeIcon">
			<i className="fas fa-times" />
		</a>
	</div>
);
