import React, { Suspense, useState, useEffect, lazy } from "react";

// 遅延ロードするコンポーネント
const UserList = lazy(() => import("./UserList"));

// API通信関数
const getUserData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
};

// メインコンポーネント
export const SuspendUserOld = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// API通信を行う
		const fetchData = async () => {
			try {
				const data = await getUserData();
				setUserData(data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// ローディング中のUI表示
	if (loading) {
		return <div>Data fetching Loading...</div>;
	}

	// エラーが発生した場合の表示
	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<Suspense fallback={<FallbackUI />}>
			<UserList userData={userData} />
		</Suspense>
	);
};

export const FallbackUI = () => {
	return (
		<div>
			<p>Fallback Loading...</p>
		</div>
	);
};
