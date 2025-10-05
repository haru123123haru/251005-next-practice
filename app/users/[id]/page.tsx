import ContactForm from "@/components/TextButton/ContactForm";
import TextButton from "@/components/TextButton/ContactForm";
import Image from "next/image";

async function getUserData(id){
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if(!res.ok){
            throw new Error('サーバーからの応答が正常ではありません');
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('エラーが発生しました');
    }
}

export default async function UserPage({params}) {
    const user = await getUserData(params.id);

    return (
        <div>
            <h1>ユーザー詳細</h1>
            <p><strong>名前:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>電話番号:</strong> {user.phone}</p>
            <p><strong>ウェブサイト:</strong> {user.website}</p>
            <ContactForm />
            <Image 
                src={`https://robohash.org/${user.id}`} // 表示したい画像のパス
                width={500} // 画像の幅 (ピクセル)
                height={300} // 画像の高さ (ピクセル)
                alt="プロフィール画像" // 画像が表示されないときに表示されるテキスト
            />
        </div>
    );
}