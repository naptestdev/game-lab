// https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
export const toKebabCase = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .split("")
    .filter((char) => /(\d|[a-z]|-)/gim.test(char))
    .join("")
    .slice(0, 100);
