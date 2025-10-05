import AlertButton from "@/components/AlertButton/AlertButton";
import About from "./about/page";
import Link from "next/link";

// 🟢 型定義
type User = {
  id: number;
  name: string;
  email?: string;
};

async function getUsers(): Promise<User[]> { // 🟢 戻り値の型を明示！
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("サーバーからの応答が正常ではありません");
    }
    const users: User[] = await res.json(); // 🟢 ここも型注釈しておくと安全
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("記事の取得に失敗しました。");
  }
}

export default async function Home() {
  const users = await getUsers(); // 🟢 もう明示しなくても推論される

  return (
    <div>
      <ul>
        {/* 🟢 user の型は User に推論される */}
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      <AlertButton />
    </div>
  );
}
