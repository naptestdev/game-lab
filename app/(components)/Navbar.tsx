import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="px-[3vw] h-14 border-b border-gray-300 flex justify-between items-center sticky top-0 left-0 bg-white">
      <Link href="/" className="text-2xl flex items-center gap-2">
        <img className="h-12 w-auto" src="/logo.png" alt="" />
      </Link>
      <div className="items-center gap-4 hidden lg:flex">
        {[
          "Tổng hợp khoá học",
          "Sản phẩm học viên",
          "Câu chuyện học viên",
          "Blog",
          "Sự kiện",
          "Vể chúng tôi",
        ].map((link) => (
          <a
            key={link}
            href="https://mindx.edu.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
