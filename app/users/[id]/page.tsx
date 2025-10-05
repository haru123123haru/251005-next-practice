import ContactForm from "@/components/ContactForm/ContactForm";
import TextButton from "@/components/ContactForm/ContactForm";
import Image from "next/image";

// 🟢 1️⃣ ユーザー型を定義
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

// 🟢 2️⃣ 引数idの型を明示
async function getUserData(id: string): Promise<User> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) {
      throw new Error("サーバーからの応答が正常ではありません");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error("エラーが発生しました");
  }
}

// 🟢 3️⃣ params の型を明示
type UserPageProps = {
  params: {
    id: string; // Next.js の params.id は string 型で渡される
  };
};

// 🟢 4️⃣ props に型をつけて定義
export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserData(params.id);

  return (
    <div>
      <h1>ユーザー詳細</h1>
      <p>
        <strong>名前:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>電話番号:</strong> {user.phone}
      </p>
      <p>
        <strong>ウェブサイト:</strong> {user.website}
      </p>

      <ContactForm />

      <Image
        src={`https://robohash.org/${user.id}`}
        width={500}
        height={300}
        alt="プロフィール画像"
      />
    </div>
  );
}
