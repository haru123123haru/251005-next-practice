import AlertButton from "@/components/AlertButton/AlertButton";
import About from "./about/page";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email?: string;
};

async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users' , {
      cache: 'no-store'
    });
    if (!res.ok) {
      // 404や500などのHTTPエラーを自分で投げる
      throw new Error('サーバーからの応答が正常ではありません');
    }
    const users = await res.json();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error('記事の取得に失敗しました。');
  }
}

export default async function Home() {

  const users = await getUsers();
  return (
    <div>
      <ul>
        {users.map(user=> (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
      <AlertButton />
    </div>
  );
}
