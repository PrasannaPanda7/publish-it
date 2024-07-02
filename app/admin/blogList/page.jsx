"use client";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blog");
    const data = res.data.blogs;
    setBlogs(data);
  };

  const deleteBlog = async (id) => {
    const res = await axios.delete(`/api/blog?id=${id}`);
    const data = res.data;
    if (data.success) {
      toast.success(data.msg);
    } else {
      toast.error("Error while deleting blog");
    }
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All blogs</h1>
      <div className="relative h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidded sm:block px-6 py-3">
                Author name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {blogs.map((blog) => (
              <BlogTableItem
                key={blog._id}
                mongoId={blog._id}
                authorImg={blog.authorImg}
                title={blog.title}
                author={blog.author}
                date={blog.createdAt}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
