"use client";
import React, { useEffect, useState } from "react";
import SubTableItem from "@/Components/AdminComponents/SubTableItem";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const unSubScribe = async (id) => {
    const response = await axios.delete(`/api/email`, {
      params: {
        id: id,
      },
    });
    const { success, msg } = response.data;
    if (success) {
      toast.success(msg);
      fetchEmails();
    } else {
      toast.error("Error");
    }
  };
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm test-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item) => {
              return (
                <SubTableItem
                  key={item._id}
                  emailId={item.email}
                  createdAt={item.createdAt}
                  id={item._id}
                  unSubScribe={unSubScribe}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
