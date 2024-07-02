import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [category, setCategory] = useState("All");

  const [blogData, setBlogData] = useState([]);

  const fetchBloagList = async () => {
    const response = await axios.get("/api/blog");
    const data = await response.data.blogs;
    setBlogData(data);
  };
  useEffect(() => {
    fetchBloagList();
  }, []);
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((curcat, index) => (
          <button
            key={index}
            onClick={() => setCategory(curcat)}
            className={
              curcat === category
                ? "bg-black text-white py-1 px-4 rounded-sm"
                : ""
            }
          >
            {curcat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogData
          .filter((blog) =>
            category === "All" ? true : blog.category === category
          )
          .map((blog) => (
            <BlogItem
              key={blog._id}
              id={blog._id}
              image={blog.image}
              title={blog.title}
              description={blog.description}
              category={blog.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
