import React, { useState, useEffect } from "react";

// ユーザーの型定義
type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

// データを取得する関数
const getUserData = async (): Promise<User[]> => {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
};

// Suspendなしのユーザーデータ表示コンポーネント
export const NotSuspendUser = () => {
	const [userData, setUserData] = useState<User[] | null>(null); // データの状態
	const [loading, setLoading] = useState(true); // ローディング状態
	const [error, setError] = useState<string | null>(null); // エラー状態

	useEffect(() => {
		// データを取得する非同期関数を定義
		const fetchData = async () => {
			try {
				setLoading(true); // ローディング開始
				await new Promise((resolve) => setTimeout(resolve, 5000));
				const data = await getUserData(); // データ取得
				setUserData(data); // データを状態に保存
			} catch (err: any) {
				setError(err.message); // エラーメッセージを保存
			} finally {
				setLoading(false); // ローディング終了
			}
		};

		fetchData(); // データ取得を実行
	}, []); // コンポーネントの初回マウント時に実行

	// ローディング中のUI
	if (loading) {
		return <p>Loading...</p>;
	}

	// エラーが発生した場合のUI
	if (error) {
		return <p>Error: {error}</p>;
	}

	// データが取得できた場合のUI
	return (
		<div>
			{userData && (
				<div>
					<p>{userData[0].name}</p> {/* 最初のユーザーの名前を表示 */}
				</div>
			)}
		</div>
	);
};
