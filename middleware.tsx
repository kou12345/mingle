import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ユーザーがサインインしていて、現在のパスが/の場合、ユーザーを/accountにリダイレクトする。
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  // ユーザーがサインインしておらず、現在のパスが/でない場合、ユーザーを/にリダイレクトする。
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/account"],
};

/*
このコードは、Next.jsアプリケーションのミドルウェアとして機能する関数middlewareをエクスポートしています。
このミドルウェアは、Supabaseを使用して認証を処理し、
ユーザーがサインインしているかどうかに基づいてリダイレクトを行います。

createMiddlewareClient関数は、Supabase認証クライアントを作成するために使用されます。
reqとresオブジェクトは、Next.jsのNextRequestとNextResponseオブジェクトです。
supabase.auth.getUser()は、現在のユーザーの情報を取得するために使用されます。

このミドルウェアは、configオブジェクトをエクスポートしています。
このオブジェクトは、matcherプロパティを持ち、"/"と"/account"の2つのパスにマッチするように設定されています。
つまり、このミドルウェアは、これらのパスでのみ実行されます。
*/
