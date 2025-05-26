import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Class } from "@/lib/type";

export async function POST(req: Request) {
    const data = await req.json();
    const {
        subject,
        grade,
        teacherName,
        room,
        studentIds
    }: Class = data;
    console.log(data)
    
    if (!subject || !grade || !teacherName) {
        
        return NextResponse.json({ message: "Missing required information" }, { status: 400 });
    }

    try {
        
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");
        const result = await collection.insertOne({
            subject: subject,
            grade: grade,
            teacherName: teacherName,
            room: room || null,
            studentIds: studentIds || [],
            // parentPhone: parentPhone || null,
        });
        console.log(result.insertedId)
        return NextResponse.json({ result: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error adding student" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get("search")?.toLowerCase() || "";
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("classes");
        const query = keyword ? { name: { $regex: keyword, $options: "i" } } : {};
        const result = await collection
            .find(query)
            .sort({ name: 'asc' })
            .skip((page - 1) * limit)
            .limit(limit)
            .toArray();

        // const totalMedicines = await collection.countDocuments(query);
        // const totalPages = Math.ceil(totalMedicines / limit);

        return NextResponse.json({
            classes: result,

        }, { status: 200 });
        // return NextResponse.json({
        //     medicines: result,
        //     totalPages,
        //     totalMedicines
        // }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching student" }, { status: 500 });
    }
}
