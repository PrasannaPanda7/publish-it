import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Header() {
  const emailRef = useRef();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEmail(emailRef.current.value);
  };

  const submitEmail = async (email) => {
    const formData = new FormData();
    const postData = {
      email: email,
    };
    formData.append("email", email);
    try {
      const {
        data: { success, msg },
      } = await axios.post("/api/email", JSON.stringify(postData));
      if (success) {
        toast.success(msg);
        emailRef.current.value = "";
        router.push("/admin"); // Navigate to /admin on success
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the email.");
    }
  };

  return (
    <div className="px-5 py-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt=""
          className="w-[130px] sm:w-auto"
        />
        <button
          className="flex items-center font-medium gap-2 py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          onClick={() => router.push("/admin")} // Navigate to /admin when clicking "Get Started"
        >
          Get Started
          <Image src={assets.arrow} alt="" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          eveniet molestiae dolores quos inventore itaque vel illo blanditiis,
          consequuntur architecto provident sit obcaecati in!
        </p>
        <form
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your Email"
            className="pl-4 outline-none w-full"
            ref={emailRef}
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default Header;
