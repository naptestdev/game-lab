"use client";
import { useEffect } from "react";
import { data } from "./page";

export default function Content({ data, headings }: data) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries.reverse()) {
        if (entry.isIntersecting) {
          document
            .querySelectorAll("#menu a")
            .forEach((item) => item.classList.remove("active"));

          document
            .querySelector(`#link-${entry.target.getAttribute("id")}`)
            ?.classList.add("active");
        }
      }
    });
    document
      .querySelectorAll("h1,h2,h3,h4,h5,h6")
      .forEach((item) => observer.observe(item));
  }, []);
  return (
    <div className="flex justify-center gap-10">
      <article
        className="w-full max-w-3xl prose my-8 mx-3"
        dangerouslySetInnerHTML={{ __html: data.post.content.html }}
      ></article>
      <div
        id="menu"
        className="max-h-[calc(100vh-56px)] overflow-auto sticky w-80 py-5 top-14 flex-col gap-2 hidden lg:flex"
      >
        {headings.map((h) => (
          <a
            key={h.id}
            className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-gray-400 pl-4"
            id={`link-${h.id}`}
            href={`#${h.id}`}
          >
            {h.content}
          </a>
        ))}
      </div>
    </div>
  );
}
