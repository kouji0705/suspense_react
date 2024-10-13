import React from "react";

// `UserList` コンポーネント
const UserList = ({ userData }: { userData: any }) => {
	return (
		<ul>
			{userData.map((user: any) => (
				<li key={user.id}>
					{user.name} ({user.email})
				</li>
			))}
		</ul>
	);
};

export default UserList;
