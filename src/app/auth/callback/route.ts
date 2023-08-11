import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL("/account", req.url));
}

/*
このコードは、Next.jsアプリケーションで認証コールバックを処理するためのルートハンドラーです。
以下のような機能があります。

- createRouteHandlerClient関数を使用して、Supabase Authクライアントを作成します。
- cookiesオブジェクトを使用して、認証クッキーを取得します。
- NextRequestオブジェクトを使用して、リクエストURLからクエリパラメーターを取得します。
- auth.exchangeCodeForSession関数を使用して、認証コードをセッションに交換します。
- NextResponse.redirect関数を使用して、リダイレクトレスポンスを返します。

具体的には、GET関数は、reqオブジェクトを引数に取ります。
このオブジェクトは、リクエストに関する情報を含んでいます。
関数内では、createRouteHandlerClient関数を使用して、Supabase Authクライアントを作成し、
cookiesオブジェクトを使用して、認証クッキーを取得します。
次に、req.urlからsearchParamsを取得し、codeを取得します。
codeがある場合は、auth.exchangeCodeForSession関数を使用して、認証コードをセッションに交換します。
最後に、NextResponse.redirect関数を使用して、リダイレクトレスポンスを返します。
このレスポンスは、/accountにリダイレクトします。
*/
