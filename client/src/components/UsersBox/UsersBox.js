import React from "react";
import "./UsersBox.css";

export const UsersBox = ({ users }) => {
	return (
		<div className="UserBoxContainer">
			<div className="UsersActiveContainer">
				{users ? (
					<div>
						<h2 className="headingOfActive">Active Chaiyers</h2>
						<div className="activeContainer">
							{users.users.map(({ name }) => (
								<div key={name} className="activeUser">
									{name}
									<i className="fas fa-signal"></i>
								</div>
							))}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};
