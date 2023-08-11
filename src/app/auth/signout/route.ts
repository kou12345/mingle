import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  // セッションの有無を確認する
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}

/*
このコードは、Next.jsアプリケーションのサーバーサイドで、サインアウトのためのルートハンドラーを定義しています。
以下のような機能が含まれています。

- createRouteHandlerClient関数を使用して、Supabase Authのクライアントを作成します。
- cookiesオブジェクトをcreateRouteHandlerClient関数に渡します。これにより、クライアントはリクエストからCookieを取得できます。
- POST関数は、HTTP POSTリクエストを処理します。
- supabase.auth.getSession()関数を使用して、現在のセッションを取得します。
- セッションが存在する場合は、supabase.auth.signOut()関数を使用して、ユーザーをサインアウトします。
- 最後に、NextResponse.redirect()関数を使用して、ユーザーをアプリケーションのホームページにリダイレクトします。

このコードは、Supabase Authを使用して、
Next.jsアプリケーションからユーザーをサインアウトするためのサーバーサイドのルートハンドラーを提供しています。
*/
