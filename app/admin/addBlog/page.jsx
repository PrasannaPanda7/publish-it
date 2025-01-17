"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { imageDB } from "@/lib/config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddBlog = () => {
  const [image, setImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img.png",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(
      (e.target.files[0] && URL.createObjectURL(e.target.files[0])) || false
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const filePath = `files/${Date.now()}`;
    const imgRef = ref(imageDB, filePath);
    const refInDb = await uploadBytes(imgRef, image);
    const imgUrl = await getDownloadURL(refInDb.ref);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("imgUrl", imgUrl);
    formData.append("filePath", filePath);
    const resp = await axios.post(`/api/blog`, formData);
    if (resp.data.success) {
      toast.success(resp.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennett",
        authorImg: "/author_img.png",
      });
      setImageUrl(false);
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image && !imageUrl ? assets.upload_area : imageUrl}
            className="mt-4"
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={onImageChange}
          type="file"
          hidden
          required
          id="image"
          name="thumbnail"
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          type="text"
          className="mt-4 px-4 w-full sm:w-[500px] py-3 border"
          placeholder="Type here"
          onChange={onChangeHandler}
          value={data.title}
          required
        />
        <p className="text-xl mt-4">Blog description</p>
        <textarea
          type="text"
          name="description"
          onChange={onChangeHandler}
          rows={6}
          value={data.description}
          placeholder="write content here"
          className="mt-4 px-4 w-full sm:w-[500px] py-3 border"
          required
        />
        <p className="text-xl mt-4">Blog category</p>
        <select
          className="mt-4 px-4 py-3 border text-gray-500 w-40 sm:w-[500px]"
          name="category"
          onChange={onChangeHandler}
          value={data.category}
        >
          <option>Startup</option>
          <option>Technology</option>
          <option>Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default AddBlog;
