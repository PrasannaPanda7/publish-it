import { ConnectDB } from "@/lib/config/db";

const { NextResponse } = require("next/server");
import { writeFile, unlink } from "fs/promises";
import { Buffer } from "buffer";
import BlogModel from "@/lib/models/BlogModel";
import dotenv from "dotenv";

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
  const timeStamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `/${timeStamp}_${image.name}`;

  const blogData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    author: formData.get("author"),
    image: imgUrl,
    authorImg: formData.get("authorImg"),
  };

  await BlogModel.create(blogData);
  return NextResponse.json({ success: true, msg: "Blog saved successfully" });
};

export const DELETE = async (request) => {
  const blogId = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(blogId);
  unlink(`./public/${blog.image}`, () => {});
  await BlogModel.deleteOne({ _id: blogId });
  return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
};
