import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "../../../database.types";

export async function GET(request: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });

  try {
    const { data, error, status } = await supabase.from("hoges").select();

    if (error && status !== 406) {
      throw error;
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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

export async function POST(request: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const formData = await request.formData();
  console.log("formData: ", formData.get("name"));

  const name = formData.get("name") as string;

  try {
    const { error } = await supabase.from("hoges").insert({ content: name });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
      // "error": "new row violates row-level security policy for table \"hoges\""
      // これが出る良くないかも
    }

    return NextResponse.json({ data: "ok" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
