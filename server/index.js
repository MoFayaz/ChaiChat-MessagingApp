const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");
const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const options = {
	cors: true,
	origins: ["http://chaichat.netlify.app/"],
	methods: ["GET", "POST"],
};
const io = socketio(server, options);

app.use(router);

app.use(cors());

io.on("connect", (socket) => {
	// console.log("User joined the chat");

	socket.on("join", ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) return callback(error);

		socket.join(user.room);

		socket.emit("message", {
			user: "admin",
			text: `${user.name}! 👋 Chat with Chai in ${user.room}`,
		});

		socket.broadcast.to(user.room).emit("message", {
			user: "admin",
			text: `${user.name} had joined the chai party`,
		});

		io.to(user.room).emit("roomData", {
			room: user.room,
			users: getUsersInRoom(user.room),
		});
		callback();
	});

	socket.on("sendMessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });

		callback();
	});

	socket.on("disconnect", () => {
		const user = removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("message", {
				user: "admin",
				text: `${user.name} left the chai party !`,
			});
			io.to(user.room).emit("roomData", {
				room: user.room,
				users: getUsersInRoom(user.room),
			});
		}

		// console.log("User left the chat");
	});
});

server.listen(PORT, () =>
	console.log(`Server has been running on port: ${PORT}`)
);
