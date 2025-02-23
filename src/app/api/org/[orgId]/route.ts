import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { OrganizationDescription } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: { params: { orgId: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "features",
      "orgs",
      "data",
      "orgDetail.json"
    );
    // Hi
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const orgDataArray = JSON.parse(fileContent);

    // Filter or validate the org ID
    const orgData = orgDataArray.find(
      (org: OrganizationDescription) => org.id === parseInt(params.orgId)
    );

    return NextResponse.json(orgData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orgs details" },
      { status: 500 }
    );
  }
}
