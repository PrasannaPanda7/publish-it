import { ConnectDB } from "@/lib/config/db";

const { NextResponse } = require("next/server");
import { writeFile, unlink } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
import dotenv from "dotenv";
import { deleteObject, ref } from "firebase/storage";
import { imageDB } from "@/lib/config/firebaseConfig";

dotenv.config();

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export const GET = async (request) => {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }
  const blogs = await BlogModel.find({});
  return NextResponse.json({ blogs });
};

export const POST = async (request) => {
  const formData = await request.formData();
  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: formData.get("imgUrl"),
    filePath: formData.get("filePath"),
    authorImg: formData.get("authorImg"),
  };

  await BlogModel.create(blogData);
  return NextResponse.json({ success: true, msg: "Blog saved successfully" });
};

export const DELETE = async (request) => {
  const blogId = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(blogId);
  const { filePath } = blog;
  const imgRef = ref(imageDB, filePath);
  await deleteObject(imgRef);
  await BlogModel.deleteOne({ _id: blogId });
  return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
};
