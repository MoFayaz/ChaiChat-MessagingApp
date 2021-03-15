import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import Messages from "../Messages/Messages";
import { InfoBox } from "../InfoBox/InfoBox";
import { UsersBox } from "../UsersBox/UsersBox";

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState("");
	const ENDPOINT = "http://chaichat-backend.herokuapp.com/";

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setName(name);
		setRoom(room);

		// console.log(socket);

		socket.emit("join", { name, room }, (error) => {
			if (error) {
				alert(error);
			}
		});
		// console.log(name, room);
	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages((msg) => [...msg, message]);
		});

		socket.on("roomData", (user) => {
			setUsers(user);
		});
	}, []);

	// console.log(message, messages);
	// console.log("this is users", users.users);

	const sendMessage = (event) => {
		event.preventDefault();

		socket.emit("sendMessage", message, () => setMessage(""));
	};

	return (
		<div className="chatContainer">
			<UsersBox users={users} />
			<InfoBox room={room} />

			<Messages messages={messages} name={name} />

			<div className="InputFieldContainer">
				<input
					className="send-text-field form-control"
					placeholder="Text somethin..."
					type="text"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
					onKeyPress={(event) =>
						event.key === "Enter" ? sendMessage(event) : null
					}
				/>
			</div>
		</div>
	);
};

export default Chat;
