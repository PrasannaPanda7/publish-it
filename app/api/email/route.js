import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export const POST = async (req) => {
  const body = await req.json();
  const emailData = {
    email: body.email,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
};

export const GET = async () => {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
};

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get("id");
  await EmailModel.deleteOne({ _id: id });
  return NextResponse.json({ success: true, msg: "Email Unsubscribed" });
};
