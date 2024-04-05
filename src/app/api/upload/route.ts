import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Data from "@/models/data";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, userEmail, comment } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email: userEmail }).select("_id");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const data = await Data.create({ imageUrl, userEmail, comment });

    console.log("Data saved:", data);

    return NextResponse.json({ message: "Text has been added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding text:", error);
    return NextResponse.json({ message: "An error occurred while sending text" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const userEmail = params.get("userEmail");

    if (!userEmail) {
      return NextResponse.json({ message: "Missing userEmail parameter" }, { status: 400 });
    }

    await connectMongoDB();

    const images = await Data.find({ userEmail });
  
    if (!images || images.length === 0) {
      return NextResponse.json({ message: "No images found for the user" }, { status: 404 });
    }

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user image URLs:", error);
    return NextResponse.json({ message: "An error occurred while retrieving user image URLs" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Data.findByIdAndDelete(id);
  return NextResponse.json({ message: "Photo Deleted" }, { status: 200 });
}




// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const params = new URLSearchParams(url.search);
//     const userEmail = params.get("userEmail");

//     if (!userEmail) {
//       return NextResponse.json({ message: "Missing userEmail parameter" }, { status: 400 });
//     }

//     await connectMongoDB();

//     const data = await Data.findOne({ userEmail });

//     if (!data) {
//       return NextResponse.json({ message: "No data found for the user" }, { status: 404 });
//     }

//     return NextResponse.json({ imageUrl: data.imageUrl }, { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving user image URL:", error);
//     return NextResponse.json({ message: "An error occurred while retrieving user image URL" }, { status: 500 });
//   }
// }