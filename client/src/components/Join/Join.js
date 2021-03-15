import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="joinContainer">
			<div className="joinInnerContainer">
				<h1>Join</h1>
				<input
					className="name-join form-control"
					placeholder="What's Your Name ?"
					type="text"
					onChange={(event) => setName(event.target.value)}
				/>
				<input
					className="room-join form-control"
					placeholder="Enter the Tea Bench "
					type="text"
					onChange={(event) => setRoom(event.target.value)}
				/>
				<Link
					onClick={(e) =>
						!name || !room ? e.preventDefault() : null
					}
					to={`/chat?name=${name}&room=${room}`}
				>
					<button
						type="submit"
						className="create-button btn btn-success mt-3"
					>
						Join Chai Party
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
