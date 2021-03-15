import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";
export const Message = ({ message: { user, text }, name }) => {
	let isSentByCurrentUser = false;

	const trname = name.trim().toLowerCase();

	if (user === trname) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className="messageContainer justifyEnd">
			<p className="currentUser pr-10">{trname}</p>
			<div className="messageInnerBox backgroundBlue">
				<p className="messageByUser colorWhite">
					{ReactEmoji.emojify(text)}
				</p>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="messageInnerBox backgroundLight">
				<p className="messageByUser colorDark">
					{ReactEmoji.emojify(text)}
				</p>
			</div>
			<p className="currentUser pl-10">{user}</p>
		</div>
	);
};
