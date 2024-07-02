import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  return (
    <tr className="bg-white border-b">
      <th
        scope="roe"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          width={40}
          height={40}
          src={authorImg || assets.profile_icon}
          alt=""
        />
        <p>{author}</p>
      </th>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{new Date(date).toDateString()}</td>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => deleteBlog(mongoId)}
      >
        X
      </td>
    </tr>
  );
};

export default BlogTableItem;
