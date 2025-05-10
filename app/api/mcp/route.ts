import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../utils/Mcp";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
//   client?.callTool()
  url.pathname = "/api/mcp";
  return NextResponse.rewrite(url);
}
