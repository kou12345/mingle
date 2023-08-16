import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "../../../database.types";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { userId: string };
  }
) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userId = params.userId;

  try {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`full_name, username, website, avatar_url`)
      .eq("id", userId)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      // jsonに変換して返す
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log("error", error);
    throw error;
  }

  // console.log("userName", userName);
  // return NextResponse.json({ userName });
}
