import Link from "next/link";
import { client } from "./(service)/client";
import { GET_HOME_DATA } from "./(service)/queries/home";

export default async function Page() {
  const data = await getData();

  return (
    <div className="min-h-screen">
      {data.posts.map((post: any) => (
        <Link
          className="text-blue-500"
          href={`/post/${post.slug}`}
          key={post.slug}
        >
          {post.title}
        </Link>
      ))}
    </div>
  );
}

const getData = async () => {
  const data = await client.request(GET_HOME_DATA);

  return data;
};

export const revalidate = 300;
