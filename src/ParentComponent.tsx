import { Suspense } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// キャッシュとしてグローバルにデータを保存するオブジェクト
let userData: any | null = null;
let userDataPromise: Promise<any> | null = null;

// ユーザーデータを取得する関数
const getUserData = async (): Promise<any> => {
	// データ取得がわかりやすいように2秒待つ
	await sleep(2000);
	const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
	return res.json();
};

// SuspendUserコンポーネント
const SuspendUser = () => {
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
const App = () => {
	return (
		<>
			<Suspense fallback={<p>Loading...</p>}>
				<SuspendUser />
			</Suspense>
		</>
	);
};

export default App;
