import { client } from "../../(service)/client";
import { GET_POST_BY_SLUG } from "../../(service)/queries/post";
import { parse } from "node-html-parser";
import { imageProxy } from "../../(service)/image";

export default async function Post({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  return (
    <div className="flex justify-center">
      <article
        className="w-full max-w-3xl prose my-8 mx-3"
        dangerouslySetInnerHTML={{ __html: data.post.content.html }}
      ></article>
    </div>
  );
}

const getData = async (slug: string) => {
  const data = await client.request(GET_POST_BY_SLUG, { slug });

  const content = data.post.content.html;

  const dom = parse(content);

  dom.querySelectorAll("p br").forEach((el) => el.remove());

  dom.querySelectorAll("p").forEach((el) => !el.innerHTML && el.remove());

  dom.querySelectorAll("p").forEach((p) => {
    const anchor = p.querySelector("a");
    if (anchor?.getAttribute("href")?.includes("googleusercontent.com")) {
      p.innerHTML = `<img style"margin: 0 auto;" src="${imageProxy(
        anchor.getAttribute("href")!
      )}" />`;
    }
  });

  data.post.content.html = dom.outerHTML;

  return data;
};
