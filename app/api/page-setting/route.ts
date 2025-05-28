import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Class, PageSettings } from "@/lib/type";

export async function POST(req: Request) {
    const data = await req.json();
    const {
        teacherIds,
        classIds,
        urlImage,
    }: PageSettings = data;

    if (!teacherIds || !classIds || !urlImage) {

        return NextResponse.json({ message: "Missing required information" }, { status: 400 });
    }

    try {

        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("pagesetting");
        const result = await collection.insertOne({
            teacherIds: teacherIds || [],
            classIds: classIds || [],
            urlImage: urlImage || null,
            // parentPhone: parentPhone || null,
        });
        console.log(result.insertedId)
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding student" }, { status: 500 });
    }
}
export async function PATCH(req: Request) {
    const data = await req.json();
    const {
        teacherIds,
        classIds,
        urlImage,
    }: PageSettings = data;

    if (!teacherIds || !classIds || !urlImage) {

        return NextResponse.json({ message: "Missing required information" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("pagesetting");

        const result = await collection.updateOne(
            {},
            {
                $set: {
                    teacherIds: teacherIds || [],
                    classIds: classIds || [],
                    urlImage: urlImage || null,
                },
            },
            { upsert: true } // Create a new document if none exists
        )

        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding student" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        // const { searchParams } = new URL(req.url);
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("pagesetting");
        // const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
        const result = await collection
            .find({})
            .sort({ name: 'asc' })
            .toArray();
        // console.log("result:", result);
        return NextResponse.json({
            pageSettings: result,

        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error fetching student" }, { status: 500 });
    }
}
