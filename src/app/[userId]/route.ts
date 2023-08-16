import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "../../../database.types";

export async function GET({ params }: { params: { userId: string } }) {
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
      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("error", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
