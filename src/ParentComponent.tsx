import { Suspense } from "react";

// ユーザーの型定義
type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

// キャッシュとしてグローバルにデータを保存するオブジェクト
let userData: User[] | null = null;
let userDataPromise: Promise<User[]> | null = null;

// ユーザーデータを取得する関数
const getUserData = async (): Promise<User[]> => {
	// データ取得がわかりやすいように2秒待つ
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const res = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}
	return res.json();
};

// SuspendUserコンポーネント
const _SuspendUser = () => {
	// データがまだ取得されていなければ、データ取得を開始
	if (!userDataPromise) {
		userDataPromise = getUserData().then((data) => {
			userData = data; // データをキャッシュ
			return data;
		});
	}

	// データが取得できるまでPromiseを投げる
	if (!userData) {
		throw userDataPromise; // 取得が完了していない場合はPromiseを投げる
	}

	// データが取得されたら表示
	return (
		<div>
			<p>{userData[0].name}</p> {/* 最初のユーザーの名前を表示 */}
		</div>
	);
};

// メインのAppコンポーネント
export const SuspendUser = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<_SuspendUser />
		</Suspense>
	);
};
