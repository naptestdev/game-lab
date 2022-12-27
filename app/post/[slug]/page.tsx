import { client } from "../../(service)/client";
import { GET_POST_BY_SLUG } from "../../(service)/queries/post";
import { parse } from "node-html-parser";
import { imageProxy } from "../../(utils)/image";
import { GET_HOME_DATA } from "../../(service)/queries/home";
import { toKebabCase } from "../../(utils)/string";
import Content from "./Content";

export default async function Post({ params }: { params: { slug: string } }) {
  const { data, headings } = await getData(params.slug);

  return <Content data={data} headings={headings} />;
}

export type data = Awaited<ReturnType<typeof getData>>;
const getData = async (slug: string) => {
  const data = await client.request(GET_POST_BY_SLUG, { slug });

  const content = data.post.content.html;

  const dom = parse(content);

  dom.querySelectorAll("p br").forEach((el) => el.remove());

  dom.querySelectorAll("p").forEach((el) => !el.innerHTML && el.remove());

  dom.querySelectorAll("p").forEach((p) => {
    const anchor = p.querySelector("a");
    if (anchor?.getAttribute("href")?.includes("googleusercontent.com")) {
      p.setAttribute("style", "display: flex; justify-content: center");
      p.innerHTML = `<img style"margin: 0 auto;" src="${imageProxy(
        anchor.getAttribute("href")!
      )}" />`;
    }
  });

  const headings = dom.querySelectorAll("h1,h2,h3,h4,h5,h6").map((el) => {
    const id = toKebabCase(el.innerText);

    el.setAttribute("id", id);

    return {
      id,
      content: el.innerText,
    };
  });

  data.post.content.html = dom.outerHTML;

  return { data, headings };
};

export async function generateStaticParams() {
  const data = await client.request(GET_HOME_DATA);

  return data.posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export const revalidate = 300;
