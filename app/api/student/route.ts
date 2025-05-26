import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Student, Teacher } from "@/lib/type";

export async function POST(req: Request) {
    const {
        name,
        parentName,
        parentPhone,
        yearOfBirth,
        address,
        classIds
    }: Student = await req.json();

    if (!name || !yearOfBirth) {
        return NextResponse.json({ message: "Missing required information" }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("trithucviet");
        const collection = db.collection("students");
        const result = await collection.insertOne({
            name,
            yearOfBirth: yearOfBirth,
            address: address || null,
            parentName: parentName || null,
            parentPhone: parentPhone || null,
            classIds: classIds || [],
        });
        // console.log(NextResponse.json({ result: result }, { status: 200 }))
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
        const collection = db.collection("students");
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
            students: result,

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
