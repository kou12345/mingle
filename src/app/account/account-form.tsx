"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";
import { Database } from "../../../database.types";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  console.log(user);

  // console.log(fullname);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  console.log(`/${user?.id}/`);

  // app/[userName]/route.tsにRequestする
  const { data, error, isLoading } = useSWR(`/${user?.id}/`, fetcher);

  console.log(data);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // setFullname(data?.full_name);

  console.log(fullname);

  return (
    <div>
      <form action={`/${user?.id}/`} method="post">
        <label htmlFor="email">Email</label>
        <input type="text" defaultValue={user?.email} disabled />

        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          defaultValue={data.full_name || ""}
          onChange={(e) => setFullname(e.target.value)}
        />

        <label htmlFor="username">User Name</label>
        <input type="text" name="username" defaultValue={data.username} />

        <label htmlFor="website">Website</label>
        <input type="text" name="website" defaultValue={data.website} />

        {/* 画像をpostする */}
        <label htmlFor="avatar_url">Avatar</label>
        <input type="file" />

        <input type="text" name="hoge" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  //   async function updateProfile({
  //     username,
  //     website,
  //     avatar_url,
  //   }: {
  //     username: string | null;
  //     fullname: string | null;
  //     website: string | null;
  //     avatar_url: string | null;
  //   }) {
  //     try {
  //       setLoading(true);

  //       let { error } = await supabase.from("profiles").upsert({
  //         id: user?.id as string,
  //         full_name: fullname,
  //         username,
  //         website,
  //         avatar_url,
  //         updated_at: new Date().toISOString(),
  //       });
  //       if (error) throw error;
  //       alert("Profile updated!");
  //     } catch (error) {
  //       alert("Error updating the data!");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   return (
  //     <div className="form-widget">
  //       <Avatar
  //         uid={user?.id || ""}
  //         url={avatar_url}
  //         size={150}
  //         onUpload={(url) => {
  //           setAvatarUrl(url);
  //           updateProfile({ fullname, username, website, avatar_url: url });
  //         }}
  //       />
  //       <div>
  //         <label htmlFor="email">Email</label>
  //         <input id="email" type="text" value={session?.user.email} disabled />
  //       </div>
  //       <div>
  //         <label htmlFor="fullName">Full Name</label>
  //         <input
  //           id="fullName"
  //           type="text"
  //           value={fullname || ""}
  //           onChange={(e) => setFullname(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="username">Username</label>
  //         <input
  //           id="username"
  //           type="text"
  //           value={username || ""}
  //           onChange={(e) => setUsername(e.target.value)}
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="website">Website</label>
  //         <input
  //           id="website"
  //           type="url"
  //           value={website || ""}
  //           onChange={(e) => setWebsite(e.target.value)}
  //         />
  //       </div>

  //       <div>
  //         <button
  //           className="button primary block"
  //           onClick={() =>
  //             updateProfile({ fullname, username, website, avatar_url })
  //           }
  //           disabled={loading}
  //         >
  //           {loading ? "Loading ..." : "Update"}
  //         </button>
  //       </div>

  //       <div>
  //         <form action="/auth/signout" method="post">
  //           <button className="button block" type="submit">
  //             Sign out
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
}
