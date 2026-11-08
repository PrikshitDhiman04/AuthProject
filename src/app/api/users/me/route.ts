import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";
import { get } from "http";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json( { 
        message: "User fetched successfully",
        data: user,
        success: true,

     });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 400 });
  }
}
