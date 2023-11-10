import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());

  const directory = 'public/Uploads';

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue &&
      formDataEntryValue instanceof Blob
    ) {
      const file = formDataEntryValue as Blob & { name?: string };
      
      if (file.name) {
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(`public/Uploads/${file.name}`, buffer);
      }
    }
  }

  return NextResponse.json({ success: true });
}
