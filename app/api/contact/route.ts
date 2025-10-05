import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  console.log('受信したメッセージ:', data);
  return NextResponse.json({ message: 'メッセージを受信しました！' });
}